import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule /*ngModel, ngForm*/, ReactiveFormsModule /* formControl, ngFormGroup */ } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { DialogsModule} from '../dialogs/dialogs.module';
import { FilterPipe } from './filter.pipe';

import { environment } from '../environments/environment'
import { ItemService } from './service/item.service';

export const  firebaseConfig = environment.firebaseConfig;

import { AppComponent } from './app.component';
import { ItemComponent } from './item.component';
import { ItemListComponent } from './item-list.component';
import { ItemFormComponent } from './item-form.component';
import { PageNotFoundComponent} from './page-not-found.component';

import { PositiveIntegerValidatorDirective } from './validators/positive-int.validator';
import { ShowErrorsComponent } from './show-errors.component';

import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  /* Firt match strategy for routes resolving */
  {
    path: 'items',
    component: ItemListComponent,
    data: { title: 'Item list loaded from Firestore' }
  },
  { path: '',
    redirectTo: '/items',
    pathMatch: 'full'
  },
  { path: 'item/:id',      component: ItemFormComponent },
  //default route if all preceinding don't match
  { path: '**', component: PageNotFoundComponent }
  
  //{ path: 'crisis-center ', component: CrisisListComponent },
  //{
  //  path: 'heroes',
  //  component: HeroListComponent,
  //  data: { title: 'Heroes List' }
  //},
];

@NgModule({
  //lone application's components, directives or pipes
  declarations: [
    AppComponent,
    ItemComponent,
    ItemListComponent,
    ItemFormComponent,
    ShowErrorsComponent,
    FilterPipe,
    PositiveIntegerValidatorDirective,
    PageNotFoundComponent
  ],
  //external modules import
  imports: [
    //DOM rendering, sanitazion and location
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),  
    AngularFirestoreModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    //customized modules
    DialogsModule                            
  ],
  //array of services used by application
  providers: [ItemService],
  //application launches with the root ngModule which, itself, launches
  //the bootstrap component adding its template to the browser's DOM. This components represents 
  //the root of the tree application 
  bootstrap: [AppComponent]
})
export class AppModule { }
