import habitInfo from "../../../../../store/habitInfo";
import pillInfo from "../../../../../store/pillInfo";

export const initPill = (): Omit<pillInfo, "id" | "notificationTime"> => {
  return {
    name: "", // 알약 이름
    intakeTime: { beforeOrAfterMeal: 0, minutes: 0 }, // 섭취 시간 (식전 1 식후 2, 분 number로)
    dailyIntakePeriod: { breakfast: false, lunch: false, dinner: false }, // 일 섭취 시기 (아침, 점심, 저녁)
    // dailyIntakeRecord: { breakfast: false, lunch: false, dinner: false },
    weeklyIntakeFrequency: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    }, // 주 섭취 횟수 (월 ~ 일)
    //notificationTime: [{ hour: 0, minutes: 0 }], // 팝업 알림 시간 (19:30 이면 19, 30)
  };
};

export const initHabit = (): Omit<
  Omit<habitInfo, "id">,
  "notificationTime"
> => {
  return {
    name: "", // 알약 이름
    // executionRecord: false,
    weeklyExecutionFrequency: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    }, // 주 섭취 횟수 (월 ~ 일)
    //notificationTime: [{ hour: 0, minutes: 0 }], // 팝업 알림 시간 (19:30 이면 19, 30)
  };
};

export const initChallenge = (challengeType: string) => {
  if (challengeType === "pill") {
    return initPill();
  } else {
    return initHabit();
  }
};
