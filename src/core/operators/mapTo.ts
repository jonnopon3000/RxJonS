import { Observable } from "../observable";
import { OperatorFnFactory, OperatorFn } from "../operatorFn";
import { IObserver } from "../observer";

/**
 * The 'mapTo' pipeable Operator Factory; creates an Operator which maps every emission from the source Observable to a given set value, discarding the original values
 * 
 * @param v the value to map source emissions to
 * 
 * @returns an OperatorFn which maps all next() emissions from the source Observable to a set value
 */
const mapTo: OperatorFnFactory = (v: any): OperatorFn => {
    return <T>(source$: Observable<T>): Observable<T> => {
        return new Observable((observer: IObserver<T>) => {
            source$.subscribe({
                next: () => {
                    observer.next(v);
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

export { mapTo };