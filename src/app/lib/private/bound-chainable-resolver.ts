import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators'
import { ChainableResolver } from '../chainable-resolver';
import {UnboundChainableResolver} from './unbound-chainable-resolver';
import { ChainResolver } from '../chain-resolver';

export class BoundChainableResolver<InputsObject, OutputType, PropertyName extends string, AllOutputsObject> {

  constructor(
    private unboundChainableResolver: UnboundChainableResolver<InputsObject, OutputType>,
    private propertyName: PropertyName) {

  }

  followedBy<NextOutputType>(
    nextResolver: ChainableResolver<Partial<AllOutputsObject>, NextOutputType>):
      UnboundChainableResolver<AllOutputsObject, NextOutputType> {
    return new UnboundChainableResolver(this, nextResolver);
  }

  build(): ChainResolver<AllOutputsObject> {
    return new ChainResolver(this);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<AllOutputsObject> {
    return this.unboundChainableResolver.resolve(route, state)
      .pipe(
        map((result) => Object.assign(
          {}, result.inputs, <any>{ [this.propertyName]: result.output }
        ))
      );
  }

}
