import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const weeklyData = [
  { date: "11일", myScore: 80, avgScore: 50 },
  { date: "12일", myScore: 60, avgScore: 25 },
  { date: "13일", myScore: 100, avgScore: 50 },
  { date: "14일", myScore: 80, avgScore: 50 },
  { date: "15일", myScore: 75, avgScore: 15 },
  { date: "16일", myScore: 80, avgScore: 50 },
  { date: "17일", myScore: 55, avgScore: 50 },
];
const monthlyData = [
  { date: "첫째 주", myScore: 80, avgScore: 50 },
  { date: "둘째 주", myScore: 60, avgScore: 25 },
  { date: "셋째 주", myScore: 75, avgScore: 30 },
  { date: "넷째 주", myScore: 75, avgScore: 15 },
];

const RoundedBar = (props: any) => {
  const { fill, x, y, width, height } = props;
  console.log(width, height);
  const radius = width / 2; // 원하는 둥글기 정도

  return (
    <path
      d={`
          M${x},${y + height}
          L${x},${y + radius}
          Q${x},${y} ${x + radius},${y}
            L${x + width - radius},${y}
            Q${x + width},${y} ${x + width},${y + radius}
            L${x + width},${y + height}

          Z
        `}
      fill={fill}
      stroke="none"
    />
  );
};

const CustomBarLabelMy = (props: any) => {
  const { value, x, y, width } = props;

  return (
    <text
      x={x + width / 2}
      y={y}
      dy={"-2.5px"}
      fill={"#05697F"}
      fontSize="10px"
      textAnchor="middle"
    >
      {value}
    </text>
  );
};

const CustomBarLabelAvg = (props: any) => {
  const { value, x, y, width } = props;

  return (
    <text
      x={x + width / 2}
      y={y}
      dy={"-2.5px"}
      fill={"#B3B3B3"}
      fontSize="10px"
      textAnchor="middle"
    >
      {value}
    </text>
  );
};

const BarGraph: React.FC = () => {
  const [chartType, setChartType] = useState("weekly");
  const [data, setData] = useState(weeklyData);
  const [percent, setPercent] = useState(98 / 2 / data.length / 2);
  const [barSize, setBarSize] = useState(`${percent}%`);

  //통신으로 percent값 가져오기
  useEffect(() => {
    console.log(chartType);

    if (chartType === "weekly") {
      setData(weeklyData);
      setPercent(98 / 2 / data.length / 2);
      setBarSize(barSize);
      setChartType("weekly");
    } else {
      setData(monthlyData);
      setPercent(98 / 2 / data.length / 2);
      setBarSize(`${percent}%`);
      setChartType("monthly");
    }
  }, [barSize, chartType, data.length, percent]);

  return (
    <div style={{ width: `100%`, height: `66%` }}>
      {/* <div> */}
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10 }}>
          <defs>
            <linearGradient id="colorMyScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0E9494" stopOpacity={1} />
              <stop offset="95%" stopColor="#7ADCC5" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="colorAvgScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F97F59" stopOpacity={1} />
              <stop offset="95%" stopColor="#F2F5D8" stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            dy={"10px"}
            axisLine={false}
            tickLine={false}
            tick={{
              stroke: "#8F8F8F",
              strokeWidth: 1,
              fontSize: "14px",
              fontFamily: "Pretendard",
              fontStyle: "normal",
              fontWeight: 500,
              fill: "#8F8F8F",
            }}
          />

          <Bar
            dataKey="myScore"
            fill="url(#colorMyScore)"
            name="내 점수"
            shape={RoundedBar}
            label={CustomBarLabelMy}
            barSize={barSize}
          />
          <Bar
            dataKey="avgScore"
            fill="url(#colorAvgScore)"
            name="사용자 평균"
            shape={RoundedBar}
            label={CustomBarLabelAvg}
            barSize={barSize}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarGraph;
