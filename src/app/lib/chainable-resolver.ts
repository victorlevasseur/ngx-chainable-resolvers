import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

/**
 * Implement this interface in your resolvers to support chaining.
 */
export interface ChainableResolver<ArgumentsObject, Output> {

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    inputs: ArgumentsObject): Observable<Output>;

}
