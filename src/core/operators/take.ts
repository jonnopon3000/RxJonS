import { OperatorFnFactory, OperatorFn } from "../operatorFn";
import { Observable } from "../observable";
import { IObserver } from "../observer";

/**
 * The 'take' pipeable Operator Factory; creates an Operator which monitors emissions from the source Observable and unsubscribes when a given number have occurred
 * 
 * @param quantity the number of emissions to pass to the Observer before unsubscribing from the source
 * 
 * @returns an OperatorFn which unsubscribes from the source after a set number of emissions
 */
const take: OperatorFnFactory = (quantity: number): OperatorFn => {
    return <T>(source$: Observable<T>): Observable<T> => {
        return new Observable((observer: IObserver<T>) => {
            let count = 0;

            // keep a reference to the subscription itself so we can unsubscribe later
            const subscription = source$.subscribe({
                next: (next: T) => {
                    observer.next(next);

                    // count the emissions and unsubscribe when the desired number have occurred
                    count++;
                    if (quantity === count) {
                        observer.complete();
                        subscription.unsubscribe();
                    }
                },
                error: (err: any) => {
                    observer.error(err);
                },
                complete: () => {
                    observer.complete();
                }
            });
        });
    };
};

export { take };