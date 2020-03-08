import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuicklinkStrategy } from 'ngx-quicklink';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home', component: HomeComponent,
        loadChildren: () => import('./home/home.module').then( m => m.HomeModule ),
        data: {
            preload: true,
            state: 'home'
        }
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule ),
        data: {
            preload: true,
            state: 'admin'
        }
    },
    {
        path: 'events',
        loadChildren: () => import('./events/event.module').then( m => m.EventModule ),
        data: {
            preload: true,
            state: 'events'
        }
    },
    {
        path: 'members',
        loadChildren: () => import('./members/member.module').then( m => m.MemberModule ),
        data: {
            preload: true,
            state: 'members'
        }
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: QuicklinkStrategy})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
