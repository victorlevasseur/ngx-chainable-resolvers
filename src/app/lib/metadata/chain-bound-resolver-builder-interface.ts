import { Injector } from '@angular/core';
import { ChainBoundResolverInterface } from '../private/chain-bound-resolver-interface';

export interface ChainBoundResolverBuilderInterface<AllOutputsObject> {

  generateResolver(injector: Injector): ChainBoundResolverInterface<AllOutputsObject>;

}
