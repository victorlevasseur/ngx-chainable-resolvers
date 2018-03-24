import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export interface ChainBoundResolverInterface<AllOutputsObject> extends Resolve<AllOutputsObject> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<AllOutputsObject>;
}
