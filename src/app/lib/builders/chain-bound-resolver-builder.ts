import { Injector, Type } from '@angular/core';
import { ChainableResolver } from '../chainable-resolver';
import { ChainBoundResolver } from '../private/chain-bound-resolver';
import { ArgumentsMapper } from '../private/arguments-mapper';
import { ChainBoundResolverBuilderInterface } from '../private/chain-bound-resolver-builder-interface';
import { FullChainFactoryBuilderInterface } from './full-chain-factory-builder-interface';
import { FullChainResolver } from '../private/full-chain-resolver';

export class ChainBoundResolverBuilder<
  AllInputsObject,
  ResolverArguments,
  ReturnType,
  ReturnName extends string,
  AllOutputsObject extends AllInputsObject & { [P in ReturnName]: ReturnType }>
  implements
    ChainBoundResolverBuilderInterface<AllOutputsObject>,
    FullChainFactoryBuilderInterface<AllOutputsObject> {

  get parent(): ChainBoundResolverBuilderInterface<AllInputsObject> {
    return this.parentMetadata;
  }

  constructor(
    private parentMetadata: ChainBoundResolverBuilderInterface<AllInputsObject>,
    private type: Type<ChainableResolver<ResolverArguments, ReturnType>>,
    private propertyName: ReturnName,
    private argumentsMapper: ArgumentsMapper<AllInputsObject, ResolverArguments>) {

  }

  build(): (injector: Injector) => FullChainResolver<AllOutputsObject> {
    return (injector => {
      return new FullChainResolver(this.generateResolver(injector));
    });
  }

  followedBy<NextResolverArguments, NextOutputType, NextReturnName extends string>(
    nextResolver: Type<ChainableResolver<NextResolverArguments, NextOutputType>>,
    nextArgumentsMapper: ArgumentsMapper<AllOutputsObject, NextResolverArguments>,
    nextReturnName: NextReturnName):
      ChainBoundResolverBuilder<
        AllInputsObject & { [P in ReturnName]: ReturnType },
        NextResolverArguments,
        NextOutputType,
        NextReturnName,
        AllInputsObject & { [P in ReturnName]: ReturnType } & { [P in NextReturnName]: NextOutputType }> {
    return new ChainBoundResolverBuilder(this, nextResolver, nextReturnName, nextArgumentsMapper);
  }

  generateResolver(injector: Injector): ChainBoundResolver<AllInputsObject, ResolverArguments, ReturnType, ReturnName, AllOutputsObject> {
    return new ChainBoundResolver(
      injector.get(this.type),
      this.parent.generateResolver(injector),
      this.propertyName,
      this.argumentsMapper);
  }

}
