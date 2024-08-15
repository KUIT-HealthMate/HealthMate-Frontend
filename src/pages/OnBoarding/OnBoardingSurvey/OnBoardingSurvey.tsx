import { useOnBoardingSurveyStore, onBoardingSurveys, OnBoardingResult } from "../../../store/storeOnBoardingSurvey";
import ProgressBar from "../../DailyCheck/survey/ProgressBar";
import { ActiveButton } from "../../../components/atoms/buttons/ActiveButton";
import { InActiveButton } from "../../../components/atoms/buttons/InActiveButton";
import { useGlobalStore } from "../../../store/store";
import { useEffect, useState } from "react";
import styles from "./OnBoardingSurvey.module.scss";
import { useNavigate } from "react-router-dom";

export const OnBoardingSurvey = () => {

    const setShowBottomBar = useGlobalStore((state) => state.setShowBottomBar);
    useEffect(() => {
        console.log("마운트됨");
        setShowBottomBar(false);
        return () => {
            setShowBottomBar(false);
        };
    }, [setShowBottomBar]);


    const currentQuestionIdx = useOnBoardingSurveyStore((state) => state.currentQuestionIdx);
    const nextQuestion = useOnBoardingSurveyStore((state) => state.nextQuestion);


    const question = onBoardingSurveys[currentQuestionIdx];
    const [selectBtnActive, setSelectBtnActive] = useState(
        question.candidates.map((candidate) => false)
    );

    // = OnBoardingResult((state) => state.setGender);
    const { gender, setGender, ageGroup, setAgeGroup } = OnBoardingResult();

    // 선지 선택시 렌더링
    useEffect(() => {
    }, [selectBtnActive]);

    function handleClick(idx: number) {
        console.log(idx)
        changeBtnColor(idx);
    }

    function changeBtnColor(idx: number) {
        setSelectBtnActive((prevState) => {

            //취소
            if (prevState[idx] === true) {
                const newState = [...prevState];
                newState[idx] = !newState[idx];
                return newState;
            } else { //다른거 선택
                const newState = question.candidates.map((candidate) => false); // 선지 상태
                newState[idx] = !newState[idx];
                return newState;
            }

        })
    }

    const navigate = useNavigate();

    function handleNextBtnClick(questionIdx: number) {
        console.log("다음으로")

        //선택지
        const resultIdx = selectBtnActive.findIndex(element => element === true)
        console.log("resultIdx: ", resultIdx);
        if (questionIdx === 0) {
            setGender(resultIdx);
        } else if (questionIdx === 1) {
            setAgeGroup(resultIdx);
        }

        console.log(gender);
        console.log(ageGroup);

        // 초기화
        setSelectBtnActive((prevState) => {
            const newState = question.candidates.map((candidate) => false);
            return newState;
        })


        if (currentQuestionIdx < 1) {
            nextQuestion();
        }
        else {
            navigate("/onboarding_checksymptom");
        }

    }

    return (
        <>
            <ProgressBar percent={(currentQuestionIdx) * 25}></ProgressBar>
            <div className={styles.onBoardingSurvey}>
                <div className={styles.TitleWrap}>
                    <div className={styles.TitleText}>{question.title}</div>
                    <div className={styles.TitleSubText} style={question.subtitle === "" ? { height: `0`, padding: `0` } : {}}>{question.subtitle}</div>
                </div>
                <div className={styles.CandidateWrap} style={question.candidates.length <= 2
                    ? { flexDirection: `row`, gap: `9px` }
                    : {}
                } >
                    {question.candidates.map((candidate, idx) => {
                        return (
                            <div className={styles.CandidateBox} onClick={() => { handleClick(idx) }}
                                style={selectBtnActive[idx] === true ?
                                    { border: `1px solid #0E9494`, background: `rgba(14, 148, 148, 0.1)`, color: `#0E9494` } : {}}>
                                <div className={styles.Candidate}>
                                    {candidate}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {selectBtnActive.filter((element) => element).length > 0
                ?
                <div onClick={() => { handleNextBtnClick(currentQuestionIdx) }}>
                    <ActiveButton text="다음으로" />
                </div>
                : <div>
                    <InActiveButton text="다음으로" />
                </div >
            }

        </>
    )
}


