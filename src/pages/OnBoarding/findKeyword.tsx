import styles from "./findKeyword.module.scss";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useGlobalStore } from "../../store/store";
import React, { useEffect, useState } from "react";
import TopBarWithBackBtn from "../../components/organs/Bars/TopBarWithBackBtn";

import { OnBoardingResult } from "../../store/storeOnBoardingSurvey"

export const FindKeyword = () => {
  const location = useLocation();
  const navigateText = location.state.value;

  console.log(navigateText);
  const setShowBottomBar = useGlobalStore((state) => state.setShowBottomBar);
  useEffect(() => {
    setShowBottomBar(false);
    return () => {
      setShowBottomBar(false);
    };
  }, [setShowBottomBar]);

  const navigate = useNavigate();

  const { symptoms, setSymptoms } = OnBoardingResult();
  const [symptomValue, setSymptomValue] = useState('');

  function addSymptoms(symptomName: string) {
    console.log("기존 체크한 증상: ", symptoms);
    const newSymptoms = symptoms;
    newSymptoms.push(symptomName);
    setSymptoms(newSymptoms);
  }

  const saveSymptomName = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("입력한거: ", e.target.value)
    setSymptomValue(e.target.value);
  }

  return (
    <div className={styles.findKeyword}>
      <TopBarWithBackBtn></TopBarWithBackBtn>
      <div className={styles.findKeywordWrap}>
        <div className={styles.findKeywordText}>어떤 증상을</div>
        <div className={styles.findKeywordText}>겪고 계신가요?</div>
        <input
          className={styles.findKeywordInput}
          placeholder="증상을 입력해주세요."
          type="text"
          value={symptomValue}
          onChange={saveSymptomName}
        ></input>
      </div>
      <button
        className={styles.NextButton}
        onClick={() => {
          navigate(navigateText);
          addSymptoms(symptomValue);

        }}
      >
        <p className={styles.NextButtonText}>다음으로</p>
      </button>
    </div>
  );
};
