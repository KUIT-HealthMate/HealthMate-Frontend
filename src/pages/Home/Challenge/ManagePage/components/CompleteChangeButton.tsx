import s from "../ManagePage.module.scss";
import { usePillInfoStore } from "../../../../../store/usePillInfoStore";
import useHabitInfoStore from "../../../../../store/useHabitInfoStore";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import pillInfo from "../../../../../store/pillInfo";
import habitInfo from "../../../../../store/habitInfo";
import { registerPill } from "../../../../../APIs/ManageChallenge/registerPill";

interface Props<T> {
  isAddingNewChallenge: boolean;
  newChallenge: Omit<T, "id" | "notificationTime">;
  alarmTime: {
    hour: number;
    minutes: number;
  }[];
  editingChallengeId: string;
}

const CompleteChangeButton = <T,>({
  isAddingNewChallenge,
  newChallenge,
  alarmTime,
  editingChallengeId,
}: Props<T>) => {
  const { setPillInfo, setPill } = usePillInfoStore();
  const { setHabitInfo, setHabit } = useHabitInfoStore();
  const navigate = useNavigate();

  const handleChanges = (): void => {
    if (
      (newChallenge as unknown as pillInfo).weeklyIntakeFrequency !== undefined
    ) {
      if (isAddingNewChallenge) {
        setPillInfo({
          ...(newChallenge as unknown as pillInfo),
          id: uuid(),
          notificationTime: alarmTime,
        });
        registerPill({
          ...(newChallenge as unknown as pillInfo),
          id: uuid(),
          notificationTime: alarmTime,
        });
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
