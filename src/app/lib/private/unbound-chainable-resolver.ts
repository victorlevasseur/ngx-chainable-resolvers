import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import { ChainableResolver } from '../chainable-resolver';
import { BoundChainableResolver } from './bound-chainable-resolver';

export class UnboundChainableResolver<InputsObject, OutputType> {

  constructor(
    private parentResolver: BoundChainableResolver<any, any, any, InputsObject>|null,
    private chainableResolver: ChainableResolver<Partial<InputsObject>, OutputType>) {

  }

  /**
   * Binds a resolver's output to
   */
  bind<ToPropertyName extends string>(
    toPropertyName: ToPropertyName):
      BoundChainableResolver<InputsObject, OutputType, ToPropertyName, InputsObject & { [P in ToPropertyName]: OutputType }> {
    return new BoundChainableResolver(this, toPropertyName);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<{ inputs: InputsObject, output: OutputType}> {
    return (this.parentResolver ? this.parentResolver.resolve(route, state) : Observable.of(<any>{}))
      .pipe(
        switchMap((inputs) => {
          // Pass the new outputs to the chainable resolver.
          return this.chainableResolver.resolve(route, state, inputs)
            .pipe(
              map((output) => ({
                inputs: inputs,
                output: output
              }))
            );
        })
      );
  }

}
