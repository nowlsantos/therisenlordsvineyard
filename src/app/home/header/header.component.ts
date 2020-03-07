import { Component, OnInit } from '@angular/core';
import { ViewPortService } from '../../services/viewport.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(private viewportService: ViewPortService) { }

    ngOnInit() {
        this.viewportService.viewportLayout$.subscribe(viewport => {
            // console.log('HeaderComp: ', viewport);
        });
    }
}
