import { Injector, Type } from '@angular/core';
import { ChainableResolver } from '../chainable-resolver';
import { UnboundChainableResolverMetadata } from './unbound-chainable-resolver-metadata';
import { BoundChainableResolver } from '../private/bound-chainable-resolver';

export class BoundChainableResolverMetadata<
  InputsObject,
  OutputType,
  PropertyName extends string,
  AllOutputsObject extends InputsObject & { [P in PropertyName]: OutputType }> {

  get parent(): UnboundChainableResolverMetadata<InputsObject, OutputType> {
    return this.parentMetadata;
  }

  constructor(
    private parentMetadata: UnboundChainableResolverMetadata<InputsObject, OutputType>,
    private type: Type<ChainableResolver<InputsObject, OutputType>>,
    private propertyName: PropertyName) {

  }

  followedBy<NextOutputType>(
    nextResolver: Type<ChainableResolver<Partial<InputsObject & { [P in PropertyName]: OutputType }>, NextOutputType>>):
      UnboundChainableResolverMetadata<InputsObject & { [P in PropertyName]: OutputType }, NextOutputType> {
    return new UnboundChainableResolverMetadata<
      InputsObject & { [P in PropertyName]: OutputType },
      NextOutputType>(
        this, nextResolver);
  }

  generateResolver(injector: Injector): BoundChainableResolver<InputsObject, OutputType, PropertyName, AllOutputsObject> {
    return new BoundChainableResolver(this.parent.generateResolver(injector), this.propertyName);
  }

}
