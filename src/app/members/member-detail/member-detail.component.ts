import { Component, OnInit, OnDestroy } from '@angular/core';
import { MemberService } from '../services/member.service';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Member } from '../services/member.model';
import { SubSink } from 'subsink';

@Component({
    selector: 'app-member-detail',
    templateUrl: './member-detail.component.html',
    styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit, OnDestroy {
    static memberID: string;
    private subs = new SubSink();
    member: Member;

    constructor(private memberServce: MemberService,
                private bottomSheetRef: MatBottomSheetRef<MemberDetailComponent>) { }

    ngOnInit() {
        const id = MemberDetailComponent.memberID;
        this.getMember(id);
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    getMember(id: string) {
        this.subs.add(
            this.memberServce.getMember(id).subscribe( member => {
                this.member = member;
            })
        );
    }

    closeBottomSheet(event: MouseEvent) {
        this.bottomSheetRef.dismiss();
        event.preventDefault();
    }
}
