import s from "../ManagePage.module.scss";
import { usePillInfoStore } from "../../../../../store/usePillInfoStore";
import useHabitInfoStore from "../../../../../store/useHabitInfoStore";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import pillInfo from "../../../../../store/pillInfo";
import habitInfo from "../../../../../store/habitInfo";
import {serverRequest} from "../../../../../APIs/ManageChallenge/serverRequest";
import React from "react";
import PillInfo from "../../../../../store/pillInfo";

interface Props<T> {
  isAddingNewChallenge: boolean;
  newChallenge: Omit<T, "id" | "notificationTime">;
  alarmTime: {
    hour: number;
    minutes: number;
  }[];
  editingChallengeId: string;
  setNameInputStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
}

const CompleteChangeButton = <T,>({
  isAddingNewChallenge,
  newChallenge,
  alarmTime,
  editingChallengeId,
  setNameInputStyle
}: Props<T>) => {
  const { PillInfo, setPillInfo, setPill } = usePillInfoStore();
  const { HabitInfo, setHabitInfo, setHabit } = useHabitInfoStore();
  const navigate = useNavigate();


  const isValidChallengeName = (name:string):{isValid: boolean; message: string;} => {
    if(name === '') return {isValid: false, message: "챌린지 이름을 적어주세요"};

    // eslint-disable-next-line array-callback-return
    PillInfo.map((value,index) => {
      if(value.name === name) return {isValid: false, message: "기존 챌린지와 일치하는 이름입니다"};
    })

    // eslint-disable-next-line array-callback-return
    HabitInfo.map((value,index) => {
      if(value.name === name) return {isValid: false, message: "기존 챌린지와 일치하는 이름입니다"};
    })

    return {isValid: true, message: ""};
  }

  const handleChanges = (): void => {

    // @ts-ignore
    console.log(newChallenge.name === '')

    // @ts-ignore
    if(!isValidChallengeName(newChallenge.name).isValid){
      setNameInputStyle({border: "2px solid red"});
      return;
    }

    if (
      (newChallenge as unknown as pillInfo).weeklyIntakeFrequency !== undefined
    ) {
      if (isAddingNewChallenge) {
        setPillInfo({
          ...(newChallenge as unknown as pillInfo),
          id: uuid(),
          notificationTime: alarmTime,
        });
        serverRequest.registerChallenge({
          ...(newChallenge as unknown as pillInfo),
          notificationTime: alarmTime,
        },"supplements");
      } else {
        setPill(
          editingChallengeId,
          newChallenge as unknown as pillInfo,
          alarmTime
        );
      }
    }

    if (
      (newChallenge as unknown as habitInfo).weeklyExecutionFrequency !==
      undefined
    ) {
      if (isAddingNewChallenge) {
        setHabitInfo({
          ...(newChallenge as unknown as habitInfo),
          id: uuid(),
          notificationTime: alarmTime,
        });
      } else {
        setHabit(
          editingChallengeId,
          newChallenge as unknown as habitInfo,
          alarmTime
        );
      }
    }

    navigate(-1);
  };

  return (
    <button
      type="button"
      className={s.completeButton}
      onClick={() => handleChanges()}
    >
      완료
    </button>
  );
};

export default CompleteChangeButton;
