import { checkIfConditionMet } from "../utilities/check-if-condition-met";
import { SourceOfTruth, SourceOfTruthInitiate } from "./sources-ot-truth";
import { ShaggyObject } from "./shaggy-object";

export class ShaggyState {
  private observerArray: SourceOfTruth = new Map()
  constructor(SourceOfTruthKeys: SourceOfTruthInitiate[]) {
    SourceOfTruthKeys.forEach((k) => {
      const { state } = k;
      this.createObservable(k.key, state);
    });
  }
  private static checkIfFound(
    shaggyObject: ShaggyObject | undefined
  ): ShaggyObject {
    const condition = () => {
      return { met: !!shaggyObject, value: shaggyObject };
    };
    return checkIfConditionMet(
      () => condition(),
      "Observable item not found ! check if the key is correct and exists"
    );
  }
  createNewSourceOfTruth(key: string, state: any):void {
    this.createObservable(key, state);
  }
  private createObservable(key: string, state: any):void {
    const found = this.observerArray.has(key);
    if (found) {
      console.log(
        `State with key ${key} already exists, The action will be the ignored`
      )
    } else {
      const shaggyObject = new ShaggyObject(state);
      this.observerArray.set(key, shaggyObject);
    }
  }
  getEntity(key: string): ShaggyObject {
    const observableArrayItem = ShaggyState.checkIfFound(
      this.observerArray.get(key)
    );
    return observableArrayItem;
  }
}
