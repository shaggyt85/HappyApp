import { Condition } from "../models/condition";
export function checkIfConditionMet(
  condition: () => Condition,
  errorMessage: string): any {
    const conditionMet = condition();
    if (!conditionMet.met) {
      console.error(errorMessage)
      throw Error(errorMessage);
  }
  return conditionMet.value;
}
