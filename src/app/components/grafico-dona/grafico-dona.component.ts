import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {
  @Input() label: string;
  @Input() chartData: any;
  @Input() chartLabels: string[];
  @Input() chartType: string;

  constructor() {}

  ngOnInit() {
  }

}
