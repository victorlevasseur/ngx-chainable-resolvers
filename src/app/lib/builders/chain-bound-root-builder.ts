import { Injector, Type } from '@angular/core';
import { ChainBoundResolverBuilderInterface } from './chain-bound-resolver-builder-interface';
import { ChainBoundResolverInterface } from '../private/chain-bound-resolver-interface';
import { ChainBoundRoot } from '../private/chain-bound-root';
import { ArgumentsMapper } from '../private/arguments-mapper';
import { ChainBoundResolverBuilder } from './chain-bound-resolver-builder';
import { ChainableResolver } from '../chainable-resolver';

export class ChainBoundRootBuilder implements ChainBoundResolverBuilderInterface<{}> {

  followedBy<NextResolverArguments, NextOutputType, NextReturnName extends string>(
    nextResolver: Type<ChainableResolver<NextResolverArguments, NextOutputType>>,
    nextArgumentsMapper: ArgumentsMapper<{}, NextResolverArguments>,
    nextReturnName: NextReturnName):
    ChainBoundResolverBuilder<
      { },
      NextResolverArguments,
      NextOutputType,
      NextReturnName,
      { [P in NextReturnName]: NextOutputType }> {
    return new ChainBoundResolverBuilder(this, nextResolver, nextReturnName, nextArgumentsMapper);
  }

  generateResolver(injector: Injector): ChainBoundResolverInterface<{}> {
    return new ChainBoundRoot();
  }

}
