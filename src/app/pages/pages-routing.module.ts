import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { AuthenticationGuard } from 'src/app/services/guards/authetincation.guard';

const PAGES_ROUTES: Routes = [
    {
        path: 'pages',
        component: PagesComponent,
        canActivate: [ AuthenticationGuard ],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Configuración' } },
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
            { path: 'graficas1', component: Graficas1Component, data: { title: 'Gráficas' } },
            { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
            { path: 'promesas', component: PromesasComponent, data: { title: 'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { title: 'Observable' } }
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild( PAGES_ROUTES ) ],
    exports: [ RouterModule ]
})

export class PagesRoutingModules {}
