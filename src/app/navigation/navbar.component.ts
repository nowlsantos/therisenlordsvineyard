import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ViewPortService } from 'src/app/services/viewport.service';
import { AuthService } from 'src/app/admin/services/auth.service';
import { SubSink } from 'subsink';
import { LoginService } from '../admin/services/login.services';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
    private subs = new SubSink();

    @Output() opened = new EventEmitter<boolean>();
    isHandset = false;
    displayName: string;

    constructor(private viewportService: ViewPortService,
                private loginService: LoginService,
                private authService: AuthService) {}

    ngOnInit() {
        this.subs.add(
            this.viewportService.viewportLayout$.subscribe(handSet => {
                this.isHandset = handSet.isHandset;
                // console.log(this.isHandset);
            })
        );

        this.subs.add(
            this.authService.user$.subscribe(user => {
                if ( user ) {
                    this.displayName = user.displayName;
                }
            })
        );

        this.subs.add(
            this.loginService.login$.subscribe(isLoggedIn => {
                // console.log('LoginService::logged- ', isLoggedIn);
                if ( !isLoggedIn ) {
                    this.displayName = 'Friend';
                }
            })
        );
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    open(flag: boolean) {
        this.opened.emit(flag);
    }
}

/*
import { Component, Output, EventEmitter, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ViewPortService } from 'src/app/services/viewport.service';
import { AuthService } from 'src/app/admin/services/auth.service';
import { LoginService } from '../admin/services/login.services';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
    // @Input() isMember$: Observable<boolean>;
    @Output() opened = new EventEmitter<boolean>();
    // hideMember = false;
    isHandset = false;
    displayName = 'Friend';

    constructor(private viewportService: ViewPortService,
                private loginService: LoginService,
                private authService: AuthService) {}

    ngOnInit() {
        this.viewportService.viewportLayout$.subscribe(handSet => {
            this.isHandset = handSet.isHandset;
            console.log('isHandset:', this.isHandset);
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

        // this.isMember$.subscribe(flag => this.hideMember = flag);
    }

    open(flag: boolean) {
        this.opened.emit(flag);
    }

    /* homeClick() {
        // this.hideMember = true;
        // this.isMember$.subscribe(flag => this.hideMember = !flag);
    } */
//}
