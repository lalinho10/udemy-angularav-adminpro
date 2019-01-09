import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})

export class PromesasComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    const promesa = new Promise( ( resolve, reject ) => {
      let count = 0;

      const interval = setInterval( () => {
        count = count + 1;

        console.log( count );

        if ( count === 3 ) {
          resolve( 'Éxito forzado' );
          // reject( 'Error forzado' );
          clearInterval( interval );
        }
      }, 1000);
    });

    promesa.then( ( mensaje ) => {
      console.log( 'La promesa terminó', mensaje );
    }).catch( ( error ) => {
      console.error( 'Error en la promesa.', error );
    });
  }

}
