import React from "react";
import LinearChartSetting from "./LinearChartSetting";

const dates = ["11일", "12일", "13일", "14일", "15일", "16일", "17일"];
const myScores = [80, 60, 100, 80, 75, 80, 55];
const averageScores = [40, 20, 50, 70, 15, 40, 55];

export default function LinearChart() {
  return (
    <div>
      <LinearChartSetting
        dates={dates}
        myScores={myScores}
        averageScores={averageScores}
      />
    </div>
  );
}
