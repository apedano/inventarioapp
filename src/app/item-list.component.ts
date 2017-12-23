import { Component, Input } from '@angular/core';

import { ItemComponent } from './item.component';
import { Item } from './model/item.type';

@Component({
    selector : 'item-list',
    template : `
        <div class="item-list-container">
        <div><input [(ngModel)]="searchText" placeholder="search text goes here"></div>
        <div *ngFor="let item of itemList | async | filter : searchText" style="width:50%; text-align:center">
            <item-component [item]="item"></item-component>
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
}





