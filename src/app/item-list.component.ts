import { Component, Input } from '@angular/core';

import { ItemComponent } from './item.component';
import { Item } from './model/item.type';

@Component({
    selector : 'item-list',
    template : `
        <div class="grid-container fluid">
            <div class="grid-x grid-margin-x">
                <div class="small-4 large-offset-4 cell"><input [(ngModel)]="searchText" placeholder="search text goes here"></div>
            </div>
        </div>
        <div class="grid-x grid-padding-x small-up-2 medium-up-4 large-up-6">
            <div *ngFor="let item of itemList | async | filter : searchText" class="cell small-offset-1">
                <!-- here we subscribe to the event emitter output of item-component, (here as input) receiving the emitted event--> 
                <item-component (itemEmitter)="handleEvent($event)" [item]="item"></item-component>
            </div>
        </div>
    
    `,
    styles : [ `
        
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





