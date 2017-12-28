import {Injectable} from '@angular/core';
//firestore integration imports
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Item } from '../model/item.type';

@Injectable()
export class ItemService{

    itemsCol : AngularFirestoreCollection<Item>;
    
    constructor(private afs: AngularFirestore){
    }

    getAllItems(): Observable<Item[]> {
        this.itemsCol = this.afs.collection('items');
        console.log(this.itemsCol);
        //this method doesn't access document metadata (autogenerated id)
        //return this.itemsCol.valueChanges();
        return this.itemsCol.snapshotChanges().map(actions => {       
            return actions.map(a => {
              const data = a.payload.doc.data() as Item;
              //auto-generated id
              data.id = a.payload.doc.id;
              return data;
            });
          });
    }

    addNewItem(newItem : any){
        this.itemsCol.add({
            'id': "0",
            'description': newItem.description,
            'locationName': newItem.locationName,
            'locationId': newItem.locationId,
            'caseId': newItem.caseId,
            'imageUrl' : newItem.imageUrl
          });
    }
}



