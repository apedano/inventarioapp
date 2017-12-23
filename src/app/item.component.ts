import { Component, Input } from '@angular/core';
import { Item } from './model/item.type';

@Component({
    selector: 'item-component',
    template: `
        <div class="card">
            <img src="{{item.imageUrl}}" alt="Avatar" style="width:50%;">
            <div class="container">
                <h4><b>{{item.description}}</b></h4> 
                <p>{{item.locationName}}</p> 
            </div>
        </div> 
    `,  
    styles: [`
        .card {
            background-color:#f0ffff;
            margin-top:15px;
            margin-bottom:15px;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            transition: 0.3s;
            width: 40%;
            border-radius: 5px;
        }
        
        .card:hover {
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        }
        
        img {
            border-radius: 5px 5px 0 0;
        }
        
        .container {
            padding: 2px 16px;
        }
    `],
  })
export class ItemComponent {
    @Input() public item: Item;
}
  

