import { ChainBoundRootBuilder } from './metadata/chain-bound-root-builder';

export class ChainableResolverFactory {

  static createChain(): ChainBoundRootBuilder {
    return new ChainBoundRootBuilder();
  }

}
