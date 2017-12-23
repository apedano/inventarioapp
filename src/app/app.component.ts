import { Component } from '@angular/core';
import { Item } from './model/item.type';
//firestore integration imports
//import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ItemService } from './service/item.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ItemComponent } from './item.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  items: Observable<Item[]>;
  newItem: Item;
  searchText: String;

  constructor(private itemService: ItemService) {}
  
  ngOnInit() {
    this.items = this.itemService.getAllItems();
    this.newItem = new Item();
  }

  addItem() {
    this.itemService.addNewItem(this.newItem);
  }
  
}
