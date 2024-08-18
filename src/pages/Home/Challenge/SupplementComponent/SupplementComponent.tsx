import styles from "./SupplementComponent.module.scss";
import { putSupplementCheck } from "../../../../APIs/home/homeApi";
import { useEffect, useState } from "react";

import { supplementDto } from "../../../../dtos/home/homeDto";

interface PillInfoDto {
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

export default function SupplementComponent(props: PillInfoDto) {
  console.log("SupplementComponent: ", props)

  const [newSupplements, setNewSupplements] = useState<supplementDto>(props.pill);

  useEffect(() => { //처음 페이지 진입시
    console.log("supplement useEffect")
    setNewSupplements(props.pill);
    // setHabitStatus(props.habits.map(habit => habit.achievementStatus));
  }, [props.pill]);

  useEffect(() => {
    console.log("newSupplements바뀜")

  }, [newSupplements]);


  function changeBtnStatus(supplementId: number, idx: number) {
    const newNewSupplements = { ...newSupplements };
    if (idx === 0) {
      newNewSupplements.breakfastSuccess = !newNewSupplements.breakfastSuccess;
    } else if (idx === 1) {
      newNewSupplements.lunchSuccess = !newNewSupplements.lunchSuccess;
    } else if (idx === 2) {
      newNewSupplements.dinnerSuccess = !newNewSupplements.dinnerSuccess;
    }

    setNewSupplements(newNewSupplements);
    console.log("newNewSupplements: ", newNewSupplements)
  }


  function clickPillCheck(supplementId: number, idx: number) {
    // setIntakeRecord(supplementId, changeIdxToString(idx));
    console.log('id', supplementId, '   idx: ', idx)
    //클릭시 서버로 전송
    var timeSlot = "";
    if (idx === 0) {
      timeSlot = "BREAKFAST";
    } else if (idx === 1) {
      timeSlot = "LUNCH";
    } else if (idx === 2) {
      timeSlot = "DINNER";
    }

    putSupplementCheck(timeSlot, supplementId);
  }



  const mealTime = () => {
    var mealTimeText = "";
    if (props.pill.afterMeal < 0) {
      mealTimeText += "식전 ";
      mealTimeText += (-props.pill.afterMeal);
      mealTimeText += "분 이내"

    } else {
      mealTimeText += "식후"
      mealTimeText += (props.pill.afterMeal);
      mealTimeText += "분 이내"
    }
    return (
      <><h5 className={styles.PillInfoInfo}>{mealTimeText}</h5></>
    )
  }

  return (
    <div className={styles.PillInfo}>
      <div className={styles.PillInfoHeader}>
        <h1 className={styles.PillInfoName}>{props.pill.challengeName}</h1>{" "}
        {mealTime()}
      </div>
      <div>
        <div className={styles.PillInfoTimes}>
          {

            [0, 1, 2].map((timeId, idx) => {
              const pillIntakeInfo = pillIntakeTime(newSupplements, timeId)
              console.log("pillIntakeInfo: ", pillIntakeInfo);

              if (pillIntakeInfo != null) {
                return (
                  <div
                    className={styles.PillInfoTimeButton}

                    onClick={() => {
                      clickPillCheck(props.pill.challengeId, idx);
                      changeBtnStatus(props.pill.challengeId, idx)
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
              } else {
                return (<></>)
              }
            })
          }
        </div>
      </div>
    </div >
  );
};

