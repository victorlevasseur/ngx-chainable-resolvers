import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators';
import { ChainableResolver } from '../chainable-resolver';
import { FullChainResolver } from './full-chain-resolver';
import { ArgumentsMapper } from './arguments-mapper';
import { ChainBoundResolverInterface } from './chain-bound-resolver-interface';

export class ChainBoundResolver<
  AllInputsObject,
  ResolverArguments,
  ReturnType,
  ReturnName extends string,
  AllOutputsObject> implements ChainBoundResolverInterface<AllOutputsObject> {

  constructor(
    private chainableResolver: ChainableResolver<ResolverArguments, ReturnType>,
    private parent: ChainBoundResolverInterface<AllInputsObject>,
    private propertyName: ReturnName,
    private argumentsMapper: ArgumentsMapper<AllInputsObject, ResolverArguments>) {

  }

  build(): FullChainResolver<AllOutputsObject> {
    return new FullChainResolver(this);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<AllOutputsObject> {
    return this.parent.resolve(route, state)
      .pipe(
        switchMap((inputs) => {
          // Pass the new outputs to the chainable resolver.
          return this.chainableResolver.resolve(route, state, this.map(inputs))
            .pipe(
              map((output) => ({
                inputs: inputs,
                output: output
              }))
            );
        }),
        map((result) => Object.assign(
          {}, result.inputs, <any>{ [this.propertyName]: result.output }
        ))
      );
  }

  private map(inputs: AllInputsObject): ResolverArguments {
    let result: Partial<ResolverArguments> = {};
    Object.keys(this.argumentsMapper)
      .forEach((mappedKey) => {
        const inputsKey = this.argumentsMapper[<any>mappedKey];
        result = Object.assign({}, result, { [mappedKey]: inputs[inputsKey] });
      });
    return <any>result;
  }

}
