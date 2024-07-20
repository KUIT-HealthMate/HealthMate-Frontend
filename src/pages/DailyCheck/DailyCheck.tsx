import React, { useEffect, useState } from 'react';
import styles from "./DailyCheck.module.scss";
import { useGlobalStore } from '../../store/store';
import GreenButton from '../../components/organs/GreenButton';
import Survey from "../DailyCheck/survey/Survey";
//import { DailyCheckProvider } from './DailyCheckProvider';
import { useGlobalStoreSurvey, surveys } from '../../store/storeSurvey';


// const surveys = [
//     { id: 0, question: ["오늘의 근무(공부) 환경 및 시간은?"], candidates: ["규칙적이다.", "불규칙적이다."] },
//     { id: 1, question: ["오늘 하루 쉬는 시간 없이", "근무/공부에 집중한 시간을 알려주세요."], candidates: ["1시간 이하", "2~3시간", "4~5시간", "6~7시간", "8시간 이상"] }
// ]


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


    //const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

    // const NextQuestion = () => {
    //     if (currentQuestionIdx < surveys.length - 1) {
    //         setCurrentQuestionIdx(currentQuestionIdx + 1);
    //     } else {
    //         console.log("다함");ㄴ
    //     }
    // }

    return (

        <>

            <Survey questions={surveys[currentQuestionIdx].question} candidates={surveys[currentQuestionIdx].candidates}></Survey>

            {/* <div>{surveys[currentQuestionIdx].candidate}</div> */}

            {/* <button className={styles.NextButton} onClick={NextQuestion}><p className={styles.NextButtonText}>다음으로</p></button> */}

        </>

    )
};

export default DailyCheck;