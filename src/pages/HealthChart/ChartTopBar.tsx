import { chartDataType } from "./HealthChart";
import s from "./ChartTopBar.module.scss";

interface ChartTopBarProps {
  chartDataType: chartDataType;
  setChartDataType: (chartDataType: chartDataType) => void;
}

export default function ChartTopBar({
  chartDataType,
  setChartDataType,
}: ChartTopBarProps) {
  console.log(chartDataType);
  return (
    <div>
      <div className={s.title}>건강 차트</div>
      <div className={s.selectorContainer}>
        <div
          className={`${s.selector} ${
            chartDataType === "habbit" ? s.selected : ""
          }`}
          onClick={() => setChartDataType("habbit")}
        >
          생활 습관
        </div>
        <div
          className={`${s.selector} ${
            chartDataType === "mealPattern" ? s.selected : ""
          }`}
          onClick={() => setChartDataType("mealPattern")}
        >
          식사 패턴
        </div>
        <div
          className={`${s.selector} ${
            chartDataType === "sleepingPattern" ? s.selected : ""
          }`}
          onClick={() => setChartDataType("sleepingPattern")}
        >
          수면 패턴
        </div>
      </div>
    </div>
  );
}
