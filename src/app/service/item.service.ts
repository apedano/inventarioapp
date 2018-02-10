import {Injectable} from '@angular/core';
//firestore integration imports
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import {DocumentSnapshot} from "firebase/firestore";
import { GenericService } from "./generic.service";
import { Item } from '../model/item.type';

@Injectable()
export class ItemService extends GenericService<Item>{

    constructor(protected afs: AngularFirestore){
        super(afs, "items");
    }

    protected fromDocumentSnapshotToModel(snapshot : DocumentSnapshot){
        const data = snapshot.data() as Item;
        //auto-generated id
        data.id = snapshot.id;
        return data;
    }

    addNewItem(newItem : any){
        this.firestoreCollection.add({
            'id': "0",
            'description': newItem.description,
            'locationName': newItem.locationName,
            'locationId': newItem.locationId,
            'caseId': newItem.caseId,
            'imageUrl' : newItem.imageUrl
          });
    }

}



