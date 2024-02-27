import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom // Encapsulate styles in shadow DOM
})
export class CounterComponent implements OnInit {
  _labelText?: string;
  @Input() set labeltext(value: string) {
    console.log("Setting label text ", value);
    
    this._labelText = value;
    }
  @Output() customEvent = new EventEmitter<string>();
  @Input() externalFunction!: () => void;
  counterValue: number = 0;
  eventSource:any;

  constructor(private http: HttpClient) { 
    console.log("Pradeep Came here constructor");
}
  ngOnInit(): void {
    this.http.get('https://api.quotable.io/quotes/random').subscribe((response: any) => {
      console.log('API Response:', response);
      // Handle the response data here
    }, (error: any) => {
      console.error('API Error:', error);
      // Handle errors here
    });
    console.log("Pradeep Came here Init");
    this.setupMessageChannel();

    window.addEventListener('messageToAngular', (event: any) => {
      const message = event.detail;
      console.log('Message from Visualforce:', message);
      this.labeltext = message;
      // Handle the message as needed within your Angular component
    });
  }

  
  sendMessage() {
    this.customEvent.emit("Msg from angular to VF page");
    console.log("Trying to push message to parent page");
  }

  setupMessageChannel(): void {
    // Define onLWCEventReceived function if it doesn't exist
    if (!(window as any).onLWCEventReceived) {
      (window as any).onLWCEventReceived = (message: any) => {
        console.log('Received message from VF_LWC_BRIDGE:', message);
        // Handle the message as needed
      };
    }
  }

  @HostListener('window:message', ['$event'])
  onMessage(event:any) {
    // Check the origin of the message
    // Perform some action based on the message data
    console.log('Received message from visual force page:', event.data);
    console.log('Received message from visual force page Evenbt :', event);
    // You can also send a response back to the visual force page
    this.eventSource  = event.source;//.postMessage('Hello from angular web component!', event.origin);
  }

  // ngOnInit(): void {
    
  // }

  increment() {
    this.counterValue++;
  }
}
