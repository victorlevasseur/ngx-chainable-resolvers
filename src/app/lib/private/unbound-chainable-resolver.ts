import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import { ChainableResolver } from '../chainable-resolver';
import { BoundChainableResolver } from './bound-chainable-resolver';
import { ArgumentsMapper } from './arguments-mapper';

export class UnboundChainableResolver<InputsObject, ResolverArguments, OutputType> {

  constructor(
    private parentResolver: BoundChainableResolver<any, any, any, any, InputsObject>|null,
    public chainableResolver: ChainableResolver<ResolverArguments, OutputType>) {

  }

  /**
   * Binds a resolver's inputs arguments and output return to specific property names.
   * TODO: Mapper
   */
  bind<ToReturnName extends string>(
    argumentsMapper: ArgumentsMapper<InputsObject, ResolverArguments>,
    toReturnName: ToReturnName):
      BoundChainableResolver<InputsObject, ResolverArguments, OutputType, ToReturnName, InputsObject & { [P in ToReturnName]: OutputType }> {
    return new BoundChainableResolver(this.chainableResolver, this, toReturnName, argumentsMapper);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<InputsObject> {
    return (this.parentResolver ? this.parentResolver.resolve(route, state) : Observable.of(<any>{}));
  }

}
