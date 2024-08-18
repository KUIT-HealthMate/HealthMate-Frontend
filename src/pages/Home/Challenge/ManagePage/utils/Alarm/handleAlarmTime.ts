import { AlarmTime } from "./AlarmTime";
import { SelectedAlarmTimeFormat } from "./SelectedAlarmTimeFormat";

const handleAlarmTime = (
  alarmTime: AlarmTime[],
  setAlarmTime: (value: React.SetStateAction<AlarmTime[]>) => void,
  selectedAlarmTime: SelectedAlarmTimeFormat,
  setSelectedAlarmTime: React.Dispatch<
    React.SetStateAction<SelectedAlarmTimeFormat>
  >
) => {
  let hourIn24: number =
    selectedAlarmTime.amOrPm * 12 + (selectedAlarmTime.hour % 12);
  if (selectedAlarmTime.isEditMode) {
    setAlarmTime(
      alarmTime.map((item, index) => {
        if (index === selectedAlarmTime.editIndex) {
          return {
            ...item,
            hour: hourIn24,
            minute: selectedAlarmTime.minute,
          };
        }
        return item;
      })
    );
  } else {
    setAlarmTime([
      ...alarmTime,
      { hour: hourIn24, minute: selectedAlarmTime.minute },
    ]);
  }

  setSelectedAlarmTime({
    ...selectedAlarmTime,
    amOrPm: 0,
    hour: 0,
    minute: 0,
    isEditMode: false,
  });
};

export default handleAlarmTime;
