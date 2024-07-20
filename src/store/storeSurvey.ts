import create from 'zustand';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface Survey {
    id: number;
    question: string[];
    candidates: string[];
}



export const surveys: Survey[] = [
    { id: 0, question: ["오늘의 근무(공부) 환경 및 시간은?"], candidates: ["규칙적이다.", "불규칙적이다."] },
    { id: 1, question: ["오늘 하루 쉬는 시간 없이", "근무/공부에 집중한 시간을 알려주세요."], candidates: ["1시간 이하", "2~3시간", "4~5시간", "6~7시간", "8시간 이상"] },
    { id: 2, question: ["오늘 하루 커피를 몇 잔 마셨나요?"], candidates: ["0잔", "1잔", "2잔", "3잔 이상"] },
    { id: 3, question: ["오늘 운동을 몇 시간 하셨나요?"], candidates: ["0시간", "1~2시간", "3시간 이상"] },
    { id: 4, question: ["오늘 하루 동안 업무/공부 도중", "허리나 자세에 불편함을 느낀 적이 있나요?"], candidates: ["예", "아니오"] }
];

export const surveysMeal: Survey[] = [
    { id: 0, question: ["오늘 언제 식사하셨나요?"], candidates: ["규칙적이다.", "불규칙적이다."] },
    { id: 1, question: ["오늘 먹은 음식 종류를 선택해주세요.", "근무/공부에 집중한 시간을 알려주세요."], candidates: ["1시간 이하", "2~3시간", "4~5시간", "6~7시간", "8시간 이상"] },
    { id: 2, question: ["오늘의 식사 시간은?"], candidates: ["0잔", "1잔", "2잔", "3잔 이상"] },
    { id: 3, question: ["한 끼 식사에 소요된 시간을 알려주세요."], candidates: ["0시간", "1~2시간", "3시간 이상"] },
    { id: 4, question: ["식사를 할 때 소금이나", "허리나 자세에 불편함을 느낀 적이 있나요?"], candidates: ["예", "아니오"] },
    { id: 5, question: ["식사하는데 TC나 ", "허리나 자세에 불편함을 느낀 적이 있나요?"], candidates: ["예", "아니오"] },
    { id: 6, question: ["오늘 하루 식사 도중", "허리나 자세에 불편함을 느낀 적이 있나요?"], candidates: ["예", "아니오"] }
];

export const surveysSleep: Survey[] = [
    { id: 0, question: ["오늘 몇 시간 주무셨나요?"], candidates: ["규칙적이다.", "불규칙적이다."] },
    { id: 1, question: ["오늘 하루 아침에 느껴진 피로도 정도를 체크해주세요"], candidates: ["1시간 이하", "2~3시간", "4~5시간", "6~7시간", "8시간 이상"] },
    { id: 2, question: ["오늘 하루 컨디션이 가장 최고인 시간은 언제였나요?"], candidates: ["0잔", "1잔", "2잔", "3잔 이상"] },
    { id: 3, question: ["오늘 수면 중 특이사항은 없었나요?"], candidates: ["0시간", "1~2시간", "3시간 이상"] }
];

interface StoreState {
    currentQuestionIdx: number;
    mealCurrentQuestionIdx: number;
    sleepCurrentQuestionIdx: number;
    nextQuestion: () => void;
    nextQuestionMeal: () => void;
    nextQuestionSleep: () => void;

}

export const useGlobalStoreSurvey = create<StoreState>((set) => ({
    currentQuestionIdx: 0,
    mealCurrentQuestionIdx: 0,
    sleepCurrentQuestionIdx: 0,
    useNavigateTo: null,
    nextQuestion: () => set((state) => {

        console.log("nextQuestion");
        if (state.currentQuestionIdx < surveys.length - 1) {

            return { currentQuestionIdx: state.currentQuestionIdx + 1 };
        } else {
            console.log("다함");
            return state;
        }
    }),

    nextQuestionMeal: () => set((state) => {
        console.log("nextQuestionMeal");
        if (state.mealCurrentQuestionIdx < surveysMeal.length - 1) {
            return { mealCurrentQuestionIdx: state.mealCurrentQuestionIdx + 1 };
        } else {
            console.log("식사패턴 다함");
            return state;
        }
    }),
    nextQuestionSleep: () => set((state) => {
        console.log("nextQuestionMeal");
        if (state.sleepCurrentQuestionIdx < surveysSleep.length - 1) {
            return { sleepCurrentQuestionIdx: state.sleepCurrentQuestionIdx + 1 };
        } else {
            console.log("수면패턴 다함");
            return state;
        }
    }),
}));

