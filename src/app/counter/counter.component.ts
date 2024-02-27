import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom, // Encapsulate styles in shadow DOM
})
export class CounterComponent implements OnInit {
  _labelText?: string;
  @Input() set labeltext(value: string) {
    this._labelText = value;
  }
  @Output() customEvent = new EventEmitter<string>();
  @Input() externalFunction!: () => void;
  counterValue: number = 0;
  eventSource: any;

  constructor(private http: HttpClient) {
    console.log('CounterApp: constructor called');
  }

  ngOnInit(): void {
    this.http.get('https://api.quotable.io/quotes/random').subscribe(
      (response: any) => {
        console.log('CounterApp: Sample Quote API Response:', response);
      },
      (error: any) => {
        console.error('API Error:', error);
      }
    );

    window.addEventListener('messageToAngular', (event: any) => {
      const message = event.detail;
      console.log('CounterApp: Message received from Visualforce:', message);
      this.labeltext = message;
    });
  }

  sendMessage() {
    this.customEvent.emit('Msg from angular to VF page');
    console.log('CounterApp: Sending message to parent page');
  }

  increment() {
    this.counterValue++;
  }
}
