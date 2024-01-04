import { BehaviorSubject, Observable } from "rxjs";
// import { checkIfPropertyExists } from "../utilities/check-if-property-exists";
import { TypeWithKey } from "./type-with-key";
import { checkIfConditionMet } from "../utilities/check-if-condition-met";
import { map } from "rxjs/operators";

type State = TypeWithKey<any>;
export class ShaggyObject {
  private state: State;
  readonly observableSubject: BehaviorSubject<State>;
  constructor(state: State) {
    this.state = state;
    this.observableSubject = new BehaviorSubject(state);
  }
  getObservable(): Observable<State> {
    return this.observableSubject.asObservable();
  }
  unsubscribe(): void {
    this.observableSubject.unsubscribe();
  }
  getStateSnapshot(): State {
    return { ...this.state };
  }
  getPropertyFromState(property: string): any {
    return this.state[property];
  }
  getPropertyFromObservable(property: string): Observable<any> {
    return this.getObservable().pipe(
      map((s) => this.checkIfPropertyExists(s, property))
    )
  }
  setObservableValues(
    value: any,
    property: string | null = null,
    emit = true
  ): void {
    this.setStateValues(value, property);
    if (emit) {
      this.observableSubject.next(this.state);
    }
  }
  private setStateValues(value: any, property: string | null): void {
    if (property && this.checkIfPropertyExists(this.state, property) !== undefined) {
      (this.state as TypeWithKey<any>)[property] = value;
    } else {
      this.state = {
        ...this.state,
        ...value,
      }
    }
  }
  resetState():void {
    (this.state as TypeWithKey<any>) = {}
  }
  private checkIfPropertyExists(state: any, property: string): any {
    const condition = () => {
      return { met: state.hasOwnProperty(property), value: state[property] };
    };
    return checkIfConditionMet(
      () => condition(),
      "Selected property not found ! check if the key is correct and exists"
    );
  }
}
