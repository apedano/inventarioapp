import { Component, Input, Output, ViewContainerRef, EventEmitter } from '@angular/core';

//utility variable populated in the client side execution
declare var Foundation:any;
declare var $:any;

@Component({
    selector : 'confirm-dialog',
    template : `
        <div class="reveal" id="{{modalId}}" data-reveal>
            <h3>{{dialogTitle}}</h3>
            <p>{{confirmMessage}}</p>
            <button class="close-button" (click)="closeAndDestroyModal()" aria-label="Close" type="button">
                <span aria-hidden="true">&times;</span>
            </button>
            <div class="toolbar">
                <a class="button" (click)="emitOk()">{{okLabel}}</a>
            </div>
        </div>    
    `
})
export class ConfirmDialogComponent {
    private modal : any;
    //component's inputs
    @Input() dialogTitle : string;
    @Input() confirmMessage : string;
    @Input() okLabel : string = "OK";
    @Input() modalId : string = "confirmModalId";
    @Input() viewContainerRef : ViewContainerRef;
    //click events output
    @Output() okEmitter : EventEmitter<void> = new EventEmitter<void>();

    constructor(){
    }
    
    open() {
        console.log("Opening modal...");
        this.modal = new Foundation.Reveal($('#confirmModalId'));
        this.modal.open();
        console.log("Modal opened!");

    }

    closeAndDestroyModal(){
        this.modal.close();
        this.modal.destroy();
        //reveal modal creates a div as container of modal html, we have to remove it.
        $("div#"+this.modalId).remove();
        //now we remove the dynamically created confirm-dialog compoenent.
        this.viewContainerRef.clear();
    }

    emitOk() {
        this.okEmitter.emit();
        this.closeAndDestroyModal();
    }

}


