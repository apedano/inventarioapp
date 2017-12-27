import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule /*ngModel, ngForm*/, ReactiveFormsModule /* formControl, ngFormGroup */ } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment'
import { ItemService } from './service/item.service';

export const  firebaseConfig = environment.firebaseConfig;

import { AppComponent } from './app.component';
import { ItemComponent } from './item.component';
import { ItemListComponent } from './item-list.component';
import { ItemFormComponent } from './item-form.component';
import { FilterPipe } from './filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    ItemListComponent,
    ItemFormComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),  
    AngularFirestoreModule,
    FormsModule                            
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
