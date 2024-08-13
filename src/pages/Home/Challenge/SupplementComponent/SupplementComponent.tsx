import styles from "./SupplementComponent.module.scss";
import { usePillInfoStore } from "../../../../store/usePillInfoStore";
import pillInfo from "../../../../store/pillInfo";

import { useMutation } from 'react-query';
import { putSupplementCheck } from "../../../../APIs/home/homeApi";
import { time } from "console";

import { supplementDto } from "../../../../dtos/home/homeDto";

function changeIdxToString(idx: number): string {
  if (idx === 1) {
    return "breakfast";
  } else if (idx === 2) {
    return "lunch";
  } else if (idx === 3) {
    return "dinner";
  } else {
    return "";
  }
}

// interface PillInfo {
//   pill: pillInfo;
//   index: number;
// }

interface PillInfo {
  pill: supplementDto;
}

interface PillTimeInfo {
  pillTime: string,
  isChecked: boolean,
}

const pillIntakeTime = (props: supplementDto, timeIdx: number) => {
  if (timeIdx === 0 && props.breakfastRequired) {
    const PillTime: PillTimeInfo = { pillTime: "아침", isChecked: props.breakfastSuccess }
    return PillTime;
  } else if (timeIdx === 1 && props.lunchRequired) {
    const PillTime: PillTimeInfo = { pillTime: "점심", isChecked: props.lunchSuccess }
    return PillTime;
  } else if (timeIdx === 2 && props.dinnerRequired) {
    const PillTime: PillTimeInfo = { pillTime: "저녁", isChecked: props.dinnerSuccess }
    return PillTime;
  } else {
    return null;
  }


}

const SupplementComponent = (props: PillInfo) => {
  const { setIntakeRecord, getIntakeRecord, getIntakeTime, getMealTime } =
    usePillInfoStore();

  function clickPillCheck(id: string, idx: number) {
    setIntakeRecord(id, changeIdxToString(idx));
    console.log('id', id, '   idx: ', idx)
    //클릭시 서버로 전송
    var timeSlot = "";
    if (idx === 0) {
      timeSlot = "BREAKFAST";
    } else if (idx === 1) {
      timeSlot = "LUNCH";
    } else if (idx === 2) {
      timeSlot = "DINNER";
    }


    putSupplementCheck(timeSlot, id);

  }

  return (
    <div className={styles.PillInfo}>
      <div className={styles.PillInfoHeader}>
        <h1 className={styles.PillInfoName}>{props.pill.challengeName}</h1>{" "}
        <h5 className={styles.PillInfoInfo}>영양제 정보 받아서 들어가야됨</h5>
      </div>
      <div>
        <div className={styles.PillInfoTimes}>
          {
            [0, 1, 2].map((timeId) => {
              const pillIntakeInfo = pillIntakeTime(props.pill, timeId)
              if (pillIntakeInfo != null) {
                return (
                  <div
                    className={styles.PillInfoTimeButton}
                    onClick={() => {
                      // clickPillCheck(props.pill., idx)
                    }

                    }
                    style={
                      pillIntakeInfo.isChecked
                        ? {
                          background: `rgba(14, 148, 148, 0.1)`,
                          border: `1px solid #0E9494`,
                          color: `#0B7575`,
                        }
                        : {
                          background: `#F5F6F8`,
                          border: `1px solid #B3B3B3`,
                          color: `#B3B3B3`,
                        }
                    }
                  >
                    {pillIntakeInfo.pillTime}
                  </div>
                )
              }
            })
          }
        </div>
      </div>
    </div >
  );
};

export default SupplementComponent;
