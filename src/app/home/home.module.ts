import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { VocationComponent } from './vocation/vocation.component';
import { CoreValuesComponent } from './core-values/core-values.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
    { path: '', component: HomeComponent, data: { state: 'home' } }
];

@NgModule({
    declarations: [
        HomeComponent,
        HeaderComponent,
        VocationComponent,
        CoreValuesComponent,
        FooterComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class HomeModule { }
