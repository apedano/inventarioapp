import { Component, ViewChild, Input } from '@angular/core';
import { Item } from './model/item.type';
import { ItemService } from './service/item.service';
import { NgForm } from '@angular/forms';


@Component({
    selector : 'item-form',
    styles : [`
        .error {
            color:red;
        }

        .success {
            color:green;
        }
        
        input.error {
            border-color: red;
        }

        input.success {
            border-color: green;
        }
    `
    ],
    template : `
        <h3>Form for item: {{item.id}}</h3>
        <!-- novalidate disable the default browser validation-->
        <form #f="ngForm" (ngSubmit)="onSubmit(f)" novalidate>
            <!--<pre>{{f.value | json}}</pre>-->
            <p>Is "f" valid? {{f.valid}}</p>
            <div class="grid-container">
                <div class="grid-x grid-padding-x">
                    <div class="small-4 cell">
                        <label>Case ID 
                            <show-errors [control]="caseId"></show-errors>
                            <input type="number" placeholder="insert number" name="item.caseId" 
                                [(ngModel)]="item.caseId" 
                                #caseId="ngModel"
                                [ngClass]="{
                                    'error': caseId.invalid && (caseId.dirty || caseId.touched),
                                    'success': caseId.valid && (caseId.dirty || caseId.touched)
                                }"
                                required
                                positiveInteger>
                        </label>
                    </div>
                    <div class="small-4 cell">
                        <label>Description
                            <show-errors [control]="description"></show-errors>
                            <input type="text" placeholder="insert description" name="item.description" 
                                [(ngModel)]="item.description" 
                                #description="ngModel"
                                [ngClass]="{
                                    'error': description.invalid && (description.dirty || description.touched),
                                    'success': description.valid && (description.dirty || description.touched)
                                }"
                                required>
                        </label>
                    </div>
                    <div class="small-4 cell">
                        <label>Image URL
                            <show-errors [control]="imageUrl"></show-errors>
                            <input type="text" placeholder="insert url" name="item.imageUrl" 
                                [(ngModel)]="item.imageUrl" 
                                #imageUrl="ngModel"
                                [ngClass]="{
                                    'error': imageUrl.invalid && (imageUrl.dirty || imageUrl.touched),
                                    'success': imageUrl.valid && (imageUrl.dirty || imageUrl.touched)
                                }"
                                required>
                        </label>
                    </div>
                </div>
                <div class="grid-x grid-padding-x">
                    <div class="small-4 cell">
                        <label>Location ID
                            <show-errors [control]="locationId"></show-errors>
                            <input type="number" placeholder="insert url" name="item.locationId" 
                                [(ngModel)]="item.locationId" 
                                #locationId="ngModel"
                                [ngClass]="{
                                    'error': locationId.invalid && (locationId.dirty || locationId.touched),
                                    'success': locationId.valid && (locationId.dirty || locationId.touched)
                                }"
                                positiveInteger
                                required>
                        </label>
                    </div>
                    <div class="small-4 cell">
                        <label>Location name
                            <show-errors [control]="locationName"></show-errors>
                            <input type="text" placeholder="insert url" name="item.locationName" 
                                [(ngModel)]="item.locationName" 
                                #locationName="ngModel"
                                [ngClass]="{
                                    'error': locationName.invalid && (locationName.dirty || locationName.touched),
                                    'success': locationName.valid && (locationName.dirty || locationName.touched)
                                }"
                                required>
                        </label>
                    </div>
                    <div class="small-4 cell medium-cell-block">
                        <button *ngIf="f.valid"  type="submit" class="primary button">Save</button>
                    </div>
                </div>
            </div>
        </form>
    `
})
export class ItemFormComponent {
    
    //So we can access form outer the submit method
    @ViewChild('f') form: any;
    
    @Input() item : Item = new Item();
    
    constructor(private itemService: ItemService){}

    populate(editItem : Item){
        this.item = editItem;
    }

    initNew(){
        this.item = new Item();   
    }
      
    onSubmit(form : NgForm) :void {
        if(form.valid){
            console.log("Submitted form value: ", form);
            console.log("Populated item model: ", this.item);
            this.itemService.addNewItem(this.item);
            form.resetForm(); // or form.reset();
            console.log("Item saved!");
        } else {
            alert("Form is invalid. Nothing submitted!!");
        }
        
    }
}