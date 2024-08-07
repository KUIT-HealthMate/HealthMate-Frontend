import { ChangeEvent } from "react";
import pillInfo from "../../../../../store/pillInfo";

export const handleBeforeOrAfterMeal = (value: number, setter: (value: React.SetStateAction<Omit<pillInfo, "id" | "notificationTime">>) => void, newPill: Omit<pillInfo, "id" | "notificationTime">): void => {
    setter({...newPill, intakeTime:{...newPill.intakeTime, beforeOrAfterMeal: value}});
    // newPill.intakeTime.beforeOrAfterMeal = value;
  };

  // 이벤트 핸들러: 식사 전후 복용 시간
export const handleMealMinute = (inputElement: HTMLInputElement, setter: (value: React.SetStateAction<Omit<pillInfo, "id" | "notificationTime">>) => void, newPill: Omit<pillInfo, "id" | "notificationTime">): void => {
    const filteredValue = inputElement.value.replace(/[^0-9]/g, "");
    inputElement.value = filteredValue;

    setter({...newPill,intakeTime:{...newPill.intakeTime, minutes:filteredValue as unknown as number}});
};

export const handleEatingTiming = (
    e: ChangeEvent<HTMLInputElement>,
    value: string,
    setter: (value: React.SetStateAction<Omit<pillInfo, "id" | "notificationTime">>) => void,
    newPill: Omit<pillInfo, "id" | "notificationTime">
  ): void => {

    setter({...newPill, dailyIntakePeriod: {
      ...newPill.dailyIntakePeriod,
      [value]: !(newPill.dailyIntakePeriod as any)[value],
    }});

};

