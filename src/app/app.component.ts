import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-counter-app';
  @Output() myEvent = new EventEmitter<string>();

  triggerEvent(event:any)
  {
    console.log("Message is received in app component. Ready to send");
    
    this.myEvent.emit(event);
  }
}
