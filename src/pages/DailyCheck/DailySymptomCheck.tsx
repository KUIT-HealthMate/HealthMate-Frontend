import { useEffect, useState } from "react";
import styles from "./survey/Survey.module.scss";
import { useGlobalStore } from "../../store/store";
import exclamationMark from "../../assets/exclamationMark.svg";

import { useNavigate } from "react-router-dom";
import ProgressBar from "./survey/ProgressBar";
import TopBarWithCancel from "../../components/organs/Bars/TopBarWithCancel";

import { OnBoardingResult } from "../../store/storeOnBoardingSurvey"
import { surveyAnswer, RequestResult } from "../../store/storeSurvey";
import { lifeStyleDto, mealPatternDto, sleepPatternDto, symptomDto, diagnosisRequestDto } from "../../dtos/dailycheck/dailyCheckDto";
import { useMutation } from 'react-query';
import { postDiagnosis } from "../../APIs/dailyCheck/dailCheckApi";

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

  const { setSymptoms } = OnBoardingResult();

  const { surveyAnswerList } = surveyAnswer();
  const { lifeStyle, mealPattern, sleepPattern, setLifeStyle, setMealPattern, setSleepPattern } = RequestResult();

  const postDiagnosisMutation = useMutation(postDiagnosis, {
    onMutate: () => { // 요청이 시작되면 '/loading' 띄움
      navigate('/loading');
    },
    onSuccess: (response) => {
      console.log('건강진단 정보 보내기 성공:', response);
      navigate(props.buttonNavigate);
    },
    onError: (error) => {
      console.error('건강진단 정보 보내기 실패:', error);
    },
  })
  //서버에 요청
  const requestServer = (symptomsInfosList: { symptomName: string }[]) => {

    const YEAR = new Date().getFullYear();
    const MONTH = String(new Date().getMonth() + 1).padStart(2, '0');
    const DAY = String(new Date().getDate()).padStart(2, '0');


    const requestData = {
      userName: "쿠잇",
      lifeStyleDto: lifeStyle,
      mealPatternDto: mealPattern,
      sleepPatternDto: sleepPattern,
      symptomInfos: symptomsInfosList,
      date: `${YEAR}-${MONTH}-${DAY}`
    }

    postDiagnosisMutation.mutate(requestData);

    //  navigate(props.buttonNavigate);

  }

  const setShowBottomBar = useGlobalStore((state) => state.setShowBottomBar);
  useEffect(() => {
    console.log("마운트됨");
    setShowBottomBar(false);
    return () => {
      setShowBottomBar(false);
    };
  }, [setShowBottomBar]);

  useEffect(() => {
    if (props.type === 1) {
      setSurveyAsForm();
    }
  }, [])




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


  //문제 idx로 requestName
  const lifeStyleKeys: (keyof lifeStyleDto)[] = ["environmentScore", "focusTimeScore", "coffeeConsumptionScore", "exerciseTimeScore", "postureDiscomfortScore"];
  const mealPatternKeys: (keyof mealPatternDto)[] = ["mealTimeScore", "foodType", "regularMealTimeScore", "mealDurationScore", "seasoningConsumptionScore", "screenUsage", "mealRemark"];
  const sleepPatternKeys: (keyof sleepPatternDto)[] = ["sleepDurationScore", "morningFatigueScore", "peakConditionTimeScore", "sleepRemarkScore"];

  const [symptomBtnActive, setSymptomBtnActive] = useState<boolean[][]>(
    symptomInfo.map((symptomDetail) =>
      Array(symptomDetail.symptoms.length).fill(false)
    )
  );




  // '다음으로' 클릭시 true인것들 store에 증상 반영
  function setSymtomsStore() {
    const checkedSymptomName = [];
    const newSymptomsInfos = [];

    // const checkedSymptomInfos: { symptomName: string }[] = [];

    for (let i = 0; i < symptomBtnActive.length; i++) {
      for (let j = 0; j < symptomBtnActive[i].length; j++) {
        if (symptomBtnActive[i][j] === true) {
          checkedSymptomName.push(symptomInfo[i].symptoms[j]);
          newSymptomsInfos.push({ "symptomName": symptomInfo[i].symptoms[j] })
        }
      }
    }
    if (props.type === 0) { //온보딩이면
      setSymptoms(checkedSymptomName);

    } else if (props.type === 1) { // 일일건강진단이면
      // 서버 요청
      requestServer(newSymptomsInfos);

    }
  }


  // 일일진단 설문 request 형식으로 변경
  function setSurveyAsForm() {
    console.log("setSurveyAsForm")


    // 설문 answer도 변경
    console.log("마지막! 이전 survey 결과: ", surveyAnswerList)

    for (let i = 0; i <= 4; i++) {
      const keyName = lifeStyleKeys[i];
      console.log("ketname: ", keyName, surveyAnswerList[i])
      setLifeStyle(keyName, surveyAnswerList[i]);
    }
    for (let i = 5; i <= 11; i++) {
      const keyName = mealPatternKeys[i - 5]
      setMealPattern(keyName, surveyAnswerList[i]);
    }
    for (let i = 12; i <= 15; i++) {
      const keyName = sleepPatternKeys[i - 12];
      setSleepPattern(keyName, surveyAnswerList[i]);
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

      return newState;
    });

  }

  const navigate = useNavigate();


  useEffect(() => {
    console.log("Updated LifeStyle: ", lifeStyle);
  }, [lifeStyle]);

  // useEffect(() => {
  //   console.log("symptomInfos 변경: ");
  // }, [symptomInfos]);


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

                if (props.type === 1) {
                  setSurveyAsForm()
                }

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
            setSymtomsStore();
            // navigate(props.buttonNavigate);

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
