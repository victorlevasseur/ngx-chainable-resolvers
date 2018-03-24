import { Injector, Type } from '@angular/core';
import { ChainableResolver } from '../chainable-resolver';
import { BoundChainableResolverMetadata } from './bound-chainable-resolver-metadata';
import { UnboundChainableResolver } from '../private/unbound-chainable-resolver';

export class UnboundChainableResolverMetadata<InputsObject, OutputType> {

  get parent(): BoundChainableResolverMetadata<any, any, any, InputsObject>|null {
    return this.parentMetadata;
  }

  constructor(
    private parentMetadata: BoundChainableResolverMetadata<any, any, any, InputsObject>|null,
    public type: Type<ChainableResolver<Partial<InputsObject>, OutputType>>) {

  }

  bind<ToReturnName extends string>(
    toReturnName: ToReturnName):
      BoundChainableResolverMetadata<InputsObject, OutputType, ToReturnName, InputsObject & { [P in ToReturnName]: OutputType }> {
    return new BoundChainableResolverMetadata<
      InputsObject,
      OutputType,
      ToReturnName,
      InputsObject & { [P in ToReturnName]: OutputType }>(
        this, this.type, toReturnName);
  }

  generateResolver(injector: Injector): UnboundChainableResolver<InputsObject, OutputType> {
    return new UnboundChainableResolver(
      this.parent ? this.parent.generateResolver(injector) : null,
      injector.get(this.type));
  }

}
