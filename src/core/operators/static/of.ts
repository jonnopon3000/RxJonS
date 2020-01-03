import { Observable } from "../../observable";
import { IObserver } from "../../observer";

/**
 * The static operator 'of', producing a new Observable which will emit a given set of values immediately and in order
 * 
 * @param values an arbitrary number of values to emit in order
 */
const of = <T>(...values: Array<T>) => {
    return new Observable<T>((observer: IObserver<T>) => {
        values.forEach((val) => observer.next(val));
        observer.complete();
    });
};

export { of };