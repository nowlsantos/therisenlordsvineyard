import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: AdminComponent }
        ]
    }
];

@NgModule({
    declarations: [
        AdminComponent,
        LoginComponent
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
    ]
})
export class AdminModule { }
