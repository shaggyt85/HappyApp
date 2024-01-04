import { ShaggyObject } from "./shaggy-object";

export type SourceOfTruth = Map<string, ShaggyObject>;
export interface SourceOfTruthInitiate {
  key: string;
  state: any;
}

