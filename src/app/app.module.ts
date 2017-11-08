import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';

// Paste in your credentials that you saved earlier
var firebaseConfig = {
    apiKey: "AIzaSyBEYuK5In_3f5ElFZ0VrptxSDH3jHKKqOs",
    authDomain: "inventarioproject.firebaseapp.com",
    databaseURL: "https://inventarioproject.firebaseio.com",
    projectId: "inventarioproject",
    storageBucket: "inventarioproject.appspot.com",
    messagingSenderId: "677173478227"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),  
    AngularFirestoreModule,
    FormsModule                            
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
