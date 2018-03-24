import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { delay } from 'rxjs/operators';
import { ChainableResolver } from '../../lib/chainable-resolver';

export class NumberRepeaterResolver implements ChainableResolver<{ number: number }, string> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, inputs: { number: number }): Observable<string> {
    return Observable.of(`${inputs.number}`.repeat(2))
      .pipe(
        delay(300)
      );
  }

}
