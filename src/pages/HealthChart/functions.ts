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

export function setPredictionData(
  dataType: chartDataType,
  dayData: dayResult | null,
  noneDayData: notDayResult | null
) {
  const result = []; // 위험질환, 위험점수, 설명, 추천챌린지 순
  if (dayData !== null) {
    if (dataType === "habbit") {
      result.push(dayData?.life.lifeStyleResponse.riskSymptoms);
      result.push(dayData?.life.lifeStyleResponse.riskScore);
      result.push(dayData?.life.lifeStyleResponse.description);
      result.push(dayData?.life.lifeStyleResponse.challenges);
      return result;
    } else if (dataType === "mealPattern") {
      result.push(dayData?.meal.mealPatternResponse.riskSymptoms);
      result.push(dayData?.meal.mealPatternResponse.riskScore);
      result.push(dayData?.meal.mealPatternResponse.description);
      result.push(dayData?.meal.mealPatternResponse.challenges);
      return result;
    } else {
      result.push(dayData?.sleep.sleepPatternResponse.riskSymptoms);
      result.push(dayData?.sleep.sleepPatternResponse.riskScore);
      result.push(dayData?.sleep.sleepPatternResponse.description);
      result.push(dayData?.sleep.sleepPatternResponse.challenges);
      return result;
    }
  } else {
    if (dataType === "habbit") {
      result.push(noneDayData?.life.riskSymptoms);
      result.push(noneDayData?.life.riskScore);
      result.push(noneDayData?.life.description);
      result.push(noneDayData?.life.challenges);
      return result;
    } else if (dataType === "mealPattern") {
      result.push(noneDayData?.life.riskSymptoms);
      result.push(noneDayData?.life.riskScore);
      result.push(noneDayData?.life.description);
      result.push(noneDayData?.life.challenges);
      return result;
    } else {
      result.push(noneDayData?.life.riskSymptoms);
      result.push(noneDayData?.life.riskScore);
      result.push(noneDayData?.life.description);
      result.push(noneDayData?.life.challenges);
      return result;
    }
  }
}
