import { Component } from '@angular/core';
import { Item } from './model/item.type';
//firestore integration imports
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  itemsCol: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  newItem: Item;

  constructor(private afs: AngularFirestore) {}
  
  ngOnInit() {
    this.itemsCol = this.afs.collection('items');
    this.items = this.itemsCol.valueChanges();
    this.newItem = new Item();
  }

  addItem() {
    this.itemsCol.add({
      'description': this.newItem.description,
      'locationName': this.newItem.locationName,
      'locationId': this.newItem.locationId,
      'caseId': this.newItem.caseId,
    });
  }
  
}
