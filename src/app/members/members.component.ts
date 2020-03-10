import { Component, OnInit } from '@angular/core';
import { MemberService } from './services/member.service';
import { Observable } from 'rxjs';
import { Member } from './services/member.model';
import { filter, map } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MemberDetailComponent } from './member-detail/member-detail.component';

@Component({
    selector: 'app-member',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
    member$: Observable<Member[]>;
    sister$: Observable<Member[]>;
    brother$: Observable<Member[]>;

    constructor(private memberService: MemberService,
                private bottomSheet: MatBottomSheet) { }

    ngOnInit() {
        this.member$ = this.memberService.getMembers();

        this.sister$ = this.member$.pipe(
            map(members => members.filter(member => member.gender === 'female'))
        );

        this.brother$ = this.member$.pipe(
            map(members => members.filter(member => member.gender === 'male'))
        );
    }

    trackByFn(index: number, member: Member) {
        return index;
    }

    openBottomSheet(member: Member) {
        MemberDetailComponent.memberID = member.id;
        this.bottomSheet.open(MemberDetailComponent);
    }
}
