import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ViewPortService } from 'src/app/services/viewport.service';
import { AuthService } from 'src/app/admin/services/auth.service';
import { LoginService } from '../admin/services/login.services';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    @Output() opened = new EventEmitter<boolean>();
    isHandset = false;
    displayName = 'Friend';

    constructor(private viewportService: ViewPortService,
                private loginService: LoginService,
                private authService: AuthService) {}

    ngOnInit() {
        this.viewportService.viewportLayout$.subscribe(handSet => {
            this.isHandset = handSet.isHandset;
            // console.log('isHandset:', this.isHandset);
        });

        this.authService.user$.subscribe(user => {
            if ( user ) {
                this.displayName = user.displayName;
            }
        });

        this.loginService.login$.subscribe(isLoggedIn => {
            // console.log('LoginService::logged- ', isLoggedIn);
            if ( !isLoggedIn ) {
                this.displayName = 'Friend';
            }
        });
    }

    open(flag: boolean) {
        this.opened.emit(flag);
    }
}
