import create from 'zustand';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { stat } from 'fs';

interface Survey {
    id: number;
    question: string[];
    candidates: string[];
    multipleAble: boolean;
    limit: number;
    type: number; //1:습관 2:식사 3:수면
}

export const surveys: Survey[] = [
    { id: 1, question: ["오늘의 근무(공부) 환경 및 시간은?"], candidates: ["규칙적이다.", "불규칙적이다."], multipleAble: false, limit: 0, type: 1 },
    { id: 2, question: ["오늘 하루 쉬는 시간 없이", "근무/공부에 집중한 시간은?"], candidates: ["1시간 이하", "2~3시간", "4~5시간", "6~7시간", "8시간 이상"], multipleAble: false, limit: 0, type: 1 },
    { id: 3, question: ["오늘 하루 커피를 몇 잔 마셨나요?"], candidates: ["0잔", "1잔", "2잔", "3잔 이상"], multipleAble: false, limit: 0, type: 1 },
    { id: 4, question: ["오늘 운동을 몇 시간 하셨나요?"], candidates: ["0시간", "1~2시간", "3시간 이상"], multipleAble: false, limit: 0, type: 1 },
    { id: 5, question: ["오늘 하루 동안 업무/공부 도중", "허리나 자세에 불편함을 느낀 적이 있나요?"], candidates: ["예", "아니오"], multipleAble: false, limit: 0, type: 1 },
    { id: 6, question: ["쿠잇 님은 오늘 언제 식사하셨나요?"], candidates: ["아침", "점심", "저녁"], multipleAble: true, limit: 3, type: 2 },
    { id: 7, question: ["쿠잇 님이 오늘 먹은", " 음식 종류를 선택해주세요."], candidates: ["한식", "일식", "중식", "양식", "기타"], multipleAble: true, limit: 3, type: 2 },
    { id: 8, question: ["쿠잇 님의 식사 시간은?"], candidates: ["규칙적이다.", "불규칙적이다."], multipleAble: false, limit: 0, type: 2 },
    { id: 9, question: ["한 끼 식사에 소요된 시간을 알려주세요."], candidates: ["10분 ~ 20분 미만", "20분 이상 ~ 1시간 미만", "1시간 이상"], multipleAble: false, limit: 0, type: 2 },
    { id: 10, question: ["식사를 할 때 소금이나 설탕 등", "조미료를 많이 섭취했나요?"], candidates: ["예", "아니오"], multipleAble: false, limit: 0, type: 2 },
    { id: 11, question: ["식사를 하는 데 ", "TV나 스마트폰을 함께 봤나요?"], candidates: ["예", "아니오"], multipleAble: false, limit: 0, type: 2 },
    { id: 12, question: ["오늘 하루 식사 중", "느낀 특이점이 있었나요?"], candidates: ["더부룩함", "복부 팽만", "식욕 저하", "폭식", "없음"], multipleAble: true, limit: 2, type: 2 },
    { id: 13, question: ["쿠잇 님은 오늘 몇 시간 주무셨나요?"], candidates: ["1시간 이하", "2~3시간", "4~5시간", "6~7시간", "8시간 이상"], multipleAble: false, limit: 0, type: 3 },
    { id: 14, question: ["오늘 아침에 느껴진", "피로도 정도를 체크해주세요."], candidates: ["매우 피곤함", "조금 피곤함", "조금 상쾌함", "매우 상쾌함"], multipleAble: false, limit: 0, type: 3 },
    { id: 15, question: ["오늘 하루,", "컨디션이 가장 최고인 시간은 언제였나요?"], candidates: ["오전5시~오전8시", "오전8시~오전10시", "오전10시~오후5시", "오후5시~오후10시", "오후10시~오전5"], multipleAble: false, limit: 0, type: 3 },
    { id: 16, question: ["오늘 수면 중 특이사항은 없었나요?"], candidates: ["꿈", "뒤척임", "몸살(오한)", "불면증", "없어요"], multipleAble: true, limit: 2, type: 3 }
];

// export const surveys: Survey[] = [
//     { id: 1, question: ["오늘의 근무(공부) 환경 및 시간은?"], candidates: ["규칙적이다.", "불규칙적이다."], multipleAble: false, limit: 0 },
//     { id: 2, question: ["오늘 하루 쉬는 시간 없이", "근무/공부에 집중한 시간은?"], candidates: ["1시간 이하", "2~3시간", "4~5시간", "6~7시간", "8시간 이상"], multipleAble: false, limit: 0 },
//     { id: 3, question: ["오늘 하루 커피를 몇 잔 마셨나요?"], candidates: ["0잔", "1잔", "2잔", "3잔 이상"], multipleAble: false, limit: 0 },
//     { id: 4, question: ["오늘 운동을 몇 시간 하셨나요?"], candidates: ["0시간", "1~2시간", "3시간 이상"], multipleAble: false, limit: 0 },
//     { id: 5, question: ["오늘 하루 동안 업무/공부 도중", "허리나 자세에 불편함을 느낀 적이 있나요?"], candidates: ["예", "아니오"], multipleAble: false, limit: 0 }
// ];

