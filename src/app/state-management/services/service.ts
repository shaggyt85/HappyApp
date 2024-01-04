import { ShaggyState } from "../models/shaggy-state-manager";
import { SourceOfTruthInitiate } from "../models/sources-ot-truth";

export const createStore = (SourceOfTruth: SourceOfTruthInitiate[]) => {
  return new ShaggyState(SourceOfTruth);
}
