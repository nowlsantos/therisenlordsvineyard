import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Member } from './member.model';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MemberService {
    private memberCollection: AngularFirestoreCollection<Member>;
    private memberDoc: AngularFirestoreDocument<Member>;

    constructor(private db: AngularFirestore) {
        this.memberCollection = this.db.collection<Member>('members', ref => ref.orderBy('displayName', 'asc'));
    }

    getMembers(): Observable<Member[]> {
        return this.memberCollection.snapshotChanges()
            .pipe(
                map( actions => actions.map(action => {
                    const data = action.payload.doc.data() as Member;
                    const id = action.payload.doc.id;
                    return { id, ...data };
                }),
                first()
            )
        );
    }

    getMember(id: string): Observable<Member> {
        this.memberDoc = this.db.doc(`members/${id}`);
        return this.memberDoc.valueChanges().pipe(first());
    }

    filterBy(gender: string): Observable<Member[]> {
        this.memberCollection = this.db.collection<Member>('members', ref => ref.where('gender', '==', gender)
                                                                                .orderBy('displayName', 'asc'));
        return this.memberCollection.valueChanges({ idField: 'id' });
    }
}
