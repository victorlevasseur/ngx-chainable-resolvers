import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators';
import { ChainableResolver } from '../chainable-resolver';
import {UnboundChainableResolver} from './unbound-chainable-resolver';
import { ChainResolver } from '../chain-resolver';
import { ArgumentsMapper } from './arguments-mapper';

export class BoundChainableResolver<InputsObject, ArgumentsMapperOutputs, OutputType, PropertyName extends string, AllOutputsObject> {

  constructor(
    private chainableResolver: ChainableResolver<ArgumentsMapperOutputs, OutputType>,
    private unboundChainableResolver: UnboundChainableResolver<InputsObject, ArgumentsMapperOutputs, OutputType>,
    private propertyName: PropertyName,
    private argumentsMapper: ArgumentsMapper<InputsObject, ArgumentsMapperOutputs>) { // TODO Mapper

  }

  followedBy<NextResolverArguments, NextOutputType>(
    nextResolver: ChainableResolver<NextResolverArguments, NextOutputType>):
      UnboundChainableResolver<AllOutputsObject, NextResolverArguments, NextOutputType> {
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

  private map(inputs: InputsObject): ArgumentsMapperOutputs {
    let result: Partial<ArgumentsMapperOutputs> = {};
    Object.keys(this.argumentsMapper)
      .forEach((mappedKey) => {
        const inputsKey = this.argumentsMapper[<any>mappedKey];
        result = Object.assign({}, result, { [mappedKey]: inputs[inputsKey] });
      });
    return <any>result;
  }

}
