import { Observable } from './observable';

/**
 * Type alias describing the correct structure of an Operator Function
 * 
 * Operator Functions are 'pipeable' (chainable) behavioural augmenters for Observables, and work by taking the source Observable and
 *   returning a new Observable who's producer function subscribes to it, implementing some custom functionality therein
 * 
 * In this way an Operator can augment the behaviour of an Observable significantly, and multile Operators can be piped together in order
 *   to produce complex one-time unique non-mutating behaviours for the original Observable
 * 
 * An example of how an Operator can be useful is in running every streamed value from a particular Observable through a consistent
 *   transformation function. The original values are preserved, but the next Observer in the chain receives the transformed value
 * 
 * For concrete examples, see ../index.ts
 */
type OperatorFn = <T>(source$: Observable<T>) => Observable<T>;

/**
 * Type alias describing the correct structure of an 'Operator Factory'; a function which produces an in-place custom Operator
 * 
 * Operators like the one described in the example above (a 'mapping Operator') should be customisable in place - in this case, the
 *   transformation function to run emissions through should not be fixed and instead configurable on a case-by-case basis.
 * 
 * Operator Factories provide this utility by taking a configurable 'something' or set of 'somethings' and returning an OperatorFn which
 *   uses it in some way to action its behavior
 */
type OperatorFnFactory = (...args: any) => OperatorFn;

export {
    OperatorFn,
    OperatorFnFactory
};