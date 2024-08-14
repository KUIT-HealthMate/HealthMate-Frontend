import styles from "./OnBoarding.module.scss";
import ProgressBar from "../DailyCheck/survey/ProgressBar";
import purpose1 from "../../assets/onboarding/purpose1.svg";
import purpose2 from "../../assets/onboarding/purpose2.svg";
import purpose3 from "../../assets/onboarding/purpose3.svg";
import purpose4 from "../../assets/onboarding/purpose4.svg";
import purpose5 from "../../assets/onboarding/purpose5.svg";
import purpose6 from "../../assets/onboarding/purpose6.svg";
import { useGlobalStore } from "../../store/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBarWithCancel from "../../components/organs/Bars/TopBarWithCancel";
import { OnBoardingResult } from "../../store/storeOnBoardingSurvey";

import { postOnBoarding } from "../../APIs/onBoarding/onBoardingApi";
import { useMutation } from 'react-query';

interface onBoardingRequestDto {
  gender: number,
  ageGroup: number,
  symptoms: string[],
  purpose: 1
}


const purposeButtons = [
  { icon: purpose1, text: "루틴" },
  { icon: purpose2, text: "질환 예방" },
  { icon: purpose3, text: "정보 공유" },
  { icon: purpose4, text: "건강상태 파악" },
  { icon: purpose5, text: "약 복용 관리" },
  { icon: purpose6, text: "생활습관 관리" },
];

const OnBoardingCheckPurpose = () => {
  const { gender, ageGroup, symptoms, purposes, setPurposes } = OnBoardingResult();
  const setShowBottomBar = useGlobalStore((state) => state.setShowBottomBar);
  useEffect(() => {
    console.log("마운트됨");
    setShowBottomBar(false);
    return () => {
      setShowBottomBar(false);
    };
  }, [setShowBottomBar]);

  const postOnBoardingMutation = useMutation(postOnBoarding, {
    onSuccess: (response) => {
      console.log('온보딩 정보 보내기 성공:', response);
    },
    onError: (error) => {
      console.error('온보딩 정보 보내기 실패:', error);
    },
  })



  const [purposeCheck, setPurposeCheck] = useState(
    purposeButtons.map((purposeButton) => false)
  );

  console.log(purposeCheck);

  function changeBtnColor(idx: number) {
    setPurposeCheck((prevState) => {
      const newState = [...prevState];
      newState[idx] = !newState[idx];
      console.log(newState);
      return newState;
    });
  }

  function handleClick(idx: number) {
    //2개 이상 복수선택 막음
    const trueCnt = purposeCheck.filter((element) => element).length;
    console.log(trueCnt);
    console.log(purposeCheck[idx]);
    if (trueCnt >= 2 && !purposeCheck[idx]) {
      console.log("2개 이상 선택 불가");
      return;
    }
    changeBtnColor(idx);
  }

  //'다음으로' 누르면 store 저장 & 서버 전송
  function setPurposeStore() {
    const checkedPurposeId = [];

    for (let i = 0; i < purposeCheck.length; i++) {
      if (purposeCheck[i] === true) {
        checkedPurposeId.push(i)
      }
    }
    console.log("purposeCheck: ", checkedPurposeId)
    console.log(OnBoardingResult)
    setPurposes(checkedPurposeId);

    const requestData = {
      gender: gender,
      ageGroup: ageGroup,
      symptoms: symptoms,
      purpose: 1,
    }

    //서버 전송

    postOnBoardingMutation.mutate(requestData);


  }


  const navigate = useNavigate();
  return (
    <>
      <TopBarWithCancel></TopBarWithCancel>
      {/* <div className={styles.backButton} onClick={() => navigate(-1)}>
                <img style={{ width: `8.89px`, height: `16px` }} src={leftBracket} />
            </div> */}
      <ProgressBar percent={75}></ProgressBar>
      <div className={styles.purposeTop}>
        <div className={styles.purposeTitle}>어떤 목적으로</div>
        <div className={styles.purposeTitle}>헬스메이트를 찾아주셨나요?</div>

        <div className={styles.purposeText}>
          쿠잇 님의 목적에 맞는 건강 정보를 알려드려요
        </div>
      </div>

      <div className={styles.icons}>
        {purposeButtons.map((purposeButton, idx) => {
          return (
            <div className={styles.iconBox}>
              <div
                className={styles.iconWrap}
                onClick={() => {
                  handleClick(idx);
                }}
                style={
                  purposeCheck[idx] === true
                    ? {
                      background: `rgba(14, 148, 148, 0.1)`,
                      color: `#0E9494`,
                      border: `1px solid #0E9494`,
                    }
                    : {}
                }
              >
                <img
                  className={styles.iconImage}
                  src={purposeButton.icon}
                  alt="icon"
                ></img>
              </div>
              <div className={styles.iconText}>{purposeButton.text}</div>
            </div>
          );
        })}
      </div>

      <button
        className={styles.NextButton}
        disabled={
          purposeCheck.filter((element) => element).length > 0 ? false : true
        }
        onClick={() => {
          navigate("/welcome");
          setPurposeStore();
        }}
        style={
          purposeCheck.filter((element) => element).length > 0
            ? { position: `fixed`, bottom: `33px` }
            : {
              position: `fixed`,
              bottom: `33px`,
              background: `#F5F6F8`,
              color: `#8F8F8F`,
            }
        }
      >
        <p className={styles.NextButtonText}>다음으로</p>
      </button>
    </>
  );
};

export default OnBoardingCheckPurpose;
