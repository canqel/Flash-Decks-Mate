import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

// TODO: State is muttable, look for better solution
// http://disq.us/p/1siyb7h
// https://github.com/w11k/Tydux
export class Store<T> {
    state$: Observable<T>;
    private _state$: BehaviorSubject<T>;

    protected constructor (initialState: T) {
        this._state$ = new BehaviorSubject(initialState);
        this.state$ = this._state$.asObservable();
    }

    get state (): T {
        return this._state$.getValue();
    }

    setState (nextState: T): void {
        this._state$.next(nextState);
    }
}