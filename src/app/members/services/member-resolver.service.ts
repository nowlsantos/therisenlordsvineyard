import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Member } from './member.model';
import { Observable, of } from 'rxjs';
import { MemberService } from './member.service';
import { first, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MemberResolverService implements Resolve<Member[]> {

    constructor(private memberService: MemberService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Member[]> {
        const gender = route.queryParamMap.get('gender');

        return this.memberService.filterBy(`${gender}`).pipe(
            first(),
            catchError( error => {
                console.log('Retrieval Error: ', `${error}`);
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
