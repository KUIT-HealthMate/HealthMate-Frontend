import React, { ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import s from "./PillManagePage.module.scss";
import { usePillInfoStore } from "../../../store/usePillInfoStore";


import pillInfo from "../../../store/pillInfo";
import uuid from "react-uuid";
import { useState } from "react";
import { useGlobalStore } from "../../../store/store";
import { useEffect } from "react";

import leftBracket from "../../../assets/leftBraket.svg";


import InputClearButtonImg from "../../../assets/InputClearButton.svg";
import AlarmTimeInputModal from "./components/AlarmTimeInputModal";
import NameInputSection from "./components/NameInputSection";
import IntakeTimeSection from "./components/IntakeTimeSection";
import IntakePeriodSection from "./components/IntakePeriodSection";
import IntakeDaySection from "./components/IntakeDaySection";
import AlarmTimeSection from "./components/AlarmTimeSection";


const initPill = (): Omit<Omit<pillInfo, "id">, "notificationTime"> => {
  return {
    name: "", // 알약 이름
    intakeTime: { beforeOrAfterMeal: 0, minutes: 0 }, // 섭취 시간 (식전 1 식후 2, 분 number로)
    dailyIntakePeriod: { breakfast: false, lunch: false, dinner: false }, // 일 섭취 시기 (아침, 점심, 저녁)
    dailyIntakeRecord: { breakfast: false, lunch: false, dinner: false },
    weeklyIntakeFrequency: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    }, // 주 섭취 횟수 (월 ~ 일)
    //notificationTime: [{ hour: 0, minutes: 0 }], // 팝업 알림 시간 (19:30 이면 19, 30)
  };
};

