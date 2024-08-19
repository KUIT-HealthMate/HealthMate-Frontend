import { create } from "zustand";
import { pillInfo } from "./challengeTypes";
import { initPill } from "../pages/Home/Challenge/ManagePage/utils/initChallenge";
import { serverRequest } from "../APIs/ManageChallenge/serverRequest";

interface PillInfoState {
  PillInfo: pillInfo[];
  setPillInfo: (pill: pillInfo) => void;

  setIntakePeriod: (pillId: string, whichMeal: string) => void;
  getIntakePeriod: (pillId: string, whichMeal: string) => boolean;

  // setIntakeRecord: (pillId: string, whichMeal: string) => void;
  // getIntakeRecord: (pillId: string, whichMeal: string) => boolean | undefined;

  setWeeklyIntakeFrequency: (pillId: string, whichDay: string) => void;
  getWeeklyIntakeFrequency: (pillId: string, whichDay: string) => boolean;

  setNotificationTime: (pillId: string, hour: number, minute: number) => void;
  getNotificationTime: (
    pillId: string,
    index: number
  ) => { hour: number; minute: number };

  getIntakeTime: (pill: pillInfo) => string;
  getMealTime: (idx: number) => string;

  // 주어진 id의 pill을 삭제합니다.
  deletePill: (pillId: string) => void;

  // id를 제외한 요소들을 얕은 복사한 pill을 반환합니다.
  getPillCopy: (pillId: string | undefined) => Omit<pillInfo, "id"> | undefined;

  // id와 일치하는 pill의 요소들을 주어진 pill로 설정합니다.
  setPill: (
    pillId: string,
    inputPill: Omit<Omit<pillInfo, "id">, "notificationTime">,
    alarmTime: { hour: number; minute: number }[]
  ) => void;
}

interface pillPageNumState {
  currentPillPageNum: number;
  setPillPageNum: (goNext: boolean) => void;
}

export const pillPage = create<pillPageNumState>((set, get) => ({
  currentPillPageNum: 0,
  setPillPageNum: (goNext: boolean) =>
    set((state) => {
      if (goNext) {
        // 다음장으로
        return { currentPillPageNum: state.currentPillPageNum + 1 };
      } else {
        // 이전장으로
        return { currentPillPageNum: state.currentPillPageNum - 1 };
      }
    }),
}));

