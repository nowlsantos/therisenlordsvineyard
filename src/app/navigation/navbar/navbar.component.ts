import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ViewPortService } from 'src/app/services/viewport.service';
import { AuthService } from 'src/app/admin/services/auth.service';
import { SubSink } from 'subsink';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
    private subs = new SubSink();

    @Output() opened = new EventEmitter<boolean>();
    isHandset = false;
    displayName = '';

    constructor(private viewportService: ViewPortService,
                private authService: AuthService) {}

    ngOnInit() {
        this.subs.add(
            this.viewportService.viewportLayout$.subscribe(handSet => {
                this.isHandset = handSet.isHandset;
                console.log(this.isHandset);
            })
        );

        this.subs.add(
            this.authService.user$.subscribe(user => {
                user ? this.displayName = user.displayName : this.displayName = 'Friend!';
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
