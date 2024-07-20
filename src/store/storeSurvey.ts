import create from 'zustand';

interface Survey {
    id: number;
    question: string[];
    candidates: string[];
}

export const surveys: Survey[] = [
    { id: 0, question: ["오늘의 근무(공부) 환경 및 시간은?"], candidates: ["규칙적이다.", "불규칙적이다."] },
    { id: 1, question: ["오늘 하루 쉬는 시간 없이", "근무/공부에 집중한 시간을 알려주세요."], candidates: ["1시간 이하", "2~3시간", "4~5시간", "6~7시간", "8시간 이상"] }
];

interface StoreState {
    currentQuestionIdx: number;
    nextQuestion: () => void;
}

export const useGlobalStoreSurvey = create<StoreState>((set) => ({
    currentQuestionIdx: 0,
    nextQuestion: () => set((state) => {
        console.log("nextQuestion");
        if (state.currentQuestionIdx < surveys.length - 1) {
            return { currentQuestionIdx: state.currentQuestionIdx + 1 };
        } else {
            console.log("다함");
            return state;
        }
    }),
}));

