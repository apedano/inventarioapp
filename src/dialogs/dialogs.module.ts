import { NgModule} from "@angular/core";
//import CommonModule insted of BrowserModel
//we can see that it's re-exporting the CommonModule 
//with a lot of other services that helps with rendering 
//an Angular application in the browser. These services are coupling our 
//root module with a particular platform (the browser), but we want our 
//feature modules to be platform independent. 
//That's why we only import the CommonModule there, which only exports common directives and pipes.
import { CommonModule } from "@angular/common";

import { ConfirmDialogComponent } from "./confirm-dialog.component";

@NgModule({
    declarations : [ ConfirmDialogComponent],
    imports : [],
    providers : [],
    entryComponents : [ConfirmDialogComponent],
    //Every element defined in the declarations array is private by default. 
    //We should only export whatever the other modules in our application need to perform its job. 
    exports : [ConfirmDialogComponent]
})
export class DialogsModule {

}