// export const surveysMeal: Survey[] = [
//     { id: 6, question: ["쿠잇 님은 오늘 언제 식사하셨나요?"], candidates: ["아침", "점심", "저녁"], multipleAble: true, limit: 3 },
//     { id: 7, question: ["쿠잇 님이 오늘 먹은", " 음식 종류를 선택해주세요."], candidates: ["한식", "일식", "중식", "양식", "기타"], multipleAble: true, limit: 3 },
//     { id: 8, question: ["쿠잇 님의 식사 시간은?"], candidates: ["규칙적이다.", "불규칙적이다."], multipleAble: false, limit: 0 },
//     { id: 9, question: ["한 끼 식사에 소요된 시간을 알려주세요."], candidates: ["10분 ~ 20분 미만", "20분 이상 ~ 1시간 미만", "1시간 이상"], multipleAble: false, limit: 0 },
//     { id: 10, question: ["식사를 할 때 소금이나 설탕 등", "조미료를 많이 섭취했나요?"], candidates: ["예", "아니오"], multipleAble: false, limit: 0 },
//     { id: 11, question: ["식사를 하는 데 ", "TV나 스마트폰을 함께 봤나요?"], candidates: ["예", "아니오"], multipleAble: false, limit: 0 },
//     { id: 12, question: ["오늘 하루 식사 중", "느낀 특이점이 있었나요?"], candidates: ["더부룩함", "복부 팽만", "식욕 저하", "폭식", "없음"], multipleAble: true, limit: 2 }
// ];

// export const surveysSleep: Survey[] = [
//     { id: 0, question: ["쿠잇 님은 오늘 몇 시간 주무셨나요?"], candidates: ["1시간 이하", "2~3시간", "4~5시간", "6~7시간", "8시간 이상"], multipleAble: false, limit: 0 },
//     { id: 1, question: ["오늘 아침에 느껴진", "피로도 정도를 체크해주세요."], candidates: ["매우 피곤함", "조금 피곤함", "조금 상쾌함", "매우 상쾌함"], multipleAble: false, limit: 0 },
//     { id: 2, question: ["오늘 하루,", "컨디션이 가장 최고인 시간은 언제였나요?"], candidates: ["오전5시~오전8시", "오전8시~오전10시", "오전10시~오후5시", "오후5시~오후10시", "오후10시~오전5"], multipleAble: false, limit: 0 },
//     { id: 3, question: ["오늘 수면 중 특이사항은 없었나요?"], candidates: ["꿈", "뒤척임", "몸살(오한)", "불면증", "없어요"], multipleAble: true, limit: 2 }
// ];



interface StoreState {
    currentQuestionIdx: number;
    // mealCurrentQuestionIdx: number;
    // sleepCurrentQuestionIdx: number;
    progressPercent: number;
    nextQuestion: () => void;
    previousQuestion: () => void;
    // nextQuestionMeal: () => void;
    // nextQuestionSleep: () => void;

}
// const navigate = useNavigate();
// function GoTo(location: string) {
//     console.log("Goto1");

//     navigate(location);
//     console.log("Goto3");

// }

export const useGlobalStoreSurvey = create<StoreState>((set, get) => ({
    currentQuestionIdx: 0,
    // mealCurrentQuestionIdx: 0,
    // sleepCurrentQuestionIdx: 0,
    progressPercent: 0,
    // useNavigateTo: null,
    nextQuestion: () => set((state) => {
        console.log("nextQuestion");
        const newProgressPercent = state.progressPercent + 5.88
        if (state.currentQuestionIdx < surveys.length - 1) {
            return { currentQuestionIdx: state.currentQuestionIdx + 1, progressPercent: newProgressPercent };
        } else {
            console.log("다함");
            return { progressPercent: newProgressPercent };
        }
    }),

    previousQuestion: () => set((state) => {
        console.log("previousQuestion" + state.currentQuestionIdx);

        const newProgressPercent = state.progressPercent - 5.88
        if (state.currentQuestionIdx > -1) {

            if (state.currentQuestionIdx == 0) {
                console.log("dailycheckstart로 navigate")
                return { currentQuestionIdx: state.currentQuestionIdx - 1, progressPercent: newProgressPercent };
            }
            else if (state.currentQuestionIdx == 6) {
                console.log("dailymealcheckstart로 navigate")
                //  GoTo('/dailymealcheckstart');
                return { currentQuestionIdx: state.currentQuestionIdx - 1, progressPercent: newProgressPercent };
            }
            else if (state.currentQuestionIdx == 12) {
                console.log("dailysleepcheckstart로 navigate")
                //    GoTo('/dailysleepcheckstart');
                return { currentQuestionIdx: state.currentQuestionIdx - 1, progressPercent: newProgressPercent };
            }
            return { currentQuestionIdx: state.currentQuestionIdx - 1, progressPercent: newProgressPercent };
        }

        else {
            console.log("다함");
            return { progressPercent: newProgressPercent };
        }

    }),

    // nextQuestionMeal: () => set((state) => {
    //     console.log("nextQuestionMeal");
    //     const newProgressPercent = state.progressPercent + 5.88
    //     if (state.currentQuestionIdx < surveysMeal.length - 1) {
    //         return { currentQuestionIdx: state.currentQuestionIdx + 1, progressPercent: newProgressPercent };
    //     } else {
    //         console.log("식사패턴 다함");
    //         return { progressPercent: newProgressPercent };
    //     }
    //     // if (state.mealCurrentQuestionIdx < surveysMeal.length - 1) {
    //     //     return { mealCurrentQuestionIdx: state.mealCurrentQuestionIdx + 1, progressPercent: newProgressPercent };
    //     // } else {
    //     //     console.log("식사패턴 다함");
    //     //     return { progressPercent: newProgressPercent };
    //     // }
    // }),
    // nextQuestionSleep: () => set((state) => {
    //     console.log("nextQuestionMeal");
    //     const newProgressPercent = state.progressPercent + 5.88
    //     if (state.sleepCurrentQuestionIdx < surveysSleep.length - 1) {
    //         return { sleepCurrentQuestionIdx: state.sleepCurrentQuestionIdx + 1, progressPercent: newProgressPercent };
    //     } else {
    //         console.log("수면패턴 다함");
    //         return { progressPercent: newProgressPercent };
    //     }
    // }),
}));

