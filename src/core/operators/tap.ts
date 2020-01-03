import { Observable } from "../observable";
import { OperatorFnFactory, OperatorFn } from "../operatorFn";
import { IObserver } from "../observer";

/**
 * The 'tap' pipeable Operator Factory; produces an Operator which executes given side-effect functions before passing on the emission of each event from the source Observable
 * 
 * @param nextFn the side-effect for the source's next()
 * @param errorFn the side-effect for the source's error()
 * @param completeFn the side-effect for the source's complete()
 * 
 * @returns an Operator which actions given side-effects on any emission from the source Observable
 */
const tap: OperatorFnFactory = <T>(nextFn: (n: T | any) => void, errorFn?: (err: any) => void, completeFn?: () => void): OperatorFn => {
    return <T>(source$: Observable<T>): Observable<T> => {
        return new Observable((observer: IObserver<T>) => {
            source$.subscribe({
                next: (next: T) => {
                    // execute the side effect then pass the emission to the Observer
                    nextFn(next);
                    observer.next(next);
                },
                error: (err: any) => {
                    // execute the side effect if it was provided then pass the emission to the Observer
                    errorFn?.(err);
                    observer.error(err);
                },
                complete: () => {
                    // execute the side effect if it was provided then pass the emission to the Observer
                    completeFn?.();
                    observer.complete();
                }
            });
        });
    };
};

export { tap };