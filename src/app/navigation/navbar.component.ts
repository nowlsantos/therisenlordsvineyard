import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ViewPortService } from 'src/app/services/viewport.service';
import { AuthService } from 'src/app/admin/services/auth.service';

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
    }

    open(flag: boolean) {
        this.opened.emit(flag);
    }
}
