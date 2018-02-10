import { Component, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FilterPipe } from './filter.pipe';

import { ItemService } from './service/item.service';

import { ItemFormComponent } from './item-form.component';
import { ItemComponent } from './item.component';
import { Item } from './model/item.type';

@Component({
    selector : 'item-list',
    template : `

        <div class="grid-x grid-margin-x" *ngIf="loading">
            <div class="small-12 cell">
                <div class="cssload-container">
                    <div class="cssload-whirlpool"></div>
                </div>
            </div>
        </div>
        <div class="grid-container fluid" *ngIf="!loading">
            <div class="grid-x grid-margin-x">
                <div class="small-12 cell">
                    <h4>{{title}}</h4>
                </div>
            </div>
            <h4>Here the list of items form Firestore: </h4>
            <div class="grid-x grid-margin-x">
                <div class="small-4 large-offset-4 cell">
                    <label>Search Items:</label>
                    <input [(ngModel)]="searchText" placeholder="search text goes here">
                </div>
            </div>
        </div>
        <div class="grid-x grid-padding-x small-up-4 medium-up-4 large-up-4">
            <div *ngFor="let item of items | async | filter : searchText" class="cell">
                <!-- here we subscribe to the event emitter output of item-component, (here as input) receiving the emitted event--> 
                <item-component (itemEmitter)="handleEvent($event)" [item]="item"></item-component>
            </div>
        </div>
        <div *ngIf="!loading">
            <item-form></item-form>
        </div>
    `,
    styles : [ `
        .cssload-container{
            position:relative;
        }
            
        .cssload-whirlpool,
        .cssload-whirlpool::before,
        .cssload-whirlpool::after {
            position: absolute;
            top: 50%;
            left: 50%;
            border: 1px solid rgb(204,204,204);
            border-left-color: rgb(0,0,0);
            border-radius: 974px;
                -o-border-radius: 974px;
                -ms-border-radius: 974px;
                -webkit-border-radius: 974px;
                -moz-border-radius: 974px;
        }
        
        .cssload-whirlpool {
            margin: -24px 0 0 -24px;
            height: 49px;
            width: 49px;
            animation: cssload-rotate 1150ms linear infinite;
                -o-animation: cssload-rotate 1150ms linear infinite;
                -ms-animation: cssload-rotate 1150ms linear infinite;
                -webkit-animation: cssload-rotate 1150ms linear infinite;
                -moz-animation: cssload-rotate 1150ms linear infinite;
        }
        
        .cssload-whirlpool::before {
            content: "";
            margin: -22px 0 0 -22px;
            height: 43px;
            width: 43px;
            animation: cssload-rotate 1150ms linear infinite;
                -o-animation: cssload-rotate 1150ms linear infinite;
                -ms-animation: cssload-rotate 1150ms linear infinite;
                -webkit-animation: cssload-rotate 1150ms linear infinite;
                -moz-animation: cssload-rotate 1150ms linear infinite;
        }
        
        .cssload-whirlpool::after {
            content: "";
            margin: -28px 0 0 -28px;
            height: 55px;
            width: 55px;
            animation: cssload-rotate 2300ms linear infinite;
                -o-animation: cssload-rotate 2300ms linear infinite;
                -ms-animation: cssload-rotate 2300ms linear infinite;
                -webkit-animation: cssload-rotate 2300ms linear infinite;
                -moz-animation: cssload-rotate 2300ms linear infinite;
        }
        
        
        
        @keyframes cssload-rotate {
            100% {
                transform: rotate(360deg);
            }
        }
        
        @-o-keyframes cssload-rotate {
            100% {
                -o-transform: rotate(360deg);
            }
        }
        
        @-ms-keyframes cssload-rotate {
            100% {
                -ms-transform: rotate(360deg);
            }
        }
        
        @-webkit-keyframes cssload-rotate {
            100% {
                -webkit-transform: rotate(360deg);
            }
        }
        
        @-moz-keyframes cssload-rotate {
            100% {
                -moz-transform: rotate(360deg);
            }
        }
        `
    ]

})
export class ItemListComponent{
    items : Observable<Item[]>;
    //addresses the ItemFormComponent inside component template
    @ViewChild(ItemFormComponent) itemForm : ItemFormComponent;
    
    public title : String;
    searchText: String;

    loading : Boolean = true;

    constructor(private itemService: ItemService){
    };

    ngOnInit(){
        this.items = this.itemService.getAll();
        this.items.subscribe(() => this.loading = false);
        console.log("Item list loaded...");
    }

    //the emitted event is an item
    handleEvent(event : Item) : void {
     //alert("Inner Form populated for item  [" + event.description + "] edit");
     this.itemForm.populate(event); 
    }
}





