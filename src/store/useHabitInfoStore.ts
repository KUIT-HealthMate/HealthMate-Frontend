import { create } from "zustand";
import { habitInfo } from "./challengeTypes";
import { initHabit } from "../pages/Home/Challenge/ManagePage/utils/initChallenge";
import { serverRequest } from "../APIs/ManageChallenge/serverRequest";

interface HabitInfoState {
  HabitInfo: habitInfo[];
  setHabitInfo: (habit: habitInfo) => void;


  setWeeklyIntakeFrequency: (habitId: string, whichDay: string) => void;
  getWeeklyIntakeFrequency: (habitId: string, whichDay: string) => boolean;


  // 주어진 id의 habit을 삭제합니다.
  deleteHabit: (habitId: string) => void;

  // id를 제외한 요소들을 얕은 복사한 habit을 반환합니다.
  getHabitCopy: (habitId: string) => Omit<habitInfo, "id">;

  // id와 일치하는 habit의 요소들을 주어진 habit로 설정합니다.
  setHabit: (
    habitId: string,
    inputHabit: Omit<Omit<habitInfo, "id">, "notificationTime">,
    alarmTime: { hour: number; minute: number }[]
  ) => void;
}

const useHabitInfoStore = create<HabitInfoState>((set, get) => {
  const initializeHabits = async () => {
    try {
      const habitArray:habitInfo[] = await serverRequest.loadChallenge<habitInfo>("habits");
      set({HabitInfo: habitArray});
    } catch (error) {
      console.error("Error initializing habits:", error);
    }
  }

  initializeHabits();

  return {
  HabitInfo: [] as habitInfo[],

  setHabitInfo: (habit: habitInfo) =>
    set((state) => ({
      HabitInfo: [...state.HabitInfo, habit],
    })),



  setWeeklyIntakeFrequency: (habitId: string, whichDay: string) => {
    set((state) => ({
      HabitInfo: state.HabitInfo.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              weeklyIntakeFrequency: {
                ...habit.weeklyIntakeFrequency,
                [whichDay]: !(habit.weeklyIntakeFrequency as any)[whichDay],
              },
            }
          : habit
      ),
    }));
  },

  getWeeklyIntakeFrequency: (habitId: string, whichDay: string) => {
    const habit = get().HabitInfo.find((habit) => habit.id === habitId);
    return habit
      ? (habit.weeklyIntakeFrequency as any)[whichDay]
      : undefined;
  },

  deleteHabit: (deletingHabitId: string) =>
    set((state) => ({
      HabitInfo: [
        ...state.HabitInfo.filter((habit) => habit.id !== deletingHabitId),
      ],
    })),

  getHabitCopy: (habitId: string | undefined) => {
    if (habitId === undefined) {
      return { ...initHabit(), notificationTime: [] };
    } else {
      //Id에 해당하는 habit의 참조를 얻는다
      const targetHabit: habitInfo = get().HabitInfo.find(
         // eslint-disable-next-line eqeqeq
        (habit) => habit.id == habitId
      ) as habitInfo;

      //얕은 복사한 복사본을 생성
      const duplicatedHabit: Omit<habitInfo, "id"> = {
        name: targetHabit.name,
        weeklyIntakeFrequency: {
          monday: targetHabit.weeklyIntakeFrequency.monday,
          tuesday: targetHabit.weeklyIntakeFrequency.tuesday,
          wednesday: targetHabit.weeklyIntakeFrequency.wednesday,
          thursday: targetHabit.weeklyIntakeFrequency.thursday,
          friday: targetHabit.weeklyIntakeFrequency.friday,
          saturday: targetHabit.weeklyIntakeFrequency.saturday,
          sunday: targetHabit.weeklyIntakeFrequency.sunday,
        },
        notificationTime: targetHabit.notificationTime.map((time) => ({
          ...time,
        })),
      };

      return duplicatedHabit;
    }
  },

  setHabit: (
    habitId: string,
    inputHabit: Omit<Omit<habitInfo, "id">, "notificationTime">,
    alarmTime: { hour: number; minute: number }[]
  ) => {
    set((state) => ({
      HabitInfo: state.HabitInfo.map((targetHabit) =>
        targetHabit.id === habitId
          ? {
              ...targetHabit,
              name: inputHabit.name,
              weeklyIntakeFrequency: {
                monday: inputHabit.weeklyIntakeFrequency.monday,
                tuesday: inputHabit.weeklyIntakeFrequency.tuesday,
                wednesday: inputHabit.weeklyIntakeFrequency.wednesday,
                thursday: inputHabit.weeklyIntakeFrequency.thursday,
                friday: inputHabit.weeklyIntakeFrequency.friday,
                saturday: inputHabit.weeklyIntakeFrequency.saturday,
                sunday: inputHabit.weeklyIntakeFrequency.sunday,
              },
              notificationTime: alarmTime.map((time) => ({ ...time })),
            }
          : targetHabit
        ),
      }));
    },
  };
});

export default useHabitInfoStore;
