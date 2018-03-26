import { ChainBoundRootBuilder } from './builders/chain-bound-root-builder';

export class ChainBuilder {

  static create(): ChainBoundRootBuilder {
    return new ChainBoundRootBuilder();
  }

}
