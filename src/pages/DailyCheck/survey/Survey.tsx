import React, { useEffect, useState } from 'react';
import styles from './Survey.module.scss'
import DailyCheck from '../DailyCheck';
import { useGlobalStoreSurvey } from '../../../store/storeSurvey';

interface Props {
    questions: string[],
    candidates: string[]
}

const Survey = ({ questions, candidates }: Props) => {

    const { nextQuestion } = useGlobalStoreSurvey((state) => ({
        currentQuestionIdx: state.currentQuestionIdx,
        nextQuestion: state.nextQuestion
    }));

    const [btnActive, setBtnActive] = useState(candidates.map(candidate => false));

    function changeBtnColor(idx: number) {
        console.log(btnActive);
        setBtnActive(prevState => {
            const newState = [...prevState]
            newState[idx] = !newState[idx];
            console.log(newState);
            return newState;
        })
    }

    useEffect(() => { console.log(btnActive); }, [btnActive]);

    return (
        <div className={styles.survey}>
            <div className={styles.question}>
                {
                    questions.map((question, idx) => {
                        return (<div className={styles.questionText}>{question}</div>)
                    })
                }
            </div>

            <div className={styles.candidate}>
                {
                    candidates.map((candidate, idx) => {
                        return (
                            <div className={styles.candidateBox} onClick={() => changeBtnColor(idx)}
                                style={btnActive[idx] ? { background: `rgba(14, 148, 148, 0.1)`, color: `#0E9494` } : { background: `#FFFFFF`, color: `#8F8F8F` }}>
                                <div className={styles.candidateText} >{candidate}</div>
                            </div>
                        )
                    })
                }
            </div>
            <button className={styles.NextButton} onClick={nextQuestion}>
                <p className={styles.NextButtonText}>다음으로</p>
            </button>


        </div>
    )
};

export default Survey;