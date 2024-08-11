import { useState } from "react";
import dayjs from "dayjs";
import PageTopBar from "../../../components/organs/Bars/PageTopBar";
import forward from "../../../assets/forward.svg";
import backward from "../../../assets/backward.svg";
import s from "./ChallengeStatistics.module.scss";
import StatisticsDetails from "./StatisticsDetails";
//현재 목업데이터를 챌린지 통계화면에서 로드 후 props로 하위 컴포넌트에 전달
import { julyMock } from "../../../test/mock/mockup";
//데이터 로드(월간/주간달력선택, 기간변경 시 마다)

export default function ChallengeStatistics() {
  const [period, setPeriod] = useState<dayjs.Dayjs>(dayjs());

  const reduceMonth = () => {
    const reducedDay = dayjs(period).subtract(1, "month");
    setPeriod(reducedDay);
    //한달 전 데이터 받아오기
  };

  const increaseMonth = () => {
    const increasedDay = dayjs(period).add(1, "month");
    setPeriod(increasedDay);
    //한달 뒤 데이터 받아오기
  };

  const reduceWeek = () => {
    const reducedDay = dayjs(period).subtract(1, "week");
    setPeriod(reducedDay);
    //한주 전 데이터 받아오기
  };

  const increaseWeek = () => {
    const increasedDay = dayjs(period).add(1, "week");
    setPeriod(increasedDay);
    //한주 뒤 데이터 받아오기
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
      <PageTopBar barName="챌린지 통계" bottomBarState={true} link="/" />
      <div className={s.selectorContainer}>
        <div className={s.dateSelector}>
          <img
            src={backward}
            alt="lastMonth"
            className={s.selector}
            onClick={calanderSelect ? reduceWeek : reduceMonth}
          />
          <div className={s.month}>{period.format("YYYY.MM")}</div>
          <img
            src={forward}
            alt="nextMonth"
            className={s.selector}
            onClick={calanderSelect ? increaseWeek : increaseMonth}
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
      <StatisticsDetails
        calanderSelect={calanderSelect}
        periodSelect={period}
        data={julyMock}
      />
    </>
    //link가 아니라 주간/월간 선택값(boolean)에 따라서 캘린더만 다르게 렌더링
    //날짜 선택이나 진행표 같은건 다 똑같음
    //캘린더, 캘린더 제외한 하단 화면 전체(날짜선택상태는 여기 있어야됨)로 나눠서
    //캘린더 컴포넌트에 날짜변경함수 전달하고 그 값에 따라 하단화면에 표시되게 하면 되겠다
  );
}