export const usePillInfoStore = create<PillInfoState>((set, get) => {
  const initializePills = async () => {
    try {
      const pillArray:pillInfo[] = await serverRequest.loadChallenge<pillInfo>("supplements");
      set({PillInfo: pillArray});
    } catch (error) {
      console.error("Error initializing pills:", error);
    }
  }

  initializePills();

  return {
    PillInfo: [],

    setPillInfo: (pill: pillInfo) =>
      set((state) => ({
        PillInfo: [...state.PillInfo, pill],
      })),

    setIntakePeriod: (pillId: string, whichMeal: string) => {
      set((state) => ({
        PillInfo: state.PillInfo.map((pill) =>
          pill.id === pillId
            ? {
                ...pill,
                dailyIntakePeriod: {
                  ...pill.dailyIntakePeriod,
                  [whichMeal]: !(pill.dailyIntakePeriod as any)[whichMeal],
                },
              }
            : pill
        ),
      }));
    },

    getIntakePeriod: (pillId: string, whichMeal: string) => {
      const pill = get().PillInfo.find((pill) => pill.id === pillId);
      return pill ? (pill.dailyIntakePeriod as any)[whichMeal] : undefined;
    },


    setWeeklyIntakeFrequency: (pillId: string, whichDay: string) => {
      set((state) => ({
        PillInfo: state.PillInfo.map((pill) =>
          pill.id === pillId
            ? {
                ...pill,
                weeklyIntakeFrequency: {
                  ...pill.weeklyIntakeFrequency,
                  [whichDay]: !(pill.weeklyIntakeFrequency as any)[whichDay],
                },
              }
            : pill
        ),
      }));
    },

    getWeeklyIntakeFrequency: (pillId: string, whichDay: string) => {
      const pill = get().PillInfo.find((pill) => pill.id === pillId);
      return pill ? (pill.weeklyIntakeFrequency as any)[whichDay] : undefined;
    },

    setNotificationTime: (pillId: string, hour: number, minute: number) => {},

    getNotificationTime: (pillId: string, index: number) => {
      return { hour: 0, minute: 0 };
    },

    getIntakeTime: (pill: pillInfo) => {
      const isBeforeOrAfterMeal: string =
        pill.intakeTime.beforeOrAfterMeal === 1 ? "식전 " : "식후 ";
      const howMuchMinutes: string = pill.intakeTime.minutes + "분 이내";

      return isBeforeOrAfterMeal + howMuchMinutes;
    },

    getMealTime: (idx: number) => {
      switch (idx) {
        case 0:
          return "아침";
        case 1:
          return "점심";
        case 2:
          return "저녁";
        default:
          return "";
      }
    },

    deletePill: (deletingPillId: string) =>
      set((state) => ({
        PillInfo: [
          ...state.PillInfo.filter((pill) => pill.id !== deletingPillId),
        ],
      })),

    getPillCopy: (pillId: string | undefined) => {
      if (pillId === undefined) {
        return { ...initPill(), notificationTime: [] };
      } else {
        //Id에 해당하는 pill의 참조를 얻는다
        const tempPill = get().PillInfo.find(
          // eslint-disable-next-line eqeqeq
          (pill) => pill.id == pillId
        );
        if(tempPill === undefined){
          return undefined;
        }
        const targetPill: pillInfo = tempPill as pillInfo;

        //얕은 복사한 복사본을 생성
        const duplicatedPill: Omit<pillInfo, "id"> = {
          name: targetPill.name,
          intakeTime: {
            beforeOrAfterMeal: targetPill.intakeTime.beforeOrAfterMeal,
            minutes: targetPill.intakeTime.minutes,
          },
          dailyIntakePeriod: {
            breakfast: targetPill.dailyIntakePeriod.breakfast,
            lunch: targetPill.dailyIntakePeriod.lunch,
            dinner: targetPill.dailyIntakePeriod.dinner,
          },
          weeklyIntakeFrequency: {
            monday: targetPill.weeklyIntakeFrequency.monday,
            tuesday: targetPill.weeklyIntakeFrequency.tuesday,
            wednesday: targetPill.weeklyIntakeFrequency.wednesday,
            thursday: targetPill.weeklyIntakeFrequency.thursday,
            friday: targetPill.weeklyIntakeFrequency.friday,
            saturday: targetPill.weeklyIntakeFrequency.saturday,
            sunday: targetPill.weeklyIntakeFrequency.sunday,
          },
          notificationTime: targetPill.notificationTime.map((time) => ({
            ...time,
          })),
        };

        return duplicatedPill;
      }
    },

    setPill: (
      pillId: string,
      inputPill: Omit<Omit<pillInfo, "id">, "notificationTime">,
      alarmTime: { hour: number; minute: number }[]
    ) => {
      set((state) => ({
        PillInfo: state.PillInfo.map((targetPill) =>
          // eslint-disable-next-line eqeqeq
          targetPill.id == pillId
            ? {
                ...targetPill,
                name: inputPill.name,
                intakeTime: {
                  beforeOrAfterMeal: inputPill.intakeTime.beforeOrAfterMeal,
                  minutes: inputPill.intakeTime.minutes,
                },
                dailyIntakePeriod: {
                  breakfast: inputPill.dailyIntakePeriod.breakfast,
                  lunch: inputPill.dailyIntakePeriod.lunch,
                  dinner: inputPill.dailyIntakePeriod.dinner,
                },
                weeklyIntakeFrequency: {
                  monday: inputPill.weeklyIntakeFrequency.monday,
                  tuesday: inputPill.weeklyIntakeFrequency.tuesday,
                  wednesday: inputPill.weeklyIntakeFrequency.wednesday,
                  thursday: inputPill.weeklyIntakeFrequency.thursday,
                  friday: inputPill.weeklyIntakeFrequency.friday,
                  saturday: inputPill.weeklyIntakeFrequency.saturday,
                  sunday: inputPill.weeklyIntakeFrequency.sunday,
                },
                notificationTime: alarmTime.map((time) => ({ ...time })),
              }
            : targetPill
        ),
      }));
    },
  };
});

// export default usePillInfoStore;
// export default pillPageNum;
