import React, { useEffect, useState } from 'react';
import styles from "./DailyCheck.module.scss";
import { useGlobalStore } from '../../store/store';
import Survey from "../DailyCheck/survey/Survey";

import { useGlobalStoreSurvey, surveysSleep } from '../../store/storeSurvey';



const DailySleepCheck = () => {
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
        currentQuestionIdx: state.sleepCurrentQuestionIdx,
        nextQuestion: state.nextQuestionSleep
    }));

    return (

        <>
            <Survey questionCnt={surveysSleep.length} questions={surveysSleep[currentQuestionIdx].question} candidates={surveysSleep[currentQuestionIdx].candidates} type={3}></Survey>
        </>

    )
};

export default DailySleepCheck;