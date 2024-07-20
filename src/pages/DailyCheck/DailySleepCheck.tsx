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
        currentQuestionIdx: state.currentQuestionIdx,
        nextQuestion: state.nextQuestion
    }));

    return (

        <>

            <Survey questions={surveysSleep[currentQuestionIdx].question} candidates={surveysSleep[currentQuestionIdx].candidates}></Survey>

            {/* <div>{surveys[currentQuestionIdx].candidate}</div> */}

            {/* <button className={styles.NextButton} onClick={NextQuestion}><p className={styles.NextButtonText}>다음으로</p></button> */}

        </>

    )
};

export default DailySleepCheck;