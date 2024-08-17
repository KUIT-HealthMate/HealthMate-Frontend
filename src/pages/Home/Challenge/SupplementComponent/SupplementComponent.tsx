import styles from "./SupplementComponent.module.scss";
import { supplementDto } from "../../../../dtos/home/homeDto";

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

  return (
    <div className={styles.PillInfo}>
      <div className={styles.PillInfoHeader}>
        <h1 className={styles.PillInfoName}>{props.pill.challengeName}</h1>{" "}
        <h5 className={styles.PillInfoInfo}>영양제 정보 받아서 들어가야됨</h5>
      </div>
      <div>
        <div className={styles.PillInfoTimes}>
          {
            // eslint-disable-next-line
            [0, 1, 2].map((timeId) => {
              const pillIntakeInfo = pillIntakeTime(props.pill, timeId)
              if (pillIntakeInfo != null) {
                return (
                  <div
                    className={styles.PillInfoTimeButton}
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
