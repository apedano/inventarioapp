import { Component, Input, EventEmitter } from '@angular/core';

import { Item } from './model/item.type';

@Component({
    selector: 'item-component',
    //custom event emitter, emits item description when element is clicked
    outputs: ['itemEmitter'],
    template: `
        <div class="card" style="width: 300px;" (click)="emitItem()">
            <div class="card-divider">
                Item
            </div>
            <div class="card section">
                <img src="{{item.imageUrl}}" alt="{{item.description}}-img">
            </div>
            <div class="card-section">
                <h4>{{item.locationName}}</h4>
                <p>{{item.description}}</p>
            </div>
        </div>
    `,  
    styles: [`
        .card {
            background-color:#f0ffff;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            transition: 0.3s;
            border-radius: 5px;
        }
        
        .card:hover {
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        }
        
        img {
            border-radius: 5px 5px 0 0;
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
  

