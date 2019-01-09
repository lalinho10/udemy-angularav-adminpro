import { Component, OnInit } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { ActivationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})

export class BreadcrumbsComponent implements OnInit {
  title: string;

  constructor(
    private htmlMeta: Meta,
    private htmlTitle: Title,
    private router: Router
  ) {
    this.getRouteData().subscribe( data => {
      this.title = data.title;
      this.htmlTitle.setTitle( this.title );

      const metaAttributes: MetaDefinition = { name: 'description', content: this.title };
      this.htmlMeta.updateTag( metaAttributes );
    });
  }

  ngOnInit() {
  }

  getRouteData(): Observable<any> {
    return this.router.events.pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( ( event: ActivationEnd ) => event.snapshot.firstChild === null ),
      map( ( event: ActivationEnd ) => event.snapshot.data )
    );
  }

}
