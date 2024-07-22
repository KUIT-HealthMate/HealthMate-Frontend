import { create } from "zustand";
import pillInfo from "./pillInfo";

interface PillInfoState {
    PillInfo: pillInfo[];
    setPillInfo: (pill: pillInfo) => void;
    setIntakeRecord: (pillId: number, whichMeal: string) => void;
    getIntakeRecord: (pillId: number, whichMeal: string) => boolean;
    getIntakeTime: (pill: pillInfo) => string;
    getMealTime: (idx: number) => string;
    deletePill: (pillId:number) => void;
}

const usePillInfoStore = create<PillInfoState>((set, get) => ({
    PillInfo: [
        {
            id: 0,
            name: "베아제",
            intakeTime: {beforeOrAfterMeal: 2, minutes: 30},
            dailyIntakePeriod: {breakfast: true, lunch: true, dinner: true},
            dailyIntakeRecord: {breakfast: false, lunch: false, dinner: false},
            weeklyIntakeFrequency: {
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: true,
                sunday: true
              },
            notificationTime: [
                {hour: 7, minutes: 30},
                {hour: 12, minutes: 0},
                {hour: 18, minutes: 0}
            ],
        },
        {
            id: 1,
            name: "비타민",
            intakeTime: {beforeOrAfterMeal: 2, minutes: 30},
            dailyIntakePeriod: {breakfast: true, lunch: true, dinner: true},
            dailyIntakeRecord: {breakfast: false, lunch: false, dinner: false},
            weeklyIntakeFrequency: {
                monday: true,
                tuesday: false,
                wednesday: true,
                thursday: false,
                friday: true,
                saturday: false,
                sunday: false
              },
            notificationTime: [
                {hour: 7, minutes: 35},
                {hour: 12, minutes: 5},
                {hour: 18, minutes: 5}
            ],
        },
        {
            id: 2,
            name: "루테인",
            intakeTime: {beforeOrAfterMeal: 2, minutes: 30},
            dailyIntakePeriod: {breakfast: true, lunch: false, dinner: true},
            dailyIntakeRecord: {breakfast: false, lunch: false, dinner: false},
            weeklyIntakeFrequency: {
                monday: true,
                tuesday: false,
                wednesday: true,
                thursday: true,
                friday: false,
                saturday: true,
                sunday: true
              },
            notificationTime: [
                {hour: 7, minutes: 40},
                {hour: 12, minutes: 10},
                {hour: 18, minutes: 10}
            ],
        },
    ],

    setPillInfo: (pill: pillInfo) => set((state) => ({
            PillInfo: [...state.PillInfo, pill],
    })),

    // 아침, 점심, 저녁에 영양제 먹었다고 버튼 클릭 -> IntakeRecord에서 수정하는 함수
    setIntakeRecord: (pillId, whichMeal) => {
        
        set((state) => ({
            PillInfo: state.PillInfo.map((pill) =>
              pill.id === pillId
                ? { ...pill, dailyIntakeRecord: { ...pill.dailyIntakeRecord, [whichMeal]: !(pill.dailyIntakeRecord as any)[whichMeal] } }
                : pill
            )
          })
        );

    },

    getIntakeRecord: (pillId, whichMeal) => {
        const pill = get().PillInfo.find(pill => pill.id == pillId);
        return pill ? (pill.dailyIntakeRecord as any)[whichMeal] : undefined;
    },
    

    getIntakeTime: (pill: pillInfo) => {
        const isBeforeOrAfterMeal:string = (pill.intakeTime.beforeOrAfterMeal == 1) ? "식전 " : "식후 ";
        const howMuchMinutes:string = pill.intakeTime.minutes + "분 이내";
    
        return isBeforeOrAfterMeal + howMuchMinutes;
    },

    getMealTime: (idx: number) => {
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

    deletePill: (deletingPillId: number) => 
        set((state) => ({ PillInfo: [...state.PillInfo.filter((pill) => (pill.id != deletingPillId))] })),
    
    }));

export default usePillInfoStore;