import { Type } from '@angular/core';
import { ChainableResolver } from './chainable-resolver';
import { UnboundChainableResolverMetadata } from './metadata/unbound-chainable-resolver-metadata';

export class ChainableResolverFactory {

  static createChain<OutputType>(
    chainableResolver: Type<ChainableResolver<{}, OutputType>>):
      UnboundChainableResolverMetadata<{}, {}, OutputType> {
    return new UnboundChainableResolverMetadata(null, chainableResolver);
  }

}
