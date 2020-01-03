import { OperatorFnFactory, OperatorFn } from "../operatorFn";
import { Observable } from "../observable";
import { IObserver } from "../observer";

/**
 * The 'map' pipeable Operator Factory; creates an Operator which passes every emission from the source Observable through a given projection function
 * 
 * @param project the projection function to transform source emissions
 * 
 * @returns an OperatorFn which passes all next() emissions from the source Observable through the projection functiom
 */
const map: OperatorFnFactory = (project: (val: any) => any): OperatorFn => {
    return <T>(source$: Observable<T>): Observable<T> => {
        return new Observable((observer: IObserver<T>) => {
            source$.subscribe({
                next: (next: T) => {
                    observer.next(project(next));
                },
                error: (err: any) => {
                    observer.error(err);
                },
                complete: () => {
                    observer.complete();
                }
            })
        });
    };
};

export { map };