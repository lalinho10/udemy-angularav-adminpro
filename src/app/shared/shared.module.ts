import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PageNotFountComponent } from './page-not-fount/page-not-fount.component';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
    PageNotFountComponent
  ],
  exports: [
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
    PageNotFountComponent
  ],
  imports: [
    CommonModule
  ]
})

export class SharedModule {}
