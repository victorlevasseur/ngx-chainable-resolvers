import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { delay } from 'rxjs/operators';
import { ChainableResolver } from '../../lib/chainable-resolver';

export class NumberOpposerResolver implements ChainableResolver<{ numberToOppose: number }, number> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, inputs: { numberToOppose: number }): Observable<number> {
    return Observable.of(-inputs.numberToOppose)
      .pipe(
        delay(500)
      );
  }

}
