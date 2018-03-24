import { Injector } from '@angular/core';
import { FullChainResolver } from '../private/full-chain-resolver';

export interface FullChainFactoryBuilderInterface<OutputsType> {

  build(): (injector: Injector) => FullChainResolver<OutputsType>;

}
