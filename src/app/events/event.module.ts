import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { EventsComponent } from './events.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '', component: EventsComponent,
        data: { state: 'events' }
    }
];

@NgModule({
    declarations: [EventsComponent],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class EventModule { }
