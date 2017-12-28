import { Component, Input, ViewChild } from '@angular/core';
import { ItemFormComponent } from './item-form.component'

import { ItemComponent } from './item.component';
import { Item } from './model/item.type';

@Component({
    selector : 'item-list',
    template : `
        <div class="grid-container fluid">
            <div class="grid-x grid-margin-x">
                <div class="small-4 large-offset-4 cell">
                    <label>Search Items:</label>
                    <input [(ngModel)]="searchText" placeholder="search text goes here">
                </div>
            </div>
        </div>
        <div class="grid-x grid-padding-x small-up-4 medium-up-4 large-up-4">
            <div *ngFor="let item of itemList | async | filter : searchText" class="cell">
                <!-- here we subscribe to the event emitter output of item-component, (here as input) receiving the emitted event--> 
                <item-component (itemEmitter)="handleEvent($event)" [item]="item"></item-component>
            </div>
        </div>
        <item-form></item-form>
    
    `,
    styles : [ `
        
        `
    ]

})
export class ItemListComponent{
    @Input() public itemList : Item[];
    @ViewChild(ItemFormComponent) itemForm : ItemFormComponent; 
    
    searchText: String;

    //the emitted event is an item
    handleEvent(event : Item) : void {
     alert("Inner Form populated for item  [" + event.description + "] edit");
     this.itemForm.populate(event); 
    }
}





