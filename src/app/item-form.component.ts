import { Component } from '@angular/core';
import { Item } from './model/item.type';
import { ItemService } from './service/item.service';

@Component({
    selector : 'item-form',
    template : `
        <h3>Form for item: {{item.description}}</h3>
        <form #f="ngForm" (ngSubmit)="onSubmit(f.value)">
            <pre>{{f.value | json}}</pre>
            <div class="grid-container">
                <div class="grid-x grid-padding-x">
                    <div class="small-4 cell">
                        <label>Case ID
                            <input type="number" placeholder="insert number" name="item.cadeId" [(ngModel)]="item.caseId">
                        </label>
                    </div>
                    <div class="small-4 cell">
                        <label>Description
                            <input type="text" placeholder="insert description" name="item.description" [(ngModel)]="item.description">
                        </label>
                    </div>
                    <div class="small-4 cell">
                        <label>Image URL
                            <input type="url" placeholder="insert url" name="item.imageUrl" [(ngModel)]="item.imageUrl">
                        </label>
                    </div>
                </div>
                <div class="grid-x grid-padding-x">
                    <div class="small-4 cell">
                        <label>Location ID
                            <input type="number" placeholder="insert location ID" name="item.locationId" [(ngModel)]="item.locationId">
                        </label>
                    </div>
                    <div class="small-4 cell">
                        <label>Location name
                            <input type="text" placeholder="insert location name" name="item.locationName" [(ngModel)]="item.locationName">
                        </label>
                    </div>
                    <div class="small-4 cell medium-cell-block">
                        <button type="submit" class="primary button">Save</button>
                    </div>
                </div>
            </div>
        </form>
    `
})
export class ItemFormComponent {
    
    item : Item;
    
    constructor(private itemService: ItemService){}

    ngOnInit() {
        this.item = new Item();
      }

    onSubmit(form : any) :void {
        console.log("Submitted form value: ", form);
        console.log("Populated item model: ", this.item );
        this.itemService.addNewItem(this.item);
        console.log("Item saved!");
    }
}