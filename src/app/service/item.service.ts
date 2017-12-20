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
        return this.itemsCol.valueChanges();
    }

    addNewItem(newItem : any){
        this.itemsCol.add({
            'description': newItem.description,
            'locationName': newItem.locationName,
            'locationId': newItem.locationId,
            'caseId': newItem.caseId,
          });
    }
}



