# NgxChainableResolvers

This package aims to provide an elegant way to chain multiple resolvers together. 
It allows complex chaining of resolvers that depends on each others through a builder
interface which is fully type safe using the Typescript advanced type checking capabilities.

## Features

 * Sequentially chain resolvers
 * Fully type checked, all errors are reported during compilation
 * Resolvers arguments and return mapping (resolvers don't have to be developed for each others)
 * AOT support
 
**WIP features:**

 * Allow to compose resolvers in parallel
 
## Demo & Doc

In the package sources (on Github), you can find a demo package that contains some samples of
the package.

Let's say that we have three resolvers: 

 * one that resolves to a random number
 * another one that repeats a given number a given amount of times
 * another one that returns the opposite of a given number

Each resolvers that are chainable must implements ```ChainableResolver```:

```typescript
export class RandomNumberResolver implements ChainableResolver<{}, number> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, inputs: {}): Observable<number> {
    return Observable.of(Math.round(Math.random() * 9))
      .pipe(
        delay(400)
      );
  }
}
```

```typescript
export class NumberRepeaterResolver implements ChainableResolver<{ number: number, repeat: number }, string> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, inputs: { number: number, repeat: number }): Observable<string> {
    return Observable.of(`${inputs.number}`.repeat(inputs.repeat))
      .pipe(
        delay(300)
      );
  }
}
```

```typescript
export class NumberOpposerResolver implements ChainableResolver<{ numberToOppose: number }, number> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, inputs: { numberToOppose: number }): Observable<number> {
    return Observable.of(-inputs.numberToOppose)
      .pipe(
        delay(500)
      );
  }
}
```

To declare a chain of resolvers, create the chain in the providers of the module:

```typescript
export const chainInjectionToken = new InjectionToken('chainInjectionToken');

// ...

{
  provide: chainInjectionToken,
  useFactory: ChainBuilder
    .create()
    .followedBy(RandomNumberResolver, { }, 'random')
    .followedBy(RandomNumberResolver, { }, 'random2')
    .followedBy(NumberRepeaterResolver, { number: 'random', repeat: 'random2' }, 'repeatedNumber')
    .followedBy(NumberOpposerResolver, { numberToOppose: 'random' }, 'opposed')
    .build(),
  deps: [Injector] // This is IMPORTANT as build() returns a function that needs Injector.
}

// --> Then, use chainInjectionToken in the resolve section of the route.
// Note: don't forget to provide the resolvers used in the chain too.

```

As you can see in the example, the resolvers can have a bunch of arguments contained in an object (the third parameter of the
resolve method). The type of this inputs object is declared in the first generic parameter of the implemented 
```ChainableResolver```. The second generic parameter of ```ChainableResolver``` is
the resolver return type (like the first generic parameter of the Angular ```Resolve```).

To create a chain of resolvers, use the ```ChainBuilder.create()``` static method
and then declare each resolvers with their inputs object mapper and their return value mapper with
the ```followedBy``` method.

The input mapper (the second parameter of the ```followedBy``` method) is used to map the set of the
returns values of the previous resolvers to the inputs object of the current resolver. The return value
mapper is just a string declaring the property name to use to store the result of the current resolver.

In the previous example, the chain begins with two ```RandomNumberResolver``` that maps their return values respectively to
```random``` and ```random2``` (they don't need any input so their inputs object mapper is empty). The next
resolver in the chain (```NumberRepeaterResolver```) needs two parameters in its inputs object: ```number``` and
```repeat``` (it implements ```ChainableResolver<{ number: number, repeat: number }, string>```). As we want
to use the resolver with the two random values generated by the previous resolvers, we map ```random``` to ```number```
(the return value of the first resolver) and ```random2``` to ```repeat``` (the return value of the second resolver).
The return value of the ```NumberRepeaterResolver``` will be mapped to ```repeatedNumber```. Finally, the
```NumberOpposerResolver``` is launched with ```random``` mapped to ```numberToOppose```.

A component that uses this chain of resolvers will receive the following data if the two ```RandomNumberResolver```
resolves to ```8``` and ```3```:

```
{ random: 8, random2: 3, repeatedNumber: "888", opposed: -8 }
```
