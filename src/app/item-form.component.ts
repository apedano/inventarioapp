import { Component } from '@angular/core';
import { Item } from './model/item.type';

@Component({
    selector : 'item-form',
    template : `
        <h3>Form for item: {{item.description}}</h3>
        <form #f="ngForm" (ngSubmit)="onSubmit(f.value)"  
        
        >
        </form>
    `
})
export class ItemFormComponent {
    
    item : Item;
    
    constructor(){}
}