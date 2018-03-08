import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { DocumentSnapshot}   from 'firebase/firestore';
import { ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Item} from '../model/item.type';

import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog.component';

type OkCallback = (inputParam : any) => any;

export abstract class GenericService<T> {

    protected firestoreCollection : AngularFirestoreCollection<T>;
    protected allModels : Observable<T[]>;

    

    constructor(protected afs: AngularFirestore, protected collectionPath: string){
        //called first time before the ngOnInit()
        console.log("Output membro abstract getCollectionPath(): " + this.collectionPath);
        this.firestoreCollection = this.afs.collection(this.collectionPath);
        console.log("Models Observable collection initialization...");
        this.allModels = this.firestoreCollection.snapshotChanges().map(actions => {       
            return actions.map(a => {
                return  this.fromDocumentSnapshotToModel(a.payload.doc); 
            });
          });
    }

    protected abstract fromDocumentSnapshotToModel(snapshot : DocumentSnapshot);

    getAll(): Observable<T[]> {
        return this.allModels;
    }

    getSingle(id : string): Observable<T> {
        // 2. extract Observable<Action<firebase.firestore.DocumentSnapshot>>
        const itemSnapshot  = this.firestoreCollection.doc(id).snapshotChanges(); 
        // 3. map the itemSnapshot Observable<Action<DocumentSnapshot>> to Observable<Item> 
        return itemSnapshot.map(action => {
            console.log("Returning object with id: "+ id);
            return  this.fromDocumentSnapshotToModel(action.payload);
          }); 
    }

    //this method insert document into collection if id not exists, update document 
    upsert<T>(dataObj : T, id : string) : Promise<void> {
        //TODO: dovrebbe essere inserito in una transazione
        //TODO: verificare la presenza di id undefined
        const jsonDataObj = JSON.parse(JSON.stringify(dataObj));
        console.log("serialized dataObj: " + JSON.stringify(jsonDataObj));
        const docReference : AngularFirestoreDocument<T> = this.afs.doc<T>(this.collectionPath + '/' + id);
        const exists = id ? docReference.snapshotChanges().subscribe(action => {return action.payload.exists}) : false;
        exists ? 
            console.log("Document with id " + id + " already exists, document will be updated") :
            console.log("Document doesn't exists, new document will be created");  
        if(exists){
            return docReference.update(jsonDataObj);
        } else {
            //return this.firestoreCollection.add(jsonDataObj).then(promise => new Promise<void>((resolve, reject) => {}));
            //we must change returning promise from Promise<DocumentReference> to Promise<void>
            return this.firestoreCollection.add(jsonDataObj).then(
                //success function
                function (value) {
                    console.log("It succeeded with " + value);
                },
                //failure function
                function (error) {
                    console.log("It failed with " + error);
                } 
              );
                
        }
    }

    delete<T>(id : string) : Promise<void> {
        if(!id){
            return Promise.reject(new Error('no id submitted to deletion'));     
        }
        const docReference : AngularFirestoreDocument<T> = this.afs.doc<T>(this.collectionPath + '/' + id);
        return docReference.delete();
    }

    handleDelete<T>(dataObj: T, id : string, viewContainerRef : ViewContainerRef, componentFactoryResolver : ComponentFactoryResolver, okCallback : OkCallback, okCallbackParam : any){
        console.log("Opening deletion confirm dialog for item " + id + "...");
        let confirmDialogFactory = 
            componentFactoryResolver.resolveComponentFactory(ConfirmDialogComponent);
        viewContainerRef.clear();
        let confirmDialogComponent = viewContainerRef.createComponent(confirmDialogFactory);
        let confirmDialogComponentInstance = (<ConfirmDialogComponent> confirmDialogComponent.instance);
        confirmDialogComponentInstance.dialogTitle = "Titolo del modal" + id;
        confirmDialogComponentInstance.confirmMessage = "Cancellare oggetto con id :[" + id + "]  ?";
        confirmDialogComponentInstance.viewContainerRef = viewContainerRef;
        //TODO: add a callback function
        confirmDialogComponentInstance.okEmitter.subscribe(() => this.confirmedDelete(id, okCallback, okCallbackParam));
        //detect change hook to detect dynamic component changes to Angular change detection system 
        confirmDialogComponent.changeDetectorRef.detectChanges();
        confirmDialogComponentInstance.open();
        console.log("Delete item with id: ["+ id + "]");
    }

    confirmedDelete(id : string, okFunc : OkCallback, okCalllbackParam : any){
        //TODO: merge this method with delete<T>
        console.log("Deletion confirmed, deleting item" + id + "...");
        this.delete(id).then(okFunc(okCalllbackParam));
    }

}