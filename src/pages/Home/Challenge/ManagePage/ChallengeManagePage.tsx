import React from "react";
import { useParams } from "react-router-dom";
import s from "./ManagePage.module.scss";
import { usePillInfoStore } from "../../../../store/usePillInfoStore";

import pillInfo from "../../../../store/pillInfo";
import { useState } from "react";
import { useGlobalStore } from "../../../../store/store";
import { useEffect } from "react";

import AlarmTimeInputModal from "./components/AlarmTimeInputModal";
import NameInputSection from "./components/NameInputSection";
import IntakeTimeSection from "./components/IntakeTimeSection";
import IntakePeriodSection from "./components/IntakePeriodSection";
import ChallengeDaySection from "./components/ChallengeDaySection";
import AlarmTimeSection from "./components/AlarmTimeSection";

import { initChallenge } from "./utils/initChallenge";
import CompleteChangeButton from "./components/CompleteChangeButton";
import { AlarmTime } from "./utils/Alarm/AlarmTime";
import { isHabitChallenge, isPillChallenge } from "./utils/determineChallenge";
import useHabitInfoStore from "../../../../store/useHabitInfoStore";
import habitInfo from "../../../../store/habitInfo";
import ChallengeManageHeader from "./components/ChallengeManageHeader";
import { SelectedAlarmTimeFormat } from "./utils/Alarm/SelectedAlarmTimeFormat";

const ChallengeManagePage = <T,>({
  challengeType,
}: {
  challengeType: string;
}) => {
  //하단 바 숨김
  const setShowBottomBar = useGlobalStore((state) => state.setShowBottomBar);
  useEffect(() => {
    console.log("마운트됨");
    setShowBottomBar(false);
    return () => {
      setShowBottomBar(false);
    };
  }, [setShowBottomBar]);

  const { getPillCopy } = usePillInfoStore();
  const { getHabitCopy } = useHabitInfoStore();

  // 알약 챌린지인지, 생활 습관 챌린지인지의 정보
  type initChallengeInfo<T> = T extends pillInfo
    ? Omit<pillInfo, "id" | "notificationTime">
    : Omit<habitInfo, "id" | "notificationTime">;

  // 얄약, 습관 챌린지의 set함수의 타입
  type pillChallengeSetter = React.Dispatch<
    React.SetStateAction<Omit<pillInfo, "id" | "notificationTime">>
  >;
  //type habitChallengeSetter = React.Dispatch<React.SetStateAction<Omit<habitInfo, "id" | "notificationTime">>>;

  // 이 화면에 담고 있는 챌린지
  const [newChallenge, setNewChallenge] = useState<initChallengeInfo<T>>(
    initChallenge(challengeType) as unknown as initChallengeInfo<T>
  );

  //새로 추가하는 화면인지, 편집하는 화면인지의 정보
  let isAddingNewChallenge: boolean;

  // useParams를 통해 챌린지의 id 저장
  const alreadyExistingChallengeId: string = useParams().id as string;

  if (alreadyExistingChallengeId === undefined) {
    isAddingNewChallenge = true;
  } else {
    isAddingNewChallenge = false;
  }
  const [editingChallengeId] = useState<string>(alreadyExistingChallengeId);

  // 이름 부분 input의 style
  const [nameInputStyle, setNameInputStyle] = useState<React.CSSProperties>({});
  // input값이 잘못되었을경우 오류 텍스트
  const [errorMessage,setErrorMessage] = useState<string>("");

  // 챌린지에서 notificationTime을 분리하여 관리
  const [alarmTime, setAlarmTime] = useState<AlarmTime[]>([]);

  useEffect(() => {
    if (!isAddingNewChallenge) {
      if (isPillChallenge(challengeType)) {
        let { notificationTime, ...rest } = getPillCopy(editingChallengeId);
        setNewChallenge(rest as unknown as initChallengeInfo<T>);
        setAlarmTime(notificationTime);
      }
      if (isHabitChallenge(challengeType)) {
        let { notificationTime, ...rest } = getHabitCopy(editingChallengeId);
        setNewChallenge(rest as unknown as initChallengeInfo<T>);
        setAlarmTime(notificationTime);
      }
    }
  }, [
    challengeType,
    editingChallengeId,
    getHabitCopy,
    getPillCopy,
    isAddingNewChallenge,
  ]);

  // 알림톡 시간을 위한 모달창, true 시 모달창 표시
  const [modal, setModal] = useState(false);

  // 알림톡 시간 추가 / 수정 / 삭제를 위한 state 값
  const [selectedAlarmTime, setSelectedAlarmTime] =
    useState<SelectedAlarmTimeFormat>({
      amOrPm: 0,
      hour: 0,
      minutes: 0,
      isEditMode: false,
      editIndex: 0,
    });

  return (
    <>
      <div className={s.wrap}>
        <ChallengeManageHeader
          challengeType={challengeType}
          isAddingNewChallenge={isAddingNewChallenge}
        />

        <div className={s.contentWrap}>
          <NameInputSection<initChallengeInfo<T>>
            newChallenge={newChallenge}
            setNewChallenge={setNewChallenge}
            defaultValue={newChallenge.name}
            challengeType={challengeType}
            nameInputStyle={nameInputStyle}
            setNameInputStyle={setNameInputStyle}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />

          {isPillChallenge(challengeType) && (
            <>
              <IntakeTimeSection
                setNewChallenge={setNewChallenge as pillChallengeSetter}
                newChallenge={newChallenge as pillInfo}
                defaultValues={(newChallenge as pillInfo).intakeTime}
              />

              <IntakePeriodSection
                setNewChallenge={setNewChallenge as pillChallengeSetter}
                newChallenge={newChallenge as pillInfo}
                defaultChecked={(newChallenge as pillInfo).dailyIntakePeriod}
              />
            </>
          )}

          <ChallengeDaySection<initChallengeInfo<T>>
            newChallenge={newChallenge}
            setNewChallenge={setNewChallenge}
            defaultChecked={
              isPillChallenge(challengeType)
                ? (newChallenge as pillInfo).weeklyIntakeFrequency
                : (newChallenge as habitInfo).weeklyExecutionFrequency
            }
          />

          <AlarmTimeSection
            alarmTime={alarmTime}
            setAlarmTime={setAlarmTime}
            selectedAlarmTime={selectedAlarmTime}
            setSelectedAlarmTime={setSelectedAlarmTime}
            setModal={setModal}
          />

          <CompleteChangeButton<initChallengeInfo<T>>
            isAddingNewChallenge={isAddingNewChallenge}
            newChallenge={newChallenge}
            alarmTime={alarmTime}
            editingChallengeId={editingChallengeId}
            setNameInputStyle={setNameInputStyle}
            setErrorMessage={setErrorMessage}
          />

          <div className={s.bottomBarCover}></div>

          <div className={s.messengerAlarmBody}>
            <span></span>
          </div>
        </div>

        <div className={s.bottomBarCover}></div>
      </div>

      {modal === true ? (
        <AlarmTimeInputModal
          alarmTime={alarmTime}
          setAlarmTime={setAlarmTime}
          selectedAlarmTime={selectedAlarmTime}
          setSelectedAlarmTime={setSelectedAlarmTime}
          modal={modal}
          setModal={setModal}
        />
      ) : null}
    </>
  );
};

export default ChallengeManagePage;
