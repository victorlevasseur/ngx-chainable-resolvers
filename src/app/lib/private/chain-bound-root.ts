import { ChainBoundResolverInterface } from './chain-bound-resolver-interface';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class ChainBoundRoot implements ChainBoundResolverInterface<{}> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{}> {
    return Observable.of({});
  }

}
