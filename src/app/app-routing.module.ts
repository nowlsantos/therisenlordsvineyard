import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
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
        path: 'members',
        loadChildren: () => import('./members/member.module').then( m => m.MemberModule ),
        data: {
            preload: true,
            state: 'members'
        }
    },
    {
        path: 'events',
        loadChildren: () => import('./members/member.module').then( m => m.MemberModule ),
        data: {
            preload: true,
            state: 'events'
        }
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
