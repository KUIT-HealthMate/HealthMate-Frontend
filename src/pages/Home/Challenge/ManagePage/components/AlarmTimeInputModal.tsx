import React, { useRef } from "react";
import s from "./AlarmTimeInputModal.module.scss";
import blackX from "../../../../../assets/blackX.svg";
import WheelPicker from "./WheelPicker";
import { SelectedAlarmTimeFormat } from "../utils/Alarm/SelectedAlarmTimeFormat";
import handleAlarmTime from "../utils/Alarm/handleAlarmTime";
import { AlarmTime } from "../utils/Alarm/AlarmTime";

interface Props {
  alarmTime: AlarmTime[];
  setAlarmTime: React.Dispatch<React.SetStateAction<AlarmTime[]>>;
  selectedAlarmTime: SelectedAlarmTimeFormat;
  setSelectedAlarmTime: React.Dispatch<
    React.SetStateAction<SelectedAlarmTimeFormat>
  >;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlarmTimeInputModal: React.FC<Props> = ({
  alarmTime,
  setAlarmTime,
  selectedAlarmTime,
  setSelectedAlarmTime,
  modal,
  setModal,
}) => {
  const modalBackground = useRef();

  const handleTimeSet = () => {
    setModal(false);
    handleAlarmTime(
      alarmTime,
      setAlarmTime,
      selectedAlarmTime,
      setSelectedAlarmTime
    );
  };

  const setAmOrPm = (amOrPm: number) => {
    setSelectedAlarmTime({ ...selectedAlarmTime, amOrPm: amOrPm });
  };

  const setHour = (hour: number) => {
    setSelectedAlarmTime({ ...selectedAlarmTime, hour: hour });
  };

  const setMinutes = (minutes: number) => {
    setSelectedAlarmTime({ ...selectedAlarmTime, minutes: minutes });
  };

  console.log("???");
  console.log(selectedAlarmTime);

  return (
    <div
      className={s.AlarmTimeInputWrapper}
      ref={modalBackground as any}
      onClick={(e) => {
        if (e.target === modalBackground.current) {
          setModal(false);
        }
      }}
    >
      <div className={s.AlarmTimeInputContent}>
        <div className={s.TitleBar}>
          <span className={s.AlarmTimeInputTitle}>알림 시간 설정</span>
          <button type="button" onClick={() => setModal(false)}>
            <img className={s.modalXButton} src={blackX} alt="" />
          </button>
        </div>
        <div className={s.wheelPickerWrap}>
          <WheelPicker
            list={["오전", "오후"]}
            pickerStyle={{ borderRadius: "10px 0 0 10px" }}
            initialIndex={selectedAlarmTime.amOrPm}
            onSelectedChange={(selected) => {
              selected === "오전" ? setAmOrPm(0) : setAmOrPm(1);
            }}
          >
            {" "}
          </WheelPicker>
          <WheelPicker
            list={[
              "12",
              "01",
              "02",
              "03",
              "04",
              "05",
              "06",
              "07",
              "08",
              "09",
              "10",
              "11",
            ]}
            initialIndex={selectedAlarmTime.hour}
            onSelectedChange={(selected) => {
              setHour(selected as number);
            }}
          >
            {" "}
          </WheelPicker>
          <WheelPicker
            list={[":"]}
            onSelectedChange={() => {}}
            initialIndex={0}
          >
            {" "}
          </WheelPicker>
          <WheelPicker
            list={[
              "00",
              "05",
              "10",
              "15",
              "20",
              "25",
              "30",
              "35",
              "40",
              "45",
              "50",
              "55",
            ]}
            pickerStyle={{ borderRadius: "0 10px 10px 0" }}
            initialIndex={
              selectedAlarmTime.minutes === 0
                ? selectedAlarmTime.minutes
                : selectedAlarmTime.minutes / 5
            }
            onSelectedChange={(selected) => {
              setMinutes(selected as number);
            }}
          >
            {" "}
          </WheelPicker>
        </div>
        <button
          type="button"
          className={s.AlarmTimeInputCompleteButton}
          onClick={() => handleTimeSet()}
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default AlarmTimeInputModal;
