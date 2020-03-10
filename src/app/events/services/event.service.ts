import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { EventModel } from './event.model';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;
import { map, first } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private eventCollection: AngularFirestoreCollection<EventModel>;
    private eventDoc: AngularFirestoreDocument<EventModel>;

    constructor(private db: AngularFirestore) {
        this.eventCollection = this.db.collection<EventModel>('events', ref => ref.orderBy('date', 'asc'));
    }

    getEvents(): Observable<EventModel[]> {
        return this.eventCollection.snapshotChanges()
            .pipe(
                map( actions => actions.map(action => {
                    const data = action.payload.doc.data() as EventModel;
                    const id = action.payload.doc.id;
                    Object.keys(data).filter(key => data[key] instanceof Timestamp)
                        .forEach(key => data[key] = data[key].toDate());

                    return { id, ...data };
                }),
                first()
            )
        );
    }
}
