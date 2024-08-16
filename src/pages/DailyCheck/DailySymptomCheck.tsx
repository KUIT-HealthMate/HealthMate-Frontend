import { useEffect, useState } from "react";
import styles from "./survey/Survey.module.scss";
import { useGlobalStore } from "../../store/store";
import exclamationMark from "../../assets/exclamationMark.svg";

import { useNavigate } from "react-router-dom";
import ProgressBar from "./survey/ProgressBar";
import TopBarWithCancel from "../../components/organs/Bars/TopBarWithCancel";
import { useOnBoardingSurveyStore, onBoardingSurveys, OnBoardingResult } from "../../store/storeOnBoardingSurvey"


interface symptomProps {
  title1: string;
  title2: string;

  buttonNavigatePass: string;
  buttonNavigate: string;

  findKeywordNavigate: string;

  progressPercent: number;
  type: number; //0이면 온보딩, 1이면 건강진단
}



const DailySymptomCheck = (props: symptomProps) => {

  const { symptoms, setSymptoms } = OnBoardingResult();

  console.log("findKeywordNavigate: ", props.findKeywordNavigate);
  const setShowBottomBar = useGlobalStore((state) => state.setShowBottomBar);
  useEffect(() => {
    console.log("마운트됨");
    setShowBottomBar(false);
    return () => {
      setShowBottomBar(false);
    };
  }, [setShowBottomBar]);
  const limit = 3;
  const symptomInfo = [
    {
      id: 0,
      title: "내과 관련 증상",
      symptoms: ["발열", "복통", "소화불량", "메스꺼움"],
    },
    { id: 1, title: "외과 관련 증상", symptoms: ["급성 복통"] },
    { id: 2, title: "산부인과 관련 증상", symptoms: ["생리불순"] },
    { id: 3, title: "신경과 관련 증상", symptoms: ["두통"] },
    {
      id: 4,
      title: "정신건강의학과 관련 증상",
      symptoms: ["불안", "우울", "충동"],
    },
    { id: 5, title: "피부과 관련 증상", symptoms: ["발진", "간지러움"] },
    { id: 6, title: "정형외과 관련 증상", symptoms: ["관절통"] },
    { id: 7, title: "신경외과 관련 증상", symptoms: ["척추통증"] },
    { id: 8, title: "흉부외과 관련 증상", symptoms: ["흉통", "호흡곤란"] },
    {
      id: 9,
      title: "안과 관련 증상",
      symptoms: ["시력저하", "충혈", "안구통증"],
    },
    { id: 10, title: "이비인후과 관련 증상", symptoms: ["목통증", "청력저하"] },
    { id: 11, title: "비뇨의학과 관련 증상", symptoms: ["비뇨 관련 문제"] },
    { id: 12, title: "치과 관련 증상", symptoms: ["치과", "잇몸출혈"] },
    // { id: 13, title: "기타 상태 ", symptoms: ["증상없음"] }
  ];

  const [symptomBtnActive, setSymptomBtnActive] = useState<boolean[][]>(
    symptomInfo.map((symptomDetail) =>
      Array(symptomDetail.symptoms.length).fill(false)
    )
  );

  // '다음으로' 클릭시 true인것들 store에 증상 반영
  function setSymtomsStore() {
    const checkedSymptomName = [];

    for (let i = 0; i < symptomBtnActive.length; i++) {
      for (let j = 0; j < symptomBtnActive[i].length; j++) {
        if (symptomBtnActive[i][j] === true) {
          checkedSymptomName.push(symptomInfo[i].symptoms[j]);
        }
      }
    }
    console.log("checkedSymptomName: ", checkedSymptomName)
    if (props.type === 0) { //온보딩이면
      setSymptoms(checkedSymptomName);
    }

  }


  function checkSymptom(symptom: number, symptomIdx: number) {
    const checkCnt = symptomBtnActive
      .flat()
      .filter((element) => element).length;
    console.log("체크된거수: " + checkCnt);

    if (checkCnt >= limit && !symptomBtnActive[symptom][symptomIdx]) {
      console.error("더 이상 선택 불가");
      return;
    }

    setSymptomBtnActive((prevState) => {
      const newState = prevState.map((arr) => [...arr]);
      newState[symptom][symptomIdx] = !newState[symptom][symptomIdx];
      console.log(symptomInfo[symptom].symptoms[symptomIdx]);
      //  const symptomName = symptomInfo[symptom].symptoms[symptomIdx];
      // symptoms.push(symptomName);
      return newState;
    });
    // console.log("symptoms: ", symptoms);
  }
  useEffect(() => { }, [symptomBtnActive]);
  const navigate = useNavigate();

  return (
    <>
      <TopBarWithCancel></TopBarWithCancel>
      <ProgressBar percent={props.progressPercent}></ProgressBar>
      <div className={styles.symptom}>
        <div className={styles.symptomTitle} style={{ marginTop: `75px` }}>
          {props.title1}
        </div>
        <div className={styles.symptomTitle}>{props.title2}</div>
        <div
          style={{
            color: `#F97F59`,
            marginTop: `14px`,
            marginLeft: `8.8%`,
            marginBottom: `91px`,
          }}
        >
          *복수선택 가능
        </div>

        {symptomInfo.map((symptomCategory, symptomCategoryIdx) => {
          return (
            <div className={styles.symptomInfo}>
              <div key={symptomCategoryIdx} className={styles.symptomCategory}>
                {symptomCategory.title}
              </div>
              <div className={styles.symptomNames}>
                {symptomCategory.symptoms.map((symptom, symptomIdx) => {
                  return (
                    <div
                      className={styles.symptomNameWrap}
                      onClick={() => {
                        checkSymptom(symptomCategoryIdx, symptomIdx);
                      }}
                      style={
                        symptomBtnActive[symptomCategoryIdx][symptomIdx]
                          ? {
                            background: `rgba(14, 148, 148, 0.1)`,
                            border: `1px solid #0E9494`,
                          }
                          : {}
                      }
                    >
                      <div
                        className={styles.symptomName}
                        style={
                          symptomBtnActive[symptomCategoryIdx][symptomIdx]
                            ? { color: `#0B7575` }
                            : {}
                        }
                      >
                        #{symptom}
                      </div>
                    </div>
                  );
                })}
              </div>
              {symptomCategoryIdx === 13 ? null : (
                <hr className={styles.divider}></hr>
              )}
            </div>
          );
        })}
        <div className={styles.findKeyword}>
          <div className={styles.findKeywordText}>
            <img src={exclamationMark} alt="exclaim"></img>
            <div
              onClick={() => {
                setSymtomsStore();
                navigate("/findkeyword", {
                  state: { value: props.findKeywordNavigate },
                })
              }
              }
            >
              찾는 키워드가 없나요?
            </div>
          </div>
          <hr className={styles.underLine}></hr>
        </div>

        <button
          className={styles.NextButton}
          style={{
            position: `fixed`,
            bottom: `88px`,
            background: `#F5F6F8`,
            border: `1px solid #DEDEDE`,
          }}
          onClick={() => navigate(props.buttonNavigatePass)}
        >
          <p className={styles.NextButtonText} style={{ color: `#8F8F8F` }}>
            건너뛰기
          </p>
        </button>
        <button
          className={styles.NextButton}
          style={{ position: `fixed`, bottom: `33px` }}
          onClick={() => {
            navigate(props.buttonNavigate);
            setSymtomsStore();
          }}
        >
          <p className={styles.NextButtonText}>다음으로</p>
        </button>
        <div className={styles.whiteSpace}></div>
      </div>
    </>
  );
};

export default DailySymptomCheck;
