import { create } from "zustand";
import habitInfo from "./habitInfo";
import { initHabit } from "../pages/Home/Challenge/ManagePage/utils/initChallenge";

interface HabitInfoState {
  HabitInfo: habitInfo[];
  setHabitInfo: (habit: habitInfo) => void;

  // getExecutionRecord: (habitId: string) => boolean | undefined;
  // setExecutionRecord: (habitId: string) => void;

  setWeeklyExecutionFrequency: (habitId: string, whichDay: string) => void;
  getWeeklyExecutionFrequency: (habitId: string, whichDay: string) => boolean;

  setNotificationTime: (habitId: string, hour: number, minute: number) => void;
  getNotificationTime: (
    habitId: string,
    index: number
  ) => { hour: number; minute: number };

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

const useHabitInfoStore = create<HabitInfoState>((set, get) => ({
  HabitInfo: [
    {
      id: "0",
      name: "베아제",
      // executionRecord: true,
      weeklyExecutionFrequency: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      },
      notificationTime: [
        { hour: 7, minute: 30 },
        { hour: 12, minute: 0 },
        { hour: 18, minute: 0 },
      ],
    },
    {
      id: "1",
      name: "비타민",
      // executionRecord: false,
      weeklyExecutionFrequency: {
        monday: true,
        tuesday: false,
        wednesday: true,
        thursday: false,
        friday: true,
        saturday: false,
        sunday: false,
      },
      notificationTime: [
        { hour: 7, minute: 35 },
        { hour: 12, minute: 5 },
        { hour: 18, minute: 5 },
      ],
    },
    {
      id: "2",
      name: "루테인",
      // executionRecord: true,
      weeklyExecutionFrequency: {
        monday: true,
        tuesday: false,
        wednesday: true,
        thursday: true,
        friday: false,
        saturday: true,
        sunday: true,
      },
      notificationTime: [
        { hour: 7, minute: 40 },
        { hour: 12, minute: 10 },
        { hour: 18, minute: 10 },
      ],
    },
  ],

  setHabitInfo: (habit: habitInfo) =>
    set((state) => ({
      HabitInfo: [...state.HabitInfo, habit],
    })),

  // getExecutionRecord: (habitId: string) => {
  //   const habit = get().HabitInfo.find((habit) => habit.id === habitId);
  //   return habit ? habit.executionRecord : undefined;
  // },

  // setExecutionRecord: (habitId: string) => {
  //   set((state) => ({
  //     HabitInfo: state.HabitInfo.map((habit) =>
  //       habit.id === habitId
  //         ? { ...habit, executionRecord: !habit.executionRecord }
  //         : habit
  //     ),
  //   }));
  // },

  setWeeklyExecutionFrequency: (habitId: string, whichDay: string) => {
    set((state) => ({
      HabitInfo: state.HabitInfo.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              weeklyExecutionFrequency: {
                ...habit.weeklyExecutionFrequency,
                [whichDay]: !(habit.weeklyExecutionFrequency as any)[whichDay],
              },
            }
          : habit
      ),
    }));
  },

  getWeeklyExecutionFrequency: (habitId: string, whichDay: string) => {
    const habit = get().HabitInfo.find((habit) => habit.id === habitId);
    return habit
      ? (habit.weeklyExecutionFrequency as any)[whichDay]
      : undefined;
  },

  setNotificationTime: (habitId: string, hour: number, minute: number) => {},

  getNotificationTime: (habitId: string, index: number) => {
    return { hour: 0, minute: 0 };
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
        (habit) => habit.id === habitId
      ) as habitInfo;

      //얕은 복사한 복사본을 생성
      const duplicatedHabit: Omit<habitInfo, "id"> = {
        name: targetHabit.name,
        // executionRecord: targetHabit.executionRecord,
        weeklyExecutionFrequency: {
          monday: targetHabit.weeklyExecutionFrequency.monday,
          tuesday: targetHabit.weeklyExecutionFrequency.tuesday,
          wednesday: targetHabit.weeklyExecutionFrequency.wednesday,
          thursday: targetHabit.weeklyExecutionFrequency.thursday,
          friday: targetHabit.weeklyExecutionFrequency.friday,
          saturday: targetHabit.weeklyExecutionFrequency.saturday,
          sunday: targetHabit.weeklyExecutionFrequency.sunday,
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
              weeklyExecutionFrequency: {
                monday: inputHabit.weeklyExecutionFrequency.monday,
                tuesday: inputHabit.weeklyExecutionFrequency.tuesday,
                wednesday: inputHabit.weeklyExecutionFrequency.wednesday,
                thursday: inputHabit.weeklyExecutionFrequency.thursday,
                friday: inputHabit.weeklyExecutionFrequency.friday,
                saturday: inputHabit.weeklyExecutionFrequency.saturday,
                sunday: inputHabit.weeklyExecutionFrequency.sunday,
              },
              notificationTime: alarmTime.map((time) => ({ ...time })),
            }
          : targetHabit
      ),
    }));
  },
}));

export default useHabitInfoStore;
