import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})

export class IncrementadorComponent implements OnInit {
  @Input( 'name' ) label: string = 'Leyenda';
  @Input() progress: number = 50;

  @Output() changedValue: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild( 'txtProgress' ) txtProgress: ElementRef;

  constructor() {}

  ngOnInit() {
  }

  changeValue( value: number ) {
    this.progress = this.progress + value;

    if ( this.progress >= 100 ) {
      this.progress = 100;
    } else if ( this.progress <= 0 ) {
      this.progress = 0;
    }

    this.changedValue.emit( this.progress );

    this.txtProgress.nativeElement.focus();
  }

  onModelChange( value: number ): void {
    if ( value >= 100 ) {
      this.progress = 100;
    } else if ( value <= 0 ) {
      this.progress = 0;
    } else {
      this.progress = value;
    }

    this.txtProgress.nativeElement.value = this.progress;

    this.changedValue.emit( this.progress );
  }

}
