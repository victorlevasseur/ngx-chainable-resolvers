import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { delay } from 'rxjs/operators';
import { ChainableResolver } from '../../lib/chainable-resolver';

export class RandomNumberResolver implements ChainableResolver<{}, number> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, inputs: {}): Observable<number> {
    return Observable.of(Math.round(Math.random() * 9))
      .pipe(
        delay(400)
      );
  }

}
