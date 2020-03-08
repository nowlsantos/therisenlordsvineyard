import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    constructor(public authService: AuthService,
                private router: Router) { }

    ngOnInit() {}

    onLogin(provider: string) {
        switch ( provider ) {
            case 'facebook':
                this.authService.facebookSignIn();
                break;

            case 'google':
                this.authService.googleSignIn();
                break;

            case 'email':
                // this.authService.emailSignIn('nowl', 'santos');
                break;
        }
    }

    onLogout() {
        this.authService.signOut();
        this.router.navigate(['/home']);
    }
}
