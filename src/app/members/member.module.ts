import { NgModule } from '@angular/core';
import { MembersComponent } from './members.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MemberDetailComponent } from './member-detail/member-detail.component';

const routes: Routes = [
    {
        path: '', component: MembersComponent,
        data: { state: 'members' }
    }
];

@NgModule({
    declarations: [
        MembersComponent,
        MemberDetailComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class MemberModule { }
