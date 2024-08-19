import styles from "./DailyHealthChart.module.scss";
import DailyBar from "./DailyBar";
import { chartDataType } from "../HealthChart";
import { dayResult } from "../dataTypes";

interface dailyScoreProps {
  dataType: chartDataType;
  data: dayResult | null;
}

const DailyHealthChart = ({ dataType, data }: dailyScoreProps) => {
  const setTitle = (dataType: chartDataType) => {
    switch (dataType) {
      case "habbit":
        return ["생활 습관의 규칙성", "일에 대한 몰입도", "자세의 바른 정도"];
      case "mealPattern":
        return ["식사패턴의 규칙성", "음주 빈도", "영양분 섭취 정도"];
      case "sleepingPattern":
        return ["수면패턴의 규칙성", "수면의 질", "수면의 집중도"];
    }
  };

  const titles = setTitle(dataType);

  const setData = (dataType: chartDataType) => {
    if (data != null) {
      const dataList = [];
      switch (dataType) {
        case "habbit":
          dataList.push(data?.life.lifeRegularnessAverage);
          dataList.push(data?.life.lifeImmersionAverage);
          dataList.push(data?.life.lifePostureAverage);
          dataList.push(data?.life.lifeStyleResponse.regularness);
          dataList.push(data?.life.lifeStyleResponse.immersion);
          dataList.push(data?.life.lifeStyleResponse.posture);
          return dataList;
        case "mealPattern":
          dataList.push(data?.meal.mealRegularityAverage);
          dataList.push(data?.meal.mealAlcoholAverage);
          dataList.push(data?.meal.mealNutritionAverage);
          dataList.push(data?.meal.mealPatternResponse.regularity);
          dataList.push(data?.meal.mealPatternResponse.alcoholFrequency);
          dataList.push(data?.meal.mealPatternResponse.nutritionIntake);
          return dataList;
        case "sleepingPattern":
          dataList.push(data?.sleep.sleepRegularityAverage);
          dataList.push(data?.sleep.sleepQualityAverage);
          dataList.push(data?.sleep.sleepFocusAverage);
          dataList.push(data?.sleep.sleepPatternResponse.regularity);
          dataList.push(data?.sleep.sleepPatternResponse.sleepQuality);
          dataList.push(data?.sleep.sleepPatternResponse.sleepFocus);
          return dataList;
      }
    } else return [0, 0, 0, 0, 0, 0];
  };

  const detaildata = setData(dataType);

  const detailInfos = [
    { id: 1, title: titles[0], avg: detaildata[0], score: detaildata[3] },
    { id: 2, title: titles[1], avg: detaildata[1], score: detaildata[4] },
    { id: 3, title: titles[2], avg: detaildata[2], score: detaildata[5] },
  ];

  return (
    <div className={styles.chartDetailPage}>
      <div className={styles.chartDetailWrap}>
        <div className={styles.chartDetail}>
          {detailInfos.map((detailInfo) => {
            return (
              <DailyBar
                title={detailInfo.title}
                avg={detailInfo.avg}
                score={detailInfo.score}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DailyHealthChart;
