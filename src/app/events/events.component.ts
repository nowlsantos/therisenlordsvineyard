import { Component, OnInit } from '@angular/core';
import { EventModel } from './services/event.model';
import { Observable } from 'rxjs';
import { EventService } from './services/event.service';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
    event$: Observable<EventModel[]>;

    displayedColumns: string[] = ['name', 'location', 'date'];
    dataSource: any;

    constructor(private eventService: EventService) { }

    ngOnInit() {
        this.dataSource = this.eventService.getEvents();
    }
}