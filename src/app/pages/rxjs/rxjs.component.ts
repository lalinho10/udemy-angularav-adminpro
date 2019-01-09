import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { filter, map, retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})

export class RxjsComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor() {
    this.subscription = this.regresaObservable().subscribe(
      number => { console.log( 'Next:', number ); },
      error  => { console.error( 'Error en observador:', error ); },
      () => { console.log( 'El observador terminó' ); }
    );
  }

  private regresaObservable(): Observable<any> {
    return new Observable( ( observer: Subscriber<any> ) => {
      let count = 0;

      const interval = setInterval( () => {
        count = count + 1;

        const output = { value: count };

        observer.next( output );
      }, 1000 );
    }).pipe(
      map( output => output.value ),
      filter( value => value % 2 !== 0 )
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
