import { OperatorFnFactory, OperatorFn } from "../operatorFn";
import { Observable } from "../observable";
import { IObserver } from "../observer";

/**
 * The 'delay' pipeable Operator Factory; creates an Operator which delays the subscription of the source Observable by a given number of milliseconds
 * 
 * @param delay the time to delay the subscription by
 * 
 * @returns an OperatorFn which delays the subscription of the source Observable
 */
const delay: OperatorFnFactory = (delay: number): OperatorFn => {
    return <T>(source$: Observable<T>): Observable<T> => {
        return new Observable((observer: IObserver<T>) => {
            setTimeout(() => {
                source$.subscribe(observer);
            }, delay);
        });
    };
};

export { delay };