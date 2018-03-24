/**
 * Represents an interface used to define a mapping between a chain a resolvers and
 * the input arguments of a chainable resolver.
 */
export type ArgumentsMapper<InputsObject, MappedParametersObject> = {
  [P in (keyof MappedParametersObject)]: keyof InputsObject;
}
