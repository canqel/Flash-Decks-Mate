import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

export class Store<T> {
  state$: Observable<T>;
  private _state$: BehaviorSubject<T>;

  protected constructor(initialState: T) {
    this._state$ = new BehaviorSubject(initialState);
    this.state$ = this._state$.asObservable();
  }

  get state(): T {
    return this._state$.getValue();
  }

  setState(nextState: T): void {
    this._state$.next(nextState);
  }

  patchState(data: Partial<T>): void {
    const newState = this.simplePatch(this.state, data);
    this.setState(newState);
  }

  private simplePatch(existingState: Readonly<T>, data: Partial<T>): T {
    const isArray = Array.isArray(data);
    const isPrimitive = typeof data !== 'object';
    if (isArray) throw new Error('Patching arrays is not supported.');
    if (isPrimitive) throw new Error('Patching primitives is not supported.');

    const newState = { ...(<any>existingState) };

    // tslint:disable-next-line:forin
    for (const loopKey in data) {
      newState[loopKey] = data[loopKey];
    }

    return <T>newState;
  }
}
