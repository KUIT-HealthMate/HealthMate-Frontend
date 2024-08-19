import dayjs from "dayjs";
import { chartDataType, periodName } from "./HealthChart";
import { dayResult, notDayResult } from "./dataTypes";

export function selectPeriod(
  period: periodName,
  today: dayjs.Dayjs
): dayjs.Dayjs {
  switch (period) {
    case "day":
      return today;
    case "week":
      if (today.day() === 0) {
        return today.subtract(6, "day").subtract(1, "week");
      } else {
        return today.startOf("week").add(1, "day").subtract(1, "week");
      }
    case "month":
      return today.subtract(1, "month");
  }
}

export function formattingDate(period: periodName, today: dayjs.Dayjs): string {
  const periodNow = selectPeriod(period, today);
  switch (period) {
    case "day":
      return periodNow.format("YYYY.MM.DD");
    case "week":
      const lastDate = periodNow.add(6, "day");
      return `${periodNow.format("YYYY.MM.DD")} ~ ${lastDate.format("MM.DD")}`;
    case "month":
      return periodNow.format("YYYY.MM");
  }
}

export function setHabbitScoreData(
  dataType: chartDataType,
  dayData: dayResult | null,
  noneDayData: notDayResult | null
) {
  const result = []; // 내점수,평균점수 순으로 저장됨
  if (dayData !== null) {
    if (dataType === "habbit") {
      result.push(dayData?.life.lifeStyleResponse.lifeStyleScore);
      result.push(dayData?.life.lifeAverage);
      return result;
    } else if (dataType === "mealPattern") {
      result.push(dayData?.meal.mealPatternResponse.dailyMealPatternScore);
      result.push(dayData?.meal.mealAverage);
      return result;
    } else {
      result.push(dayData?.sleep.sleepPatternResponse.dailySleepPatternScore);
      result.push(dayData?.sleep.sleepAverage);
      return result;
    }
  } else {
    if (dataType === "habbit") {
      result.push(noneDayData?.life.lifeScore);
      result.push(noneDayData?.life.lifeAvgScore);
      return result;
    } else if (dataType === "mealPattern") {
      result.push(noneDayData?.meal.mealScore);
      result.push(noneDayData?.meal.mealAvgScore);
      return result;
    } else {
      result.push(noneDayData?.sleep.sleepScore);
      result.push(noneDayData?.sleep.sleepAvgScore);
      return result;
    }
  }
}

export function setChartData(
  dataType: chartDataType,
  noneDayData: notDayResult | null
) {
  const result: number[] = [];
  if (noneDayData !== null) {
    switch (dataType) {
      case "habbit":
        noneDayData.life.lifeStyleScores.forEach((item) => {
          result.push(item);
        });
        return result;
      case "mealPattern":
        noneDayData.meal.mealPatternScores.forEach((item) => {
          result.push(item);
        });
        return result;
      case "sleepingPattern":
        noneDayData.sleep.sleepPatternScores.forEach((item) => {
          result.push(item);
        });
        return result;
    }
  } else return [0, 0, 0, 0];
}

export function setAverageChartData(
  dataType: chartDataType,
  noneDayData: notDayResult | null
) {
  const result: number[] = [];
  if (noneDayData !== null) {
    switch (dataType) {
      case "habbit":
        noneDayData.life.lifeStyleAverages.forEach((item) => {
          result.push(item);
        });
        return result;
      case "mealPattern":
        noneDayData.meal.mealPatternAverages.forEach((item) => {
          result.push(item);
        });
        return result;
      case "sleepingPattern":
        noneDayData.sleep.sleepPatternAverages.forEach((item) => {
          result.push(item);
        });
        return result;
    }
  } else return [0, 0, 0, 0];
}
