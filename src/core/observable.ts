import { Observer, IObserver } from "./observer";
import { ISubscription } from "./subscription";
import { OperatorFn } from './operatorFn';

/**
 * Main Observable class, implementing the functionality of an Observable
 * 
 * Includes subscription and Operator piping routines
 */
class Observable<T> {

    /**
     * Constructor
     * 
     * @param producer the 'behaviour' part of the Observable, which emits values, errors and completion events to a given Observer when the Observable is subscribed to. Can return a function serving as the Observer's unsubscribe callback
     */
    constructor(private producer: (observer: Observer<T>) => void | (() => void)) { }

    /**
     * Subscription method. Create a new Observer wrapping the given IObserver, execute the producer and return a wrapper around the Observer's unsubscribe() method
     * 
     * @param observer the IObserver that is to be subscribed, implementing the three core Observable event callbacks listening for events from the producer
     * 
     * @returns an ISubscription wrapping the constructed Observer's unsubscribe() method
     */
    public subscribe(observer: IObserver<T>): ISubscription {
        const obs = new Observer(observer);

        obs._unsubscribe = this.producer(obs) || null;

        return {
            unsubscribe() {
                obs.unsubscribe()
            }
        };
    }

    /**
     * Pipe method. Takes an arbitrary number of OperatorFns and deeply chains them with this Observable
     * 
     * @param operators any amount of OperatorFns
     * 
     * @returns a composed Observable, chaining all of the Operators with the original functionality of this Observable
     */
    public pipe(...operators: OperatorFn[]): Observable<T> {
        // if no operators, just return the original Observable
        if (operators.length === 0) {
            return this;
        }

        // else, compose the new Observable and return it
        const composedOperatorFn = this.pipeFromArray(operators);

        return composedOperatorFn(this);
    }

    /**
     * Composure method for creating a new Observable from the result of executing all given OperatorFns in order
     * 
     * @param operators the list of OperatorFns to compose
     * 
     * @returns the composed OperatorFn
     */
    private pipeFromArray(operators: OperatorFn[]): OperatorFn {
        // if we only have one OperatorFn, just return it
        if (operators.length === 1) {
            return operators[0];
        }

        // else, return a new OperatorFn which uses Array.prototype.reduce() to compose the Operators' Observables into one chained Observable
        // see the full explanation on OperatorFns to understand why this works
        return function composed(input$: Observable<any>): Observable<any> {
            return operators.reduce((composed: Observable<any>, operator: any): Observable<any> => operator(composed), input$);
        }
    }
}

export { Observable };