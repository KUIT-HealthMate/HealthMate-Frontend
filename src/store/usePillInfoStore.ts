import { create } from "zustand";

interface pillInfo {
    id: number;
    name: string; // 알약 이름
    intakeTime: [number, number]; // 섭취 시간 (식전 1 식후 2, 분 number로)
    dailyIntakePeriod: [boolean, boolean, boolean]; // 일 섭취 시기 (아침, 점심, 저녁)
    weeklyIntakeFrequency: [
      boolean,
      boolean,
      boolean,
      boolean,
      boolean,
      boolean,
      boolean
    ]; // 주 섭취 횟수 (월 ~ 일)
    notificationTime: [number, number][]; // 팝업 알림 시간 (19:30 이면 19, 30)
}

interface PillInfoState {
    PillInfo: pillInfo[];
    setPillInfo: (pill: pillInfo) => void;
    printIntakeTime: (pill: pillInfo) => string;
    printMealTime: (idx: number) => string;
}

const usePillInfoStore = create<PillInfoState>((set) => ({
    PillInfo: [
        {
            id: 0,
            name: "베아제",
            intakeTime: [2, 30],
            dailyIntakePeriod: [true, true, true],
            weeklyIntakeFrequency: [true, true, true, true, true, true, true],
            notificationTime: [
                [7, 30],
                [12, 0],
                [18, 0],
            ],
        },
        {
            id: 1,
            name: "비타민",
            intakeTime: [2, 30],
            dailyIntakePeriod: [true, true, true],
            weeklyIntakeFrequency: [true, false, true, false, true, false, false],
            notificationTime: [
                [7, 35],
                [12, 5],
                [18, 5],
            ],
        },
        {
            id: 2,
            name: "루테인",
            intakeTime: [2, 30],
            dailyIntakePeriod: [true, false, true],
            weeklyIntakeFrequency: [true, false, true, true, true, false, true],
            notificationTime: [
                [7, 40],
                [12, 10],
                [18, 10],
            ],
        },
    ],

    setPillInfo: (pill: pillInfo) => set((state) => ({
            PillInfo: [...state.PillInfo, pill],
    })),

    printIntakeTime: (pill: pillInfo) => {
        const isBeforeOrAfterMeal:string = (pill.intakeTime[0] == 1) ? "식전 " : "식후 ";
        const howMuchMinutes:string = pill.intakeTime[1] + "분 이내";
    
        return isBeforeOrAfterMeal + howMuchMinutes;
    },

    printMealTime: (idx: number) => {
        switch(idx){
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
}));

export default usePillInfoStore;