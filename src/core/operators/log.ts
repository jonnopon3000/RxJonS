import { OperatorFn } from "../operatorFn";
import { Observable } from "../observable";
import { IObserver } from "../observer";

/**
 * The 'log' pipeable Operator; logs all event emissions from the source Observable and passes them unmodified to the next Observer
 * 
 * @param source the source Observable
 * 
 * @returns a new Observable which subscribes to and logs the events of the source Observable
 */
const log: OperatorFn = <T>(source$: Observable<T>): Observable<T> => {
    return new Observable((observer: IObserver<T>) => {
        source$.subscribe({
            next: (next: T) => {
                console.log('> logging next:', next);
                observer.next(next);
            },
            error: (err: any) => {
                console.log('> logging error:', err);
                observer.error(err);
            },
            complete: () => {
                console.log('> logging complete');
                observer.complete();
            }
        });
    });
};

export { log }