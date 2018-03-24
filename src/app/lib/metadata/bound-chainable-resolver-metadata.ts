import { Injector, Type } from '@angular/core';
import { ChainableResolver } from '../chainable-resolver';
import { UnboundChainableResolverMetadata } from './unbound-chainable-resolver-metadata';
import { BoundChainableResolver } from '../private/bound-chainable-resolver';
import { ArgumentsMapper } from '../private/arguments-mapper';

export class BoundChainableResolverMetadata<
  InputsObject,
  ArgumentsMapperOutputs,
  OutputType,
  ReturnName extends string,
  AllOutputsObject extends InputsObject & { [P in ReturnName]: OutputType }> {

  get parent(): UnboundChainableResolverMetadata<InputsObject, ArgumentsMapperOutputs, OutputType> {
    return this.parentMetadata;
  }

  constructor(
    private parentMetadata: UnboundChainableResolverMetadata<InputsObject, ArgumentsMapperOutputs, OutputType>,
    private type: Type<ChainableResolver<ArgumentsMapperOutputs, OutputType>>,
    private propertyName: ReturnName,
    private argumentsMapper: ArgumentsMapper<InputsObject, ArgumentsMapperOutputs>) {

  }

  followedBy<NextResolverArguments, NextOutputType>(
    nextResolver: Type<ChainableResolver<NextResolverArguments, NextOutputType>>):
      UnboundChainableResolverMetadata<InputsObject & { [P in ReturnName]: OutputType }, NextResolverArguments, NextOutputType> {
    return new UnboundChainableResolverMetadata<
      InputsObject & { [P in ReturnName]: OutputType },
      NextResolverArguments,
      NextOutputType>(
        this, nextResolver);
  }

  generateResolver(injector: Injector): BoundChainableResolver<InputsObject, ArgumentsMapperOutputs, OutputType, ReturnName, AllOutputsObject> {
    const parentUnboundResolver = this.parent.generateResolver(injector);
    return new BoundChainableResolver(
      injector.get(this.type),
      parentUnboundResolver,
      this.propertyName,
      this.argumentsMapper);
  }

}
