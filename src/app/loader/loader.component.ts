import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    isLoading: BehaviorSubject<boolean> = this.loaderService.isLoading;

    constructor(private loaderService: LoaderService) { }

    ngOnInit() {
        this.isLoading.subscribe(loading => console.log('OnInit Preloader: ', loading));
    }
}
