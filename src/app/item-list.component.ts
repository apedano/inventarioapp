import { Component, Input } from '@angular/core';

import { ItemComponent } from './item.component';
import { Item } from './model/item.type';

@Component({
    selector : 'item-list',
    template : `
        <div class="item-list-container">
        <div><input [(ngModel)]="searchText" placeholder="search text goes here"></div>
        <div *ngFor="let item of itemList | async | filter : searchText" style="width:50%; text-align:center">
            <!-- here we subscribe to the event emitter output of item-component, (here as input) receiving the emitted event--> 
            <item-component (itemEmitter)="handleEvent($event)" [item]="item"></item-component>
        </div>
        </div>
    
    `,
    styles : [ `
        div.item-list-container {
            width: 100%;
            text-align: center;
        }
        `
    ]

})
export class ItemListComponent{
    @Input() public itemList : Item[];
    searchText: String;

    //the emitted event is a string
    handleEvent(event : Item) : void {
     alert("ItemList Components says: " + event.description + " whas clicked"); 
    }
}





