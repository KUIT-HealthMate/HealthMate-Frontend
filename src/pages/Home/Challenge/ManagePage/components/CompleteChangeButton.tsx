import s from "../ManagePage.module.scss";
import { usePillInfoStore } from "../../../../../store/usePillInfoStore";
import useHabitInfoStore from "../../../../../store/useHabitInfoStore";
import { useNavigate } from "react-router-dom";
import { pillInfo } from "../../../../../store/challengeTypes";
import { habitInfo } from "../../../../../store/challengeTypes";
import {serverRequest} from "../../../../../APIs/ManageChallenge/serverRequest";
import React from "react";
import { AlarmTime } from "../utils/Alarm/AlarmTime";

interface Props<T> {
  isAddingNewChallenge: boolean;
  newChallenge: Omit<T, "id" | "notificationTime">;
  alarmTime: AlarmTime[];
  editingChallengeId: string;
  setNameInputStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const CompleteChangeButton = <T extends Omit<pillInfo, "id" | "notificationTime"> | Omit<habitInfo, "id" | "notificationTime">,>({
  isAddingNewChallenge,
  newChallenge,
  alarmTime,
  editingChallengeId,
  setNameInputStyle,
  setErrorMessage
}: Props<T>) => {
  const { PillInfo, setPillInfo, setPill, getPillCopy } = usePillInfoStore();
  const { HabitInfo, setHabitInfo, setHabit, getHabitCopy } = useHabitInfoStore();
  const navigate = useNavigate();


  const isValidChallengeName = (name:string):{isValid: boolean; message: string;} => {
    if(name === '') return {isValid: false, message: "챌린지 이름은 빈칸이 될 수 없어요"};

    let isOverlappedName:boolean = false;

    // @ts-ignore
    if(getPillCopy(editingChallengeId) !== undefined){
      if((getPillCopy(editingChallengeId) as Omit<pillInfo, "id">).name === newChallenge.name){
        return {isValid: true, message: ""};
      }
    } else if (getHabitCopy(editingChallengeId) !== undefined){
      if((getHabitCopy(editingChallengeId) as Omit<habitInfo, "id">).name === newChallenge.name){
        return {isValid: true, message: ""};
      }
    }

    // eslint-disable-next-line array-callback-return
    PillInfo.map((value,index) => {
      if(value.name === name) isOverlappedName = true;
    })

    // eslint-disable-next-line array-callback-return
    HabitInfo.map((value,index) => {
      if(value.name === name) isOverlappedName = true;
    })

    if(isOverlappedName){
      return {isValid: false, message: "기존 챌린지와 중복된 이름이에요"};
    }

    return {isValid: true, message: ""};
  }

  const handleChanges = async (): Promise<void> => {

    // @ts-ignore
    console.log(newChallenge.name === '')

    // @ts-ignore
    let {isValid, message} = isValidChallengeName(newChallenge.name);
    if(!isValid){
      setNameInputStyle({border: "2px solid red"});
      setErrorMessage(message);
      return;
    }

    if (
      (newChallenge as unknown as pillInfo).intakeTime !== undefined
    ) {
      if (isAddingNewChallenge) {

        let idGivenByServer: string = await serverRequest.registerChallenge({
          ...(newChallenge as unknown as pillInfo),
          notificationTime: alarmTime,
        },"supplements");

        console.log("idGivenByServer: " + idGivenByServer);

        setPillInfo({
          ...(newChallenge as unknown as pillInfo),
          id: idGivenByServer,
          notificationTime: alarmTime,
        });

      } else {

        serverRequest.editChallenge({
          ...(newChallenge as unknown as pillInfo),
          notificationTime: alarmTime,
          id: editingChallengeId
        },"supplements");
        console.log("edit complete, challenge is: ");
        console.log(newChallenge);
        console.log(editingChallengeId);
        setPill(
          editingChallengeId,
          newChallenge as unknown as pillInfo,
          alarmTime
        );
        console.log(PillInfo);

      }
    } else  {
      if (isAddingNewChallenge) {
        let idGivenByServer: string = await serverRequest.registerChallenge({
          ...(newChallenge as unknown as habitInfo),
          notificationTime: alarmTime,
        },"habits");

        console.log("idGivenByServer: " + idGivenByServer);
        console.log(idGivenByServer);

        setHabitInfo({
          ...(newChallenge as unknown as habitInfo),
          id: idGivenByServer,
          notificationTime: alarmTime,
        });
      } else {

        serverRequest.editChallenge({
          ...(newChallenge as unknown as habitInfo),
          notificationTime: alarmTime,
          id: editingChallengeId
        },"habits");
        
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
