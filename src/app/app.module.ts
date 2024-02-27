import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Injector } from '@angular/core'; // Import CUSTOM_ELEMENTS_SCHEMA
import { CounterModule } from './counter/counter.module'; // Import CounterModule
import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';
import { HttpClientModule } from '@angular/common/http';
import { CounterComponent } from './counter/counter.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    CounterModule // Add CounterModule to imports
  ],
  providers: [],
  //bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add CUSTOM_ELEMENTS_SCHEMA
})

export class AppModule { 
  constructor(private injector: Injector)
  {
  }

  ngDoBootstrap() {
    const counterElement = createCustomElement(CounterComponent, { injector: this.injector });
    customElements.define('app-counter2', counterElement);
  }
}
