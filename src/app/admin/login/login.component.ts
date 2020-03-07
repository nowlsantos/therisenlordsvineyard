import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
// import { LoginService } from '../login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ErrorService } from 'src/app/services/error.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SubSink } from 'subsink';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    loginForm: FormGroup;
    hide = true;
    private submitted = false;
    private subs = new SubSink();

    constructor(
        public authService: AuthService,
        // private loginService: LoginService,
        // private errorService: ErrorService,
        private snackBar: MatSnackBar,
        private fb: FormBuilder) { }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.email, Validators.required]],
            // password: ['', [Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
            password: ['', [Validators.minLength(6), Validators.maxLength(25), Validators.required]]
        });

        this.subs.add(
            this.authService.user$.subscribe(user => {
                if (user) {
                    // console.log('User onInit: ', user);
                    // this.loginService.broadcastLogin(user.isAdmin);
                }
            })
        );

        /* this.subs.add(
            this.errorService.message$.subscribe(error => {
                if (error && this.submitted) {
                    // console.log('Login: ', error.message);
                    const data = error.message;
                    const position = data.lastIndexOf('Error');
                    const message = data.slice(position, data.length);
                    this.openSnackBar(message);
                }
            })
        ); */
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }

    getEmailErrorMessage() {
        return this.email.hasError('required') ? 'You must enter a value' :
            this.email.hasError('email') ? 'Not a valid email' : '';
    }

    getPasswordErrorMessage() {
        return this.password.hasError('required') ? 'You must enter a password' : '';
    }

    onLogin() {
        this.submitted = true;
        this.authService.emailSignIn(this.email.value, this.password.value);
    }

    onLogout() {
        this.authService.signOut();
        // this.loginService.broadcastLogin(false);
    }

    openSnackBar(message: string) {
        const config: MatSnackBarConfig = {
            panelClass: ['sb-config-error'],
            duration: 5000
        };

        const snackbar = this.snackBar.open(message, 'Close', config);
        snackbar.afterDismissed().subscribe(_ => {
            this.submitted = false;
        });
    }
}
