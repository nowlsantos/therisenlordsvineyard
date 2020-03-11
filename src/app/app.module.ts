import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navigation/navbar.component';
import { environment } from 'src/environments/environment';
import { LoaderComponent } from './loader/loader.component';

import { InterceptorProviders } from './interceptors';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LoaderComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig, 'nildashoppe'),
        AngularFirestoreModule,
        AngularFireAuthModule,
        SharedModule,
        AppRoutingModule
    ],
    providers: [ InterceptorProviders ],
    bootstrap: [AppComponent]
})
export class AppModule { }
