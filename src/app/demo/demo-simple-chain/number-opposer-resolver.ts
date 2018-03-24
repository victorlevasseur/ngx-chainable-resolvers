import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { delay } from 'rxjs/operators';
import { ChainableResolver } from '../../lib/chainable-resolver';

export class NumberOpposerResolver implements ChainableResolver<{ random: number }, number> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, inputs: { random: number }): Observable<number> {
    return Observable.of(-inputs.random)
      .pipe(
        delay(500)
      );
  }

}
