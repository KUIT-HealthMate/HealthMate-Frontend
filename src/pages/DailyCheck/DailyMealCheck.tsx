import React, { useEffect, useState } from 'react';
import styles from "./DailyCheck.module.scss";
import { useGlobalStore } from '../../store/store';
import Survey from "../DailyCheck/survey/Survey";

import { useGlobalStoreSurvey, surveysMeal } from '../../store/storeSurvey';



const DailyMealCheck = () => {
    const setShowBottomBar = useGlobalStore((state) => state.setShowBottomBar);
    useEffect(() => {
        console.log("마운트됨")
        setShowBottomBar();
        return () => {
            setShowBottomBar();
        };
    }, [setShowBottomBar]
    );



    const { currentQuestionIdx, nextQuestion } = useGlobalStoreSurvey((state) => ({
        currentQuestionIdx: state.mealCurrentQuestionIdx,
        nextQuestion: state.nextQuestionMeal
    }));

    return (
        <>
            <Survey questionCnt={surveysMeal.length} questions={surveysMeal[currentQuestionIdx].question} candidates={surveysMeal[currentQuestionIdx].candidates} type={2} multipleAble={surveysMeal[currentQuestionIdx].multipleAble} limit={surveysMeal[currentQuestionIdx].limit} ></Survey>
        </>

    )
};

export default DailyMealCheck;