import { AlarmTime } from "./AlarmTime";
import { SelectedAlarmTimeFormat } from "./SelectedAlarmTimeFormat";

const editAlarmTime = (
  index: number,
  selectedAlarmTime: SelectedAlarmTimeFormat,
  setSelectedAlarmTime: React.Dispatch<
    React.SetStateAction<SelectedAlarmTimeFormat>
  >,
  alarmTime: AlarmTime[],
  setModal: (value: React.SetStateAction<boolean>) => void
) => {
  alarmTime.map((item, idx) => {
    if (idx === index) {
      setSelectedAlarmTime({
        ...selectedAlarmTime,
        amOrPm: item.hour - 12 > 0 ? 1 : 0,
        hour: item.hour % 12,
        minutes: item.minutes,
        editIndex: index,
        isEditMode: true,
      });
    }
    return setModal(true);
  });
};

export default editAlarmTime;
