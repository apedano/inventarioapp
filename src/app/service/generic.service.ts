import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { DocumentSnapshot}   from 'firebase/firestore';
import { Observable } from 'rxjs/Observable';

import { Item} from '../model/item.type';

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
        console.log("serialized dataObj: " + jsonDataObj);
        const docReference : AngularFirestoreDocument<T> = this.afs.doc<T>(this.collectionPath + '/' + id);
        const exists = docReference.snapshotChanges().subscribe(action => {return action.payload.exists});
        exists ? 
        console.log("Document already exists, document will be updated") :
        console.log("Document doesn't exists, new document will be created");  
        if(exists){
            return docReference.update(jsonDataObj);
        } else {
            return docReference.set(jsonDataObj);    
        }
    }

}