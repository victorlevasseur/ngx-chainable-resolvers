import { ChainableResolver } from '../chainable-resolver';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Injector, Type } from '@angular/core';
import { StaticInjector } from '@angular/core/src/di/injector';
import { ChainableResolverFactory } from '../chainable-resolver-factory';

class NumberGeneratorResolver implements ChainableResolver<{}, number> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, inputs: {}): Observable<number> {
    return Observable.of(37);
  }
}

class DoubleNumberResolver implements ChainableResolver<{ value: number }, number> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, inputs: { value: number }): Observable<number> {
    return Observable.of(inputs.value * 2);
  }
}

function generateInjector(...classes: Type<any>[]): Injector {
  return Injector.create({
    providers: classes.map((klass) => {
      return {
        provide: klass,
        useClass: klass,
        deps: []
      };
    })
  });
}

describe('FullChainResolver', () => {

  it('should resolve a chain with a two simple resolvers', () => {
    const injector = generateInjector(NumberGeneratorResolver, DoubleNumberResolver);
    const chainResolver = ChainableResolverFactory.createChain()
      .followedBy(NumberGeneratorResolver, { }, 'amount')
      .followedBy(DoubleNumberResolver, { value: 'amount' }, 'doubledAmount')
      .build()(injector);

    let result: any;
    chainResolver.resolve(<any>{}, <any>{})
      .subscribe((r) => {
        result = r;
      });

    expect(result).toEqual({
      amount: 37,
      doubledAmount: 74
    });
  });

});
