import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'story-404',
  template: `
    <h4>Page Not Found (404)!</h4>
    <div>I do not think this page is where you think it is.</div>
    <a routerLink="/" routerLinkActive="active">HomePage</a>
  `
})
export class PageNotFoundComponent { }