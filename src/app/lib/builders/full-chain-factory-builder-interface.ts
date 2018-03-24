import { Injector } from '../../../../.ng_pkg_build/ngx-chainable-resolvers/out/node_modules/@angular/core/src/di/injector';
import { FullChainResolver } from '../private/full-chain-resolver';

export interface FullChainFactoryBuilderInterface<OutputsType> {

  build(): (injector: Injector) => FullChainResolver<OutputsType>;

}
