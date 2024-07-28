import React, { useEffect, useState } from 'react';
import styles from './Survey.module.scss'
import ProgressBar from './ProgressBar';
import { useGlobalStoreSurvey } from '../../../store/storeSurvey';
import { useNavigate } from 'react-router-dom';

interface Props {
    questionCnt: number,
    questions: string[],
    candidates: string[],
    type: number // 1: 생활습관 2: 식사습관 3: 수면습관
    multipleAble: boolean, // 복수선택 가능 여부
    limit: number
    //  progressPercent: number // 진행률
}

const Survey = ({ questionCnt, questions, candidates, type, multipleAble, limit }: Props) => {

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


        setBtnActive(prevState => {
            console.log("setBtnDefault");
            console.log(prevState);

            const newState = prevState.map(() => false);
            return newState;

        })
    }

    const navigate = useNavigate();

    function handleButtonClick(idx: number, multipleAble: boolean) {
        if (!multipleAble) { //복수 선택 불가
            const newArr = Array(candidates.length).fill(false);
            setBtnActive(newArr);
        }

        else {
            // 체크한거 수 세서 >limit 면 changeBtnColor X
            const trueCnt = btnActive.filter(element => element).length;
            if (trueCnt >= limit && !btnActive[idx]) {
                console.error("더 이상 선택 불가");
                return
            }
            console.log("trueCnt: " + trueCnt);
            console.log(btnActive)
        }
        changeBtnColor(idx)
    }

    function handleClick() {
        console.log("handleClick")

        if (!NextButtonActive()) {
            return;
        }

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
                navigate('/dailysymptomcheckstart')
            }
        }

    }

    function NextButtonActive() {
        if (btnActive.some(isActive => isActive)) {

            return true;
        } else {
            return false;
        }

    }

    useEffect(() => { console.log("useeffect_Survey"); }, [btnActive]);

    return (
        <>
            <ProgressBar></ProgressBar>
            <div className={styles.survey}>
                <div className={styles.question}>
                    {
                        questions.map((question, idx) => {
                            return (<div className={styles.questionText}>{question}</div>)
                        })
                    }
                </div>
                {multipleAble ? <div style={{ color: `#F97F59`, marginTop: `14px`, marginLeft: `8.8%` }}>*복수선택 가능</div> : null}

                <div className={styles.candidate} style={candidates.length <= 2 ? { flexDirection: `row`, width: `82%`, marginLeft: `9%` } : { flexDirection: `column` }}>
                    {
                        candidates.map((candidate, idx) => {
                            return (
                                <div className={styles.candidateBox} onClick={() => { handleButtonClick(idx, multipleAble) }}
                                    style={btnActive[idx] ? { background: `rgba(14, 148, 148, 0.1)`, color: `#0E9494`, border: `1px solid #0E9494` } : { background: `#FFFFFF`, color: `#8F8F8F` }}>
                                    <div className={styles.candidateText} >{candidate}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <button className={styles.NextButton} onClick={handleClick} style={NextButtonActive() ? {} : { background: `#F5F6F8`, border: `1px solid #DEDEDE` }}>
                    <p className={styles.NextButtonText} style={NextButtonActive() ? {} : { color: `#8F8F8F` }}>다음으로</p>
                </button>


            </div>
        </>
    )
};

export default Survey;