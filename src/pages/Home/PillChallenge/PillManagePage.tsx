import React, { ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import s from "./PillManagePage.module.scss";
import usePillInfoStore from "../../../store/usePillInfoStore";
import pillInfo from "../../../store/pillInfo";
import uuid from "react-uuid";
import { useState } from "react";
import { useGlobalStore } from "../../../store/store";
import { useEffect } from "react";

import leftBracket from "../../../assets/leftBraket.svg";
import plusIconImg from "../../../assets/plusIcon.svg";
import deleteImg from "../../../assets/deleteIcon.svg";
import pencilImg from "../../../assets/pencil.svg";

import InputClearButtonImg from "../../../assets/InputClearButton.svg";
import AlarmTimeInputModal from "./AlarmTimeInputModal";

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

  let editingPillId: string;

  //notificationTime은 화면에 계속 렌더링되어야 하므로 분리하여 state로 관리
  let newPill: Omit<Omit<pillInfo, "id">, "notificationTime">;

  //새로 추가하는 화면인지, 편집하는 화면인지를 구분함.
  let isAddingNewPill: boolean;

  //편집하는 화면이라면, 어떤 id의 pill을 편집하는지에 대한 정보.
  const alreadyExistingPillId: string = useParams().id as string;

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

  let tempNotificationTime:{ hour: number; minutes: number }[];

  if (isAddingNewPill) {
    newPill = initPill();
  } else {
    editingPillId = alreadyExistingPillId;

    // notificationTime 속성을 분리한다.
    const { notificationTime, ...rest } = getPillCopy(editingPillId);
    newPill = rest;
    tempNotificationTime = notificationTime;
    // 기존 존재하는 챌린지 편집일 경우 notificationTime도 초기화
    
  }

  
  useEffect(() => {
    if(!isAddingNewPill){
      setAlarmTime(tempNotificationTime);
    }
  }, []);
  

  console.log(newPill);

  // 이벤트 핸들러: 알약 이름
  const handlePillName = (inputElement: HTMLInputElement): void => {
    const filteredValue = inputElement.value.replace(
      /[^a-zA-Zㄱ-ㅎ가-힣]/g,
      ""
    );

    inputElement.value = filteredValue;
    newPill.name = filteredValue;
  };
  console.log("+");

  // 이벤트 핸들러: 식전 / 식후
  const handleBeforeOrAfterMeal = (value: number): void => {
    newPill.intakeTime.beforeOrAfterMeal = value;
  };

  // 이벤트 핸들러: 식사 전후 복용 시간
  const handleMealMinute = (inputElement: HTMLInputElement): void => {
    const filteredValue = inputElement.value.replace(/[^0-9]/g, "");
    inputElement.value = filteredValue;
    newPill.intakeTime.minutes = filteredValue as unknown as number;
  };

  // 이벤트 핸들러: 일 섭취 시기
  const handleEatingTiming = (
    e: ChangeEvent<HTMLInputElement>,
    value: string
  ): void => {
    newPill.dailyIntakePeriod = {
      ...newPill.dailyIntakePeriod,
      [value]: !(newPill.dailyIntakePeriod as any)[value],
    };
  };

  // 이벤트 핸들러: 주 섭취 횟수
  const handleEatingDay = (
    e: ChangeEvent<HTMLInputElement>,
    value: string
  ): void => {
    newPill.weeklyIntakeFrequency = {
      ...newPill.weeklyIntakeFrequency,
      [value]: !(newPill.weeklyIntakeFrequency as any)[value],
    };
  };

  // 이벤트 핸들러: input clear button
  const handleInputClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonElement = e.currentTarget;
    const inputElement = buttonElement
      .closest(`.${s.inputWrap}`)
      ?.querySelector("input") as HTMLInputElement;
    if (inputElement) {
      inputElement.value = "";
    }
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
    if (isAddingNewPill) {
      setPillInfo({ ...newPill, id: uuid(), notificationTime: alarmTime });
    } else {
      setPill(editingPillId, newPill, alarmTime);
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
          <div className={s.detailDiv}>
            <span className={s.detailTitle}>알약 이름</span>
            <div className={s.inputWrap}>
              <input
                className={s.nameInput}
                type="text"
                placeholder="알약 이름을 입력해주세요"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  handlePillName(e.target);
                }}
                defaultValue={newPill.name}
              />
              <button className={s.inputClearButton} onClick={handleInputClear}>
                <img
                  className={s.inputClearButtonImg}
                  src={InputClearButtonImg}
                  alt=""
                />
              </button>
            </div>
          </div>
          <div className={s.detailDiv}>
            <span className={s.detailTitle}>섭취 시간</span>
            <div className={s.beforeOrAfterMealWrap}>
              <input
                type="radio"
                name="beforeOrAfterMeal"
                id="before"
                onChange={() => handleBeforeOrAfterMeal(1)}
                defaultChecked={newPill.intakeTime.beforeOrAfterMeal == 1}
              />
              <label htmlFor="before" className={s.smallButton}>
                식전
              </label>
              <input
                type="radio"
                name="beforeOrAfterMeal"
                id="after"
                onChange={() => handleBeforeOrAfterMeal(2)}
                defaultChecked={newPill.intakeTime.beforeOrAfterMeal == 2}
              />
              <label htmlFor="after" className={s.smallButton}>
                식후
              </label>
              <div className={s.inputWrap}>
                <input
                  className={s.minuteInput}
                  type="number"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleMealMinute(e.target);
                  }}
                  defaultValue={newPill.intakeTime.minutes}
                />
                <button
                  className={s.inputClearButton}
                  onClick={handleInputClear}
                >
                  <img
                    className={s.inputClearButtonImg}
                    src={InputClearButtonImg}
                    alt=""
                  />
                </button>
              </div>
              <span className={s.minuteInputText}>분 이내</span>
            </div>
          </div>
          <div className={s.detailDiv}>
            <span className={s.detailTitle}>일 섭취 시기</span>
            <div className={s.eatingTimeButtonWrap}>
              <input
                type="checkbox"
                id="morning"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleEatingTiming(e, "breakfast")
                }
                defaultChecked={newPill.dailyIntakePeriod.breakfast}
              />
              <label htmlFor="morning" className={s.smallButton}>
                아침
              </label>
              <input
                type="checkbox"
                id="afternoon"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleEatingTiming(e, "lunch")
                }
                defaultChecked={newPill.dailyIntakePeriod.lunch}
              />
              <label htmlFor="afternoon" className={s.smallButton}>
                점심
              </label>
              <input
                type="checkbox"
                id="evening"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleEatingTiming(e, "dinner")
                }
                defaultChecked={newPill.dailyIntakePeriod.dinner}
              />
              <label htmlFor="evening" className={s.smallButton}>
                저녁
              </label>
            </div>
          </div>
          <div className={s.detailDiv}>
            <span className={s.detailTitle}>주 섭취 횟수</span>
            <div className={s.weekDayButtonWrap}>
              <input
                type="checkbox"
                id="mon"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleEatingDay(e, "monday")
                }
                defaultChecked={newPill.weeklyIntakeFrequency.monday}
              />
              <label htmlFor="mon" className={s.bigButton}>
                월
              </label>
              <input
                type="checkbox"
                id="tue"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleEatingDay(e, "tuesday")
                }
                defaultChecked={newPill.weeklyIntakeFrequency.tuesday}
              />
              <label htmlFor="tue" className={s.bigButton}>
                화
              </label>
              <input
                type="checkbox"
                id="wed"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleEatingDay(e, "wednesday")
                }
                defaultChecked={newPill.weeklyIntakeFrequency.wednesday}
              />
              <label htmlFor="wed" className={s.bigButton}>
                수
              </label>
              <input
                type="checkbox"
                id="thu"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleEatingDay(e, "thursday")
                }
                defaultChecked={newPill.weeklyIntakeFrequency.thursday}
              />
              <label htmlFor="thu" className={s.bigButton}>
                목
              </label>
              <input
                type="checkbox"
                id="fri"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleEatingDay(e, "friday")
                }
                defaultChecked={newPill.weeklyIntakeFrequency.friday}
              />
              <label htmlFor="fri" className={s.bigButton}>
                금
              </label>
              <input
                type="checkbox"
                id="sat"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleEatingDay(e, "saturday")
                }
                defaultChecked={newPill.weeklyIntakeFrequency.saturday}
              />
              <label htmlFor="sat" className={s.bigButton}>
                토
              </label>
              <input
                type="checkbox"
                id="sun"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleEatingDay(e, "sunday")
                }
                defaultChecked={newPill.weeklyIntakeFrequency.sunday}
              />
              <label htmlFor="sun" className={s.bigButton}>
                일
              </label>
            </div>
          </div>

          <div className={s.detailDiv}>
            <div className={s.messengerAlarmHeader}>
              <span className={s.detailTitle}>키키오톡 알림 시간</span>
              <button
                type="button"
                onClick={() => setModal(true)}
                className={s.plusButton}
              >
                <img src={plusIconImg} alt="" />
              </button>
            </div>
            <div className={s.messengerAlarmBody}>
              {alarmTime && alarmTime.map((value, index) => {
                return (
                  <div className={s.alarmTimeWrap}>
                    <span>
                      {value.hour < 12 ? "오전 " : "오후 "}
                      {(value.hour % 12 != 0 ? value.hour % 12 : 12).toString().padStart(2,'0')} : {(value.minutes).toString().padStart(2,'0')}
                    </span>
                    <div className={"editAndDeleteBtn"}>
                      <button className="edit_button" onClick={() => editAlarmTime(index)}>
                        <img src={pencilImg} alt="" />
                      </button>
                      <button className="delete_button" onClick={() => deleteAlarmTime(index)}>
                        <img src={deleteImg} alt="" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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
