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

  bind<ToPropertyName extends string>(
    toPropertyName: ToPropertyName):
      BoundChainableResolverMetadata<InputsObject, OutputType, ToPropertyName, InputsObject & { [P in ToPropertyName]: OutputType }> {
    return new BoundChainableResolverMetadata<
      InputsObject,
      OutputType,
      ToPropertyName,
      InputsObject & { [P in ToPropertyName]: OutputType }>(
        this, this.type, toPropertyName);
  }

  generateResolver(injector: Injector): UnboundChainableResolver<InputsObject, OutputType> {
    return new UnboundChainableResolver(
      this.parent ? this.parent.generateResolver(injector) : null,
      injector.get(this.type));
  }

}
