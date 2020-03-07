import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { map, share, tap } from 'rxjs/operators';
import { ViewPort } from './shared/viewport.model';
import { MatSidenavContainer, MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
// import { ViewPortService } from './services/viewport.service';
import { SubSink } from 'subsink';
import { LoginService } from './admin/services/login.services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    isHandset = false;
    isLoggedIn = false;

    private subs = new SubSink();
    @ViewChild(MatSidenavContainer, { static: false }) sidenavContainer: MatSidenavContainer;
    @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;

    private viewPort = new ViewPort();
    private layoutChanges$ = this.breakpointObserver.observe(
        [
            Breakpoints.Handset,
            Breakpoints.Tablet,
            Breakpoints.Web,
        ]
    ).pipe(
        // tap(value => console.log(value)),
        map(result => result.matches),
        share()
    );

    constructor(
        private loginService: LoginService,
        private breakpointObserver: BreakpointObserver,
        // private viewportService: ViewPortService,
        private router: Router) { }

    ngOnInit() {
        this.onLayoutChange();

        this.loginService.login$.subscribe(isLogged => {
            this.isLoggedIn = isLogged;
            console.log('LOGGED IN: ', this.isLoggedIn);
        });
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    private onLayoutChange() {
        this.subs.add(
            this.layoutChanges$.subscribe(result => {
                switch (result) {
                    case this.breakpointObserver.isMatched('(max-width: 599.99px) and (orientation: portrait)'):
                        this.isHandset = true;
                        this.viewPort.device = 'mobile';
                        this.viewPort.orientation = 'portrait';
                        break;

                    case this.breakpointObserver.isMatched('(max-width: 599.99px) and (orientation: landscape)'):
                        this.isHandset = true;
                        this.viewPort.device = 'mobile';
                        this.viewPort.orientation = 'landscape';
                        break;

                    /* For normal device res */
                    case this.breakpointObserver.isMatched('(min-width: 600px) and (max-width: 839.99px) and (orientation: portrait)'):

                    /* For high res like the ipad pro  */
                    case this.breakpointObserver.isMatched('(min-width: 840px) and (orientation: portrait)'):
                        this.isHandset = false;
                        this.viewPort.device = 'tablet';
                        this.viewPort.orientation = 'portrait';
                        break;

                    // case this.breakpointObserver.isMatched('(max-width: 959.99px) and (orientation: landscape)'):
                    case this.breakpointObserver.isMatched('(min-width: 600px) and (max-width: 959.99px) and (orientation: landscape)'):
                        this.viewPort.device = 'tablet';
                        this.viewPort.orientation = 'landscape';
                        this.isHandset = false;
                        break;

                    case this.breakpointObserver.isMatched('(min-width: 960px) and (max-width: 1279.99px) and (orientation: landscape)'):
                    case this.breakpointObserver.isMatched('(min-width: 1280px) and (orientation: landscape)'):
                        // default:
                        this.viewPort.device = 'web';
                        this.viewPort.orientation = 'landscape';
                        this.isHandset = false;
                        break;
                }
                // console.log(this.viewPort);
                // console.log(this.breakpointObserver);
                this.viewPort.isHandset = this.isHandset;
                // this.viewportService.broadcastLayout(this.viewPort);
            })
        );
    }

    closeSideNav() {
        this.sidenav.close();
    }
}
