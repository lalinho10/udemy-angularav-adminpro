import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { PagesRoutingModules } from './pages-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    declarations: [
        PagesComponent,
        AccountSettingsComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        PromesasComponent,
        RxjsComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        ProfileComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        Graficas1Component,
        ProgressComponent,
        IncrementadorComponent,
        GraficoDonaComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ChartsModule,
        PagesRoutingModules,
        SharedModule,
        PipesModule
    ]
})

export class PagesModule {}
