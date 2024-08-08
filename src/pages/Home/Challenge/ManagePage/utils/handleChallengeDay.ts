import { ChangeEvent } from "react";

import pillInfo from "../../../../../store/pillInfo";
import habitInfo from "../../../../../store/habitInfo";

// 이벤트 핸들러: 주 섭취 횟수
const handleChallengeDay = <T>(
  e: ChangeEvent<HTMLInputElement>,
  setter: (value: React.SetStateAction<T>) => void,
  newChallenge: Omit<T, "id" | "notificationTime">,
  value: string
): void => {
  if (
    (newChallenge as unknown as pillInfo).weeklyIntakeFrequency !== undefined
  ) {
    setter({
      ...newChallenge,
      weeklyIntakeFrequency: {
        ...(newChallenge as unknown as pillInfo).weeklyIntakeFrequency,
        [value]: !(
          (newChallenge as unknown as pillInfo).weeklyIntakeFrequency as any
        )[value],
      },
    } as T);
    console.log(
      ((newChallenge as unknown as pillInfo).weeklyIntakeFrequency as any)[
        value
      ]
    );
  }

  if (
    (newChallenge as unknown as habitInfo).weeklyExecutionFrequency !==
    undefined
  ) {
    setter({
      ...newChallenge,
      weeklyExecutionFrequency: {
        ...(newChallenge as unknown as habitInfo).weeklyExecutionFrequency,
        [value]: !(
          (newChallenge as unknown as habitInfo).weeklyExecutionFrequency as any
        )[value],
      },
    } as T);
  }
};

export default handleChallengeDay;
