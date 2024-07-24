import { useState } from "react";
import dayjs from "dayjs";
import PageTopBar from "../../../components/organs/PageTopBar";
import { useGlobalStore } from "../../../store/store";
import forward from "../../../assets/forward.svg";
import backward from "../../../assets/backward.svg";
import s from "./ChallengeStatistics.module.scss";
import StatisticsDetails from "./StatisticsDetails";

export default function ChallengeStatistics() {
  const enableBottomBar = useGlobalStore((state) => state.setShowBottomBar);
  const [month, setMonth] = useState<dayjs.Dayjs>(dayjs());

  const reduceMonth = () => {
    const reducedDay = dayjs(month).subtract(1, "month");
    setMonth(reducedDay);
  };

  const increaseMonth = () => {
    const increasedDay = dayjs(month).add(1, "month");
    setMonth(increasedDay);
  };

  const [calanderSelect, setCalanderSelect] = useState(true);
  const selectWeeklyCalander = () => {
    setCalanderSelect(true);
  };
  const selectMonthlyCalander = () => {
    setCalanderSelect(false);
  };

  return (
    <>
      <PageTopBar barName="챌린지 통계" setBottomBarState={enableBottomBar} />
      <div className={s.selectorContainer}>
        <div className={s.dateSelector}>
          <img
            src={backward}
            alt="lastMonth"
            className={s.selector}
            onClick={reduceMonth}
          />
          <div className={s.month}>{month.format("YYYY.MM")}</div>
          <img
            src={forward}
            alt="nextMonth"
            className={s.selector}
            onClick={increaseMonth}
          />
        </div>
        <div className={s.periodSelector}>
          <div
            className={`${s.linkButton} ${calanderSelect ? s.selected : ""}`}
            onClick={selectWeeklyCalander}
          >
            주간 현황
          </div>
          <div
            className={`${s.linkButton} ${calanderSelect ? "" : s.selected}`}
            onClick={selectMonthlyCalander}
          >
            월간 현황
          </div>
        </div>
      </div>
      <StatisticsDetails calanderSelect={calanderSelect} monthSelect={month} />
    </>
    //link가 아니라 주간/월간 선택값(boolean)에 따라서 캘린더만 다르게 렌더링
    //날짜 선택이나 진행표 같은건 다 똑같음
    //캘린더, 캘린더 제외한 하단 화면 전체(날짜선택상태는 여기 있어야됨)로 나눠서
    //캘린더 컴포넌트에 날짜변경함수 전달하고 그 값에 따라 하단화면에 표시되게 하면 되겠다
  );
}
