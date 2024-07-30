import React, { useRef, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart } from "chart.js";
import s from "./LinearChartSetting.module.scss";

Chart.register(ChartDataLabels);

interface ChartProps {
  dates: number[];
  myScores: number[];
  averageScores: number[];
}

export default function LinearChartSetting({
  dates,
  myScores,
  averageScores,
}: ChartProps) {
  const chartRef = useRef<any>(null);
  const [gradientMyScores, setGradientMyScores] = useState<string>("");
  const [gradientAverageScores, setGradientAverageScores] =
    useState<string>("");

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const ctx = chart.ctx;
      const gradientMy = ctx.createLinearGradient(0, 0, 0, 140);
      gradientMy.addColorStop(0, "#7ADCC599");
      gradientMy.addColorStop(1, "#FFFFFF99");

      const gradientAvg = ctx.createLinearGradient(0, 0, 0, 180);
      gradientAvg.addColorStop(0, "#F97F59");
      gradientAvg.addColorStop(1, "#FFFFFF99");

      setGradientMyScores(gradientMy);
      setGradientAverageScores(gradientAvg);
    }
  }, [chartRef]);

  const data = {
    labels: dates,
    datasets: [
      {
        data: averageScores,
        fill: "origin",
        backgroundColor: gradientAverageScores,
        borderColor: "#F97F59",
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#F97F59",
        pointHoverBackgroundColor: "#ffffff",
        pointHoverBorderColor: "#F97F59",
        pointBorderWidth: 2.8,
        pointRadius: 3.5,
        order: 0,
        borderWidth: 1.5,
      },
      {
        data: myScores,
        fill: true,
        backgroundColor: gradientMyScores,
        borderColor: "#0E9494",
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#0E9494",
        pointHoverBackgroundColor: "#ffffff",
        pointHoverBorderColor: "#0E9494",
        pointBorderWidth: 2.8,
        pointRadius: 3.5,
        order: 1,
        borderWidth: 1.5,
      },
    ],
  };

  const options = {
    type: "line",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: (context: any) => context.datasetIndex === 1,
        color: "#0E9494",
        align: "top" as "top",
        anchor: "end" as "end",
        font: { family: "Pretendard", weight: "600" as "bold", size: 12 },
        formatter: (value: any) => `${value}`,
        offset: -1,
      },
    },
    label: {},
    layout: {
      margin: {
        bottom: 0,
      },
      border: {
        bottom: 0,
      },
      padding: {
        bottom: 0,
      },
    },
    scales: {
      x: {
        display: false,
        grid: { display: false },
        title: {},
        ticks: { display: false },
      },
      y: {
        display: false,
        grid: {},
        title: {},
        ticks: {
          display: false,
          stepSize: 27.5,
        },
        min: 0,
        max: 110,
      },
    },
  };

  return (
    <div className={s.componentContainer}>
      <Line
        ref={chartRef}
        data={data}
        options={options}
        plugins={[ChartDataLabels]}
      />
    </div>
  );
}
