import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { CounterComponent } from './counter.component';

@NgModule({
  declarations: [CounterComponent],
  imports: [],
  providers: [],
  exports:[CounterComponent]
})
export class CounterModule {
  constructor(private injector: Injector) {}

  // ngDoBootstrap() {
  //   const counterElement = createCustomElement(CounterComponent, { injector: this.injector });
  //   customElements.define('app-counter', counterElement);
  // }
}

