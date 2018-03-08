import { Component } from '@angular/core';
import { Item } from './model/item.type';

//to use later in browser to call jQUERY
declare var $:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Inventario App';

  ngOnInit(){
    console.log("foundation framework init...")
    $(document).foundation();
  }
}
