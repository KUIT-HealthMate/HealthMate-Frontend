import React, { ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import s from "./PillAddingPage.module.scss";
import usePillInfoStore from '../../../store/usePillInfoStore';
import pillInfo from '../../../store/pillInfo';
import uuid from "react-uuid";

import leftBracket from "../../../assets/leftBraket.svg";
import plusIconImg from "../../../assets/plusIcon.svg";
import InputClearButtonImg from "../../../assets/InputClearButton.svg"


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

  const handlePillName = (inputElement: HTMLInputElement):void => {
    const filteredValue = inputElement.value.replace(/[^a-zA-Zㄱ-ㅎ가-힣]/g, '');
    inputElement.value = filteredValue;
    newPill.name = filteredValue;
  }

  const handleBeforeOrAfterMeal = (value: number): void => {
    newPill.intakeTime.beforeOrAfterMeal = value;
  }

  const handleMealMinute = (inputElement: HTMLInputElement): void => {
    const filteredValue = inputElement.value.replace(/[^0-9]/g, '');
    inputElement.value = filteredValue;
    newPill.intakeTime.minutes = filteredValue as unknown as number;
  }

  const handleEatingTiming = (e: ChangeEvent<HTMLInputElement>, value:string): void => {
    newPill.dailyIntakePeriod = { ...newPill.dailyIntakePeriod, [value]: !(newPill.dailyIntakePeriod as any)[value] };
    
  }

  

  const handleEatingDay = (e: ChangeEvent<HTMLInputElement>, value:string): void => {
    newPill.weeklyIntakeFrequency = { ...newPill.weeklyIntakeFrequency, [value]: !(newPill.weeklyIntakeFrequency as any)[value] };
    
  }

  const handleChanges = ():void => {
    setPillInfo({...newPill, id:uuid() });
    console.log({...newPill, id:uuid() });
    navigate(-1);
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
            <input type="text" placeholder='알약 이름을 입력해주세요' onChange={(e: ChangeEvent<HTMLInputElement>) => { handlePillName(e.target); }}/><button className={s.inputClearButton}><img src={InputClearButtonImg} alt="" /></button>
          </div>
          <div className={s.detailDiv}>
            <span className={s.detailTitle}>섭취 시간</span>
            <div className={s.beforeOrAfterMealWrap}>
              <input type="radio" name='beforeOrAfterMeal' id="before" onChange={() => handleBeforeOrAfterMeal(1)}/>
              <label htmlFor="before" className={s.smallButton} >식전</label>
              <input type="radio" name='beforeOrAfterMeal' id="after" onChange={() => handleBeforeOrAfterMeal(2)}/>
              <label htmlFor="after" className={s.smallButton} >식후</label>
              <input type="number" onChange={(e: ChangeEvent<HTMLInputElement>) => { handleMealMinute(e.target); }}/><button className={s.inputClearButton}><img src={InputClearButtonImg} alt="" /></button>
              <span>분 이내</span>
            </div>
          </div>
          <div className={s.detailDiv}>
            <span className={s.detailTitle}>일 섭취 시기</span>
            <div className={s.eatingTimeButtonWrap}>
              <input type="checkbox" id="morning" onChange={(e:ChangeEvent<HTMLInputElement>) => handleEatingTiming(e,"breakfast")}/>
              <label htmlFor="morning" className={s.smallButton}>아침</label>
              <input type="checkbox" id="afternoon" onChange={(e:ChangeEvent<HTMLInputElement>) => handleEatingTiming(e,"lunch")}/>
              <label htmlFor="afternoon" className={s.smallButton}>점심</label>
              <input type="checkbox" id="evening" onChange={(e:ChangeEvent<HTMLInputElement>) => handleEatingTiming(e,"dinner")}/>
              <label htmlFor="evening" className={s.smallButton}>저녁</label>
            </div>
          </div>
          <div className={s.detailDiv}>
            <span className={s.detailTitle}>주 섭취 횟수</span>
            <div className={s.weekDayButtonWrap}>
              <input type="checkbox" id="mon" onChange={(e:ChangeEvent<HTMLInputElement>) => handleEatingDay(e,"monday")}/>
              <label htmlFor="mon" className={s.bigButton}>월</label>
              <input type="checkbox" id="tue" onChange={(e:ChangeEvent<HTMLInputElement>) => handleEatingDay(e,"tuesday")}/>
              <label htmlFor="tue" className={s.bigButton}>화</label>
              <input type="checkbox" id="wed" onChange={(e:ChangeEvent<HTMLInputElement>) => handleEatingDay(e,"wednesday")}/>
              <label htmlFor="wed" className={s.bigButton}>수</label>
              <input type="checkbox" id="thu" onChange={(e:ChangeEvent<HTMLInputElement>) => handleEatingDay(e,"thursday")}/>
              <label htmlFor="thu" className={s.bigButton}>목</label>
              <input type="checkbox" id="fri" onChange={(e:ChangeEvent<HTMLInputElement>) => handleEatingDay(e,"friday")}/>
              <label htmlFor="fri" className={s.bigButton}>금</label>
              <input type="checkbox" id="sat" onChange={(e:ChangeEvent<HTMLInputElement>) => handleEatingDay(e,"saturday")}/>
              <label htmlFor="sat" className={s.bigButton}>토</label>
              <input type="checkbox" id="sun" onChange={(e:ChangeEvent<HTMLInputElement>) => handleEatingDay(e,"sunday")}/>
              <label htmlFor="sun" className={s.bigButton}>일</label>
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