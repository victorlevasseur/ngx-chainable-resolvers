import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ChainBoundResolverInterface } from './private/chain-bound-resolver-interface';

export class ChainResolver<OutputsType> implements Resolve<OutputsType> {

  constructor(
    private leafChainableResolver: ChainBoundResolverInterface<OutputsType>) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OutputsType> {
    return this.leafChainableResolver.resolve(route, state);
  }

}
