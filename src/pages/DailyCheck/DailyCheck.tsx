import React, { useEffect, useState } from 'react';
import styles from "./DailyCheck.module.scss";
import { useGlobalStore } from '../../store/store';
import Survey from "../DailyCheck/survey/Survey";

import { useGlobalStoreSurvey, surveys } from '../../store/storeSurvey';
import { stat } from 'fs';

const DailyCheck = () => {
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
        currentQuestionIdx: state.currentQuestionIdx,
        nextQuestion: state.nextQuestion
    }));

    return (
        <div className={styles.surveyWrap}>

            <Survey questionCnt={surveys.length} questions={surveys[currentQuestionIdx].question} candidates={surveys[currentQuestionIdx].candidates} type={1} multipleAble={surveys[currentQuestionIdx].multipleAble}></Survey>

        </div>

    )
};

export default DailyCheck;