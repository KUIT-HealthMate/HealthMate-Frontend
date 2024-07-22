import React, { ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import s from "./SupplemenetChallengeActualAddingPage.module.scss";
import usePillInfoStore from '../../store/usePillInfoStore';
import pillInfo from '../../store/pillInfo';
import uuid from "react-uuid";

import leftBracket from "../../assets/leftBraket.svg";
import plusIconImg from "../../assets/plusIcon.svg";
import InputClearButtonImg from "../../assets/InputClearButton.svg"


const initPill = ():Omit<pillInfo, "id"> => {
  return {
    name: "", // 알약 이름
    intakeTime: { beforeOrAfterMeal:0, minutes:0}, // 섭취 시간 (식전 1 식후 2, 분 number로)
    dailyIntakePeriod: { breakfast: false, lunch: false, dinner: false  }, // 일 섭취 시기 (아침, 점심, 저녁)
    dailyIntakeRecord: { breakfast: false, lunch: false, dinner: false  },
    weeklyIntakeFrequency: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    }, // 주 섭취 횟수 (월 ~ 일)
    notificationTime: [{hour:0, minutes:0}] // 팝업 알림 시간 (19:30 이면 19, 30)
  }
}


const SupplemenetChallengeActualAddingPage = () => {
  const navigate = useNavigate();
  const { PillInfo, setPillInfo, setIntakeRecord, getIntakeRecord, getIntakeTime, getMealTime} = usePillInfoStore();

  let newPill: Omit<pillInfo, "id"> = initPill();

  // input 에서 이상한 값(특수문자 등) 이 들어오면 정규식 사용하여 걸러내는 기능 추가 예정

  const handlePillName = (value: string):void => {
    newPill.name = value;
  }

  const handleBeforeOrAfterMeal = (value: number): void => {
    newPill.intakeTime.beforeOrAfterMeal = value;
    console.log("z");

    (document.querySelectorAll('.' + s.smallButton) as NodeListOf<HTMLButtonElement>).forEach((button, index) => {

      if(index == (value-1)){
        button.style.background = "rgba(14, 148, 148, 0.1)";
        button.style.border = "1px solid #0E9494";
        button.style.color = "#0B7575";
      } else {
        button.style.background = "#f5f6f8";
        button.style.border = "1px solid #B3B3B3";
        button.style.color = "#B3B3B3";
      }
    })
  }

  const handleMealMinute = (value: string): void => {
    newPill.intakeTime.minutes = value as unknown as number;
  }

  const handleEatingTiming = (e: React.MouseEvent<HTMLButtonElement>, value:string): void => {
    newPill.dailyIntakePeriod = { ...newPill.dailyIntakePeriod, [value]: !(newPill.dailyIntakePeriod as any)[value] };
    changeButtonCSS(e);
  }

  const changeButtonCSS = (e: React.MouseEvent<HTMLButtonElement>) :void => {
    
  }

  const handleEatingDay = (e: React.MouseEvent<HTMLButtonElement>, value:string): void => {
    newPill.weeklyIntakeFrequency = { ...newPill.weeklyIntakeFrequency, [value]: !(newPill.weeklyIntakeFrequency as any)[value] };
    changeButtonCSS(e);
  }

  const handleChanges = ():void => {
    
    setPillInfo({...newPill, id:Math.ceil(Math.random() * 100)});
    newPill = initPill();
  }

  return (
    <div className={s.wrap}>
        <div className={s.statusBar}></div>
        <div className={s.header}>
            <div className={s.titleBar}>
                <button onClick={() => navigate(-1)}><img src={leftBracket} alt=""/></button>
                <div className={s.title}>알약 챌린지 추가</div>
            </div>
        </div>
        <div className={s.contentWrap}>
          <div className={s.detailDiv}>
            <span className={s.detailTitle} >알약 이름</span>
            <input type="text" placeholder='알약 이름을 입력해주세요' onChange={(e: ChangeEvent<HTMLInputElement>) => { handlePillName(e.target.value); }}/><button className={s.inputClearButton}><img src={InputClearButtonImg} alt="" /></button>
          </div>
          <div className={s.detailDiv}>
            <span className={s.detailTitle}>섭취 시간</span>
            <div className={s.beforeOrAfterMealWrap}>
              <button type="button" className={s.smallButton} onClick={() => handleBeforeOrAfterMeal(1)}>식전</button>
              <button type="button" className={s.smallButton} onClick={() => handleBeforeOrAfterMeal(2)}>식후</button>
              <input type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => { handleMealMinute(e.target.value); }}/><button className={s.inputClearButton}><img src={InputClearButtonImg} alt="" /></button>
              <span>분 이내</span>
            </div>
          </div>
          <div className={s.detailDiv}>
            <span className={s.detailTitle}>일 섭취 시기</span>
            <div className={s.eatingTimeButtonWrap}>
              <button type="button" className={s.smallButton} onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleEatingTiming(e,"breakfast")}>아침</button>
              <button type="button" className={s.smallButton} onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleEatingTiming(e,"lunch")}>점심</button>
              <button type="button" className={s.smallButton} onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleEatingTiming(e,"dinner")}>저녁</button>
            </div>
          </div>
          <div className={s.detailDiv}>
            <span className={s.detailTitle}>주 섭취 횟수</span>
            <div className={s.weekDayButtonWrap}>
              <button type="button" className={s.bigButton} onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleEatingDay(e,"monday")}>월</button>
              <button type="button" className={s.bigButton} onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleEatingDay(e,"tuesday")}>화</button>
              <button type="button" className={s.bigButton} onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleEatingDay(e,"wednesday")}>수</button>
              <button type="button" className={s.bigButton} onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleEatingDay(e,"thursday")}>목</button>
              <button type="button" className={s.bigButton} onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleEatingDay(e,"friday")}>금</button>
              <button type="button" className={s.bigButton} onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleEatingDay(e,"saturday")}>토</button>
              <button type="button" className={s.bigButton} onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleEatingDay(e,"sunday")}>일</button>
            </div>
          </div>
          <div className={s.detailDiv}>
            <div className={s.messengerAlarmHeader}>
              <span className={s.detailTitle}>키키오톡 알림 시간</span>
              <button type="button" className={s.plusButton}><img src={plusIconImg} alt="" /></button>
            </div>
            <div className={s.messengerAlarmBody}>
              <span></span>
            </div>
          </div>
          <button type="button" className={s.completeButton} onClick={() => handleChanges()}>완료</button>
          <div className={s.bottomBarCover}></div>
        </div>
    </div>
  )
}

export default SupplemenetChallengeActualAddingPage