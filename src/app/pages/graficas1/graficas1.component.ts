import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})

export class Graficas1Component implements OnInit {
  graphs: any = {
    'g1': {
      'labels': ['Con Frijoles', 'Con Natilla', 'Con tocino'],
      'data':  [24, 30, 46],
      'type': 'doughnut',
      'label': 'El pan se come con'
    },
    'g2': {
      'labels': ['Hombres', 'Mujeres'],
      'data':  [4500, 6000],
      'type': 'doughnut',
      'label': 'Entrevistados'
    },
    'g3': {
      'labels': ['Si', 'No'],
      'data':  [95, 5],
      'type': 'doughnut',
      'label': '¿Le dan gases los frijoles?'
    },
    'g4': {
      'labels': ['No', 'Si'],
      'data':  [85, 15],
      'type': 'doughnut',
      'label': '¿Le importa que le den gases?'
    },
  };

  constructor() { }

  ngOnInit() {
  }

}
