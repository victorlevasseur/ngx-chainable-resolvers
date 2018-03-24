import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BoundChainableResolver } from './private/bound-chainable-resolver';

export class ChainResolver<OutputsType> implements Resolve<OutputsType> {

  constructor(
    private leafChainableResolver: BoundChainableResolver<any, any, any, any, OutputsType>) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OutputsType> {
    return this.leafChainableResolver.resolve(route, state);
  }

}
