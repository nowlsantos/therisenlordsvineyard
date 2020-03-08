import { NgModule } from '@angular/core';
import { MembersComponent } from './members.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
    {
        path: '', component: MembersComponent,
        data: { state: 'members' }
    }
];

@NgModule({
    declarations: [MembersComponent],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class MemberModule { }
