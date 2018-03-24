import { ChainBoundRootBuilder } from './builders/chain-bound-root-builder';

export class ChainableResolverFactory {

  static createChain(): ChainBoundRootBuilder {
    return new ChainBoundRootBuilder();
  }

}
