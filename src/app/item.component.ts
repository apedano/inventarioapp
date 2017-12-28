import { Component, Input, EventEmitter } from '@angular/core';

import { Item } from './model/item.type';

@Component({
    selector: 'item-component',
    //custom event emitter, emits item description when element is clicked
    outputs: ['itemEmitter'],
    template: `
        <div class="basic-card" (click)="emitItem()">
            <div class="basic-card-image">
                <img src="{{item.imageUrl}}" alt="{{item.description}}-img">
            </div>
            <div class="basic-card-content content callout primary">
            <p class="itemId">{{item.id}}</p>
            <p>{{item.locationName}}</p>
            <p>{{item.description}}</p>
            </div>
        </div>
    `,  
    styles: [`

        .basic-card {
            @include card-container;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            margin: 0 auto;
            width: 100%;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            transition: 0.3s;
            border-radius: 5px;
        }

        .basic-card p {
            font-size: 8px;
            margin-bottom: 0;
            font-size: inherit;
        }

        .basic-card p.itemId {
            font-weight: bold;
        }
        
        .basic-card-image {
            text-align:center;
            grid-row-end: 4;
            grid-row-start: 1;
        
            img {
                width: 100%;
            }
        }
        
        .basic-card-content {
            border: 0;
            grid-row-start: 3 / 4;
            margin: 0;
            overflow: scroll;
        }

        .basic-card:hover {
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        }
      
    `],
  })
export class ItemComponent {
    @Input() public item: Item;
    //the event emitter implements Observable pattern
    //eny component can subscribe to connected component output
    //and receive emitted event (in this case a string value)
    itemEmitter : EventEmitter<Item>;

    constructor(){
        this.itemEmitter = new EventEmitter();
    }

    //this method emit a new event from EventEmitter 
    emitItem() : void {
        this.itemEmitter.emit(this.item);
    }
}
  

