import { BehaviorSubject } from "rxjs";
import { checkIfPropertyExists } from "../utilities/check-if-property-exists";

// type State = TypeWithKey<any>
export class ShaggyObject {
  private state: any;
  readonly observableSubject: BehaviorSubject<any>;
  constructor(state: any){
    this.state = state;
    this.observableSubject = new BehaviorSubject(this.state);
  }
  getObservable(){
    return this.observableSubject.asObservable();
  }
  setObservableValue(value: any, property?: string, emit:boolean = true){
    if (property && checkIfPropertyExists(this.state, property, `The property ${property} does not exist in the state.`)){
      this.state[property] = value;
    } else {
      this.state = {
        ...this.state,
        ...value,
      }
    }
    if (emit)this.observableSubject.next(this.state);
  }
  unsubscribe(){
    this.observableSubject.unsubscribe();

  }
}
