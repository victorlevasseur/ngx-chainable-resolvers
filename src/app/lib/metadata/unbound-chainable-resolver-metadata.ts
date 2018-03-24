import { Injector, Type } from '@angular/core';
import { ChainableResolver } from '../chainable-resolver';
import { BoundChainableResolverMetadata } from './bound-chainable-resolver-metadata';
import { UnboundChainableResolver } from '../private/unbound-chainable-resolver';
import { ArgumentsMapper } from '../private/arguments-mapper';

export class UnboundChainableResolverMetadata<InputsObject, ResolverArguments, OutputType> {

  get parent(): BoundChainableResolverMetadata<any, ResolverArguments, any, any, InputsObject>|null {
    return this.parentMetadata;
  }

  constructor(
    private parentMetadata: BoundChainableResolverMetadata<any, any, any, any, InputsObject>|null,
    public type: Type<ChainableResolver<ResolverArguments, OutputType>>) {

  }

  bind<ToReturnName extends string>(
    argumentsMapper: ArgumentsMapper<InputsObject, ResolverArguments>,
    toReturnName: ToReturnName):
      BoundChainableResolverMetadata<InputsObject, ResolverArguments, OutputType, ToReturnName, InputsObject & { [P in ToReturnName]: OutputType }> {
    return new BoundChainableResolverMetadata<
      InputsObject,
      ResolverArguments,
      OutputType,
      ToReturnName,
      InputsObject & { [P in ToReturnName]: OutputType }>(
        this, this.type, toReturnName, argumentsMapper);
  }

  generateResolver(injector: Injector): UnboundChainableResolver<InputsObject, ResolverArguments, OutputType> {
    return new UnboundChainableResolver(
      this.parent ? this.parent.generateResolver(injector) : null,
      injector.get(this.type));
  }

}
