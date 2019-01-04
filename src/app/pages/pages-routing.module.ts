import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';

const PAGES_ROUTES: Routes = [
    {
        path: 'pages',
        component: PagesComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'account-settings', component: AccountSettingsComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'graficas1', component: Graficas1Component },
            { path: 'progress', component: ProgressComponent },
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild( PAGES_ROUTES ) ],
    exports: [ RouterModule ]
})

export class PagesRoutingModules {}
