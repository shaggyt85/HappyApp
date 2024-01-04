import { EmptyUserState } from "./states/user.states"

export enum SourceOfTruthKey {
  'USER' = 'user'
}
export const SourceOfTruth = [
  {
    key: SourceOfTruthKey.USER,
    state: EmptyUserState,
  }
]
