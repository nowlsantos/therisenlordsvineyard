import { Component, OnInit } from '@angular/core';
import { MemberService } from './services/member.service';
import { Observable } from 'rxjs';
import { Member } from './services/member.model';

@Component({
    selector: 'app-member',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
    member$: Observable<Member[]>;
    sister$: Observable<Member[]>;
    brother$: Observable<Member[]>;

    constructor(private memberService: MemberService) { }

    ngOnInit() {
        this.member$ = this.memberService.getMembers();
        this.sister$ = this.memberService.filterBy('female');
        this.brother$ = this.memberService.filterBy('male');
    }

    trackByFn(index: number, member: Member) {
        return index;
    }
}
