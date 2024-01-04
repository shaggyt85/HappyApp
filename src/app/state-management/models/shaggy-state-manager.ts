import { checkIfConditionMet } from "../utilities/check-if-property-exists";
import { ShaggyObject } from "./shaggy-object";
import { SourceOfTruth, SourceOfTruthState } from "./sources-ot-truth";

export class ShaggyState {
  private observerArray: SourceOfTruth = new Map()
  constructor(SourceOfTruth: SourceOfTruthState[]) {
    SourceOfTruth.forEach((sourceOfTruthState) => {
      const { key, state } = sourceOfTruthState;
      this.createObservable(key, state);
    });
  }
  private createObservable(key: string, state: any) {
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
    const found = checkIfConditionMet({met: this.observerArray.has(key), value: this.observerArray.get(key)}, `The key ${key} does not exist in the source of truth.`);
      return found
  }
}
