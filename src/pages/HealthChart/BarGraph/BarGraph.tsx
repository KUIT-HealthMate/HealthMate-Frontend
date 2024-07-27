import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Label, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import styles from "./BarGraph.module.scss";

const data = [
    { date: '11일', myScore: 80, avgScore: 50 },
    { date: '12일', myScore: 60, avgScore: 25 },
    { date: '13일', myScore: 100, avgScore: 50 },
    { date: '14일', myScore: 80, avgScore: 50 },
    { date: '15일', myScore: 75, avgScore: 15 },
    { date: '16일', myScore: 80, avgScore: 50 },
    { date: '17일', myScore: 55, avgScore: 50 },
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

const CustomBarLabel = (props: any) => {
    const { value, fill, x, y, width, height } = props;

    return <text
        x={x + (width / 2)}
        y={y}
        dy={-10}
        fill={'#05697F'}
        fontSize='1.2em'
        textAnchor="middle">
        {value}
    </text>;
}

const BarGraph: React.FC = () => {

    return (
        <BarChart width={600} height={500} data={data}>
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
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar className={styles.barText} dataKey="myScore" fill="url(#colorMyScore)" name="내 점수" shape={RoundedBar} label={CustomBarLabel} />
            <Bar dataKey="avgScore" fill="url(#colorAvgScore)" name="사용자 평균" shape={RoundedBar} label={CustomBarLabel} />
        </BarChart>
    )

}

export default BarGraph;