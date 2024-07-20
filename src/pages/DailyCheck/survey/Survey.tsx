import React, { useEffect, useState } from 'react';
import styles from './Survey.module.scss'
import DailyCheck from '../DailyCheck';
import { useGlobalStoreSurvey } from '../../../store/storeSurvey';
import { useNavigate } from 'react-router-dom';

interface Props {
    questionCnt: number,
    questions: string[],
    candidates: string[],
    type: number // 1: 생활습관 2: 식사습관 3: 수면습관
    multipleAble: boolean // 복수선택 가능 여부
}

const Survey = ({ questionCnt, questions, candidates, type, multipleAble }: Props) => {
    console.log(questionCnt)


    const nextQuestion = useGlobalStoreSurvey((state) => ({
        currentQuestionIdx: state.currentQuestionIdx,
        mealCurrentQuestionIdx: state.mealCurrentQuestionIdx,
        sleepCurrentQuestionIdx: state.sleepCurrentQuestionIdx,
        nextQuestion: state.nextQuestion,
        nextQuestionMeal: state.nextQuestionMeal,
        nextQuestionSleep: state.nextQuestionSleep

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

    function setBtnDefault() {
        console.log("setBtnDefault");
        setBtnActive(prevState => {
            const newState = prevState.map(() => false);
            return newState;
        })
    }

    const navigate = useNavigate();

    function handleClick() {
        console.log("handleClick")

        setBtnDefault();

        if (type == 1) {
            nextQuestion.nextQuestion();
            if (nextQuestion.currentQuestionIdx >= questionCnt - 1) {
                navigate('/dailymealcheckstart')
            }
        } else if (type == 2) {
            nextQuestion.nextQuestionMeal();
            if (nextQuestion.mealCurrentQuestionIdx >= questionCnt - 1) {
                navigate('/dailysleepcheckstart')
            }
        } else {
            nextQuestion.nextQuestionSleep();
            if (nextQuestion.sleepCurrentQuestionIdx >= questionCnt - 1) {
                navigate('/')
            }
        }

    }

    useEffect(() => { console.log("useeffect"); }, [btnActive]);

    return (
        <div className={styles.survey}>
            <div className={styles.question}>
                {
                    questions.map((question, idx) => {
                        return (<div className={styles.questionText}>{question}</div>)
                    })
                }
            </div>
            {multipleAble ? <div style={{ color: `#F97F59`, marginTop: `14px`, marginLeft: `8.8%` }}>*복수선택 가능</div> : null}

            <div className={styles.candidate} style={candidates.length <= 2 ? { flexDirection: `row`, width: `82%` } : { flexDirection: `column` }}>
                {
                    candidates.map((candidate, idx) => {
                        return (
                            <div className={styles.candidateBox} onClick={() => { changeBtnColor(idx) }}
                                style={btnActive[idx] ? { background: `rgba(14, 148, 148, 0.1)`, color: `#0E9494`, border: `1px solid #0E9494` } : { background: `#FFFFFF`, color: `#8F8F8F` }}>
                                <div className={styles.candidateText} >{candidate}</div>
                            </div>
                        )
                    })
                }
            </div>
            <button className={styles.NextButton} onClick={handleClick}>
                <p className={styles.NextButtonText}>다음으로</p>
            </button>


        </div>
    )
};

export default Survey;