const PillEditingPage = () => {

  //하단 바 안보이게
  const setShowBottomBar = useGlobalStore((state) => state.setShowBottomBar);
  useEffect(() => {
    console.log("마운트됨");
    setShowBottomBar();
    return () => {
      setShowBottomBar();
    };
  }, [setShowBottomBar]);

  const navigate = useNavigate();

  const { PillInfo, setPillInfo, getPillCopy, setPill } = usePillInfoStore();

  //notificationTime은 화면에 계속 렌더링되어야 하므로 분리하여 state로 관리
  const [newPill, setNewPill] = useState<Omit<Omit<pillInfo, "id">, "notificationTime">>(initPill);

  //새로 추가하는 화면인지, 편집하는 화면인지를 구분함.
  let isAddingNewPill: boolean;

  //편집하는 화면이라면, 어떤 id의 pill을 편집하는지에 대한 정보.
  const alreadyExistingPillId: string = useParams().id as string;
  const [editingPillId, setEditingPillId] = useState<string>(alreadyExistingPillId);

  // 분리된 notificationTime
  const [alarmTime, setAlarmTime] = useState<
    { hour: number; minutes: number }[]
  >([]);

  // 알림톡 시간을 위한 모달창. true 시 모달창이 표시됨.
  const [modal, setModal] = useState(false);

  if (alreadyExistingPillId == undefined) {
    isAddingNewPill = true;
  } else {
    isAddingNewPill = false;
  }


  useEffect(() => {
    if(!isAddingNewPill){
      // notificationTime 속성을 분리한다.
      const { notificationTime, ...rest } = getPillCopy(editingPillId);
      setNewPill(rest);
      setAlarmTime(notificationTime);
      console.log("setted");
      // 기존 존재하는 챌린지 편집일 경우 notificationTime도 초기화
    }
  }, [editingPillId]);
  

  // 이벤트 핸들러: 알약 이름
  const handlePillName = (inputElement: HTMLInputElement): void => {
    const filteredValue = inputElement.value.replace(
      /[^a-zA-Zㄱ-ㅎ가-힣]/g,
      ""
    );

    inputElement.value = filteredValue;
    setNewPill({...newPill,name:filteredValue});
  };

  // 이벤트 핸들러: 식전 / 식후
  const handleBeforeOrAfterMeal = (value: number): void => {
    setNewPill({...newPill, intakeTime:{...newPill.intakeTime, beforeOrAfterMeal: value}});
    // newPill.intakeTime.beforeOrAfterMeal = value;
  };

  // 이벤트 핸들러: 식사 전후 복용 시간
  const handleMealMinute = (inputElement: HTMLInputElement): void => {
    const filteredValue = inputElement.value.replace(/[^0-9]/g, "");
    inputElement.value = filteredValue;

    setNewPill({...newPill,intakeTime:{...newPill.intakeTime, minutes:filteredValue as unknown as number}});
  };

  // 이벤트 핸들러: 일 섭취 시기
  const handleEatingTiming = (
    e: ChangeEvent<HTMLInputElement>,
    value: string
  ): void => {

    setNewPill({...newPill, dailyIntakePeriod: {
      ...newPill.dailyIntakePeriod,
      [value]: !(newPill.dailyIntakePeriod as any)[value],
    }});

  };

  // 이벤트 핸들러: 주 섭취 횟수
  const handleEatingDay = (
    e: ChangeEvent<HTMLInputElement>,
    value: string
  ): void => {
    
    setNewPill({...newPill,weeklyIntakeFrequency: {
      ...newPill.weeklyIntakeFrequency,
      [value]: !(newPill.weeklyIntakeFrequency as any)[value],
    }})
    
  };

  const [amOrPm, setAmOrPm] = useState(0);
  const [hour, setHour] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  const handleAlarmTime = () => {
    console.log("handleAlarmTime: " + amOrPm + hour + minutes);
    let hourIn24: number = amOrPm * 12 + (hour % 12);
    if(isEditMode) {
      setAlarmTime(alarmTime.map((item,index) => {
        if(index == editIndex){
          return {
            ...item,
            hour: hourIn24,
            minutes: minutes,
          };
        }
        return item;
      }))
    } else {
      setAlarmTime([...alarmTime, { hour: hourIn24, minutes: minutes }]);
    }

    setAmOrPm(0);
    setHour(0);
    setMinutes(0);
    setIsEditMode(false);
  };

  const editAlarmTime = (index: number) => {
    alarmTime.map((item, idx) => {
      if(idx == index) {
        item.hour < 12 ? setAmOrPm(0) : setAmOrPm(1);
        setHour(item.hour % 12);
        setMinutes(item.minutes);
      }
      setEditIndex(index);
      setModal(true);
      setIsEditMode(true);
    });
  }

  const deleteAlarmTime = (index: number) => {
    setAlarmTime(prevItems => {
      // 새로운 배열을 생성하면서 해당 인덱스의 아이템을 제외
      return prevItems.filter((_, i) => i !== index);
    });
  }

  // 적용된 변화들을 pillStore에 적용시킨다.
  const handleChanges = (): void => {
    console.log(newPill);
    if (isAddingNewPill) {
      setPillInfo({ ...newPill, id: uuid(), notificationTime: alarmTime });
      console.log(PillInfo);
    } else {
      setPill(editingPillId, newPill, alarmTime);
      console.log(PillInfo[0]);
    }
    navigate(-1);
  };

  return (
    <>
      <div className={s.wrap}>
        <div className={s.statusBar}></div>
        <div className={s.header}>
          <div className={s.titleBar}>
            <button onClick={() => navigate(-1)}>
              <img src={leftBracket} alt="" />
            </button>
            <div className={s.title}>
              {isAddingNewPill ? "알약 챌린지 추가" : "알약 정보 편집"}
            </div>
          </div>
        </div>
        <div className={s.contentWrap}>
          <NameInputSection placeHolderMessage = {"알약 이름을 입력해주세요"} handleChangeFunc={(e: ChangeEvent<HTMLInputElement>) => {
                  handlePillName(e.target);
          }} defaultValue={newPill.name} challengeType={"pill"}/>
          
          <IntakeTimeSection handleButtonFunc={(idx:number) => handleBeforeOrAfterMeal(idx)} handleMinuteFunc={(e: ChangeEvent<HTMLInputElement>) => {
                    handleMealMinute(e.target);
          }} defaultValues={newPill.intakeTime}/>
          
          <IntakePeriodSection handlePeriodFunc={(e: ChangeEvent<HTMLInputElement>, mealInfo:string) =>
                  handleEatingTiming(e, mealInfo)} defaultChecked={newPill.dailyIntakePeriod} />
          <IntakeDaySection handlePeriodFunc={(e: ChangeEvent<HTMLInputElement>, dayInfo:string) =>
                  handleEatingDay(e, dayInfo)} defaultChecked={newPill.weeklyIntakeFrequency} /> 
          
          <AlarmTimeSection alarmTime={alarmTime} plusButtonOnClick={() => setModal(true)} editButtonOnClick={(index: number) => editAlarmTime(index)} deleteButtonOnClick={(index: number) => deleteAlarmTime(index)}/>
            
          <button
            type="button"
            className={s.completeButton}
            onClick={() => handleChanges()}
          >
            완료
          </button>

          <div className={s.bottomBarCover}></div>

          <div className={s.messengerAlarmBody}>
            <span></span>
          </div>
        </div>

        <div className={s.bottomBarCover}></div>
      </div>
      
      {modal === true ? (
        <AlarmTimeInputModal
          modal={modal}
          setModal={setModal}
          amOrPm={amOrPm}
          setAmOrPm={setAmOrPm}
          hour={hour}
          setHour={setHour}
          minutes={minutes}
          setMinutes={setMinutes}
          handleAlarmTime={handleAlarmTime}
        />
      ) : null}
      
    </>
  );
};

export default PillEditingPage;
