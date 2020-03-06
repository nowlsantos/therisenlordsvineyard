import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

    @Output() opened = new EventEmitter<boolean>();

    open(flag: boolean) {
        this.opened.emit(flag);
    }
}
