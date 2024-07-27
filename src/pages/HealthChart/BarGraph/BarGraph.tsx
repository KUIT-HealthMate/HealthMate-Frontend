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

const CustomBarLabelMy = (props: any) => {
    const { value, fill, x, y, width, height } = props;

    return <text
        x={x + (width / 2)}
        y={y}
        dy={'-2.5px'}
        fill={'#05697F'}
        fontSize='10px'
        textAnchor="middle">
        {value}
    </text>;
}

const CustomBarLabelAvg = (props: any) => {
    const { value, fill, x, y, width, height } = props;

    return <text
        x={x + (width / 2)}
        y={y}
        dy={'-2.5px'}
        fill={'#B3B3B3'}
        fontSize='10px'
        textAnchor="middle">
        {value}
    </text>;
}

const BarGraph: React.FC = () => {

    return (
        <ResponsiveContainer width='76%' height={170}>
            <BarChart data={data} margin={{ top: 10, right: 20, bottom: 20, left: 80 }}>
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
                <CartesianGrid strokeDasharray="10 0" vertical={false} />
                <XAxis dataKey="date" dy={'10px'} tick={{
                    stroke: '#8F8F8F', strokeWidth: 1.2, fontSize: '14px', fontFamily: 'Pretendard'
                    , fontStyle: "normal", fontWeight: 500
                }} />

                {/* <Legend /> */}
                <Bar dataKey="myScore" fill="url(#colorMyScore)" name="내 점수" shape={RoundedBar} label={CustomBarLabelMy} />
                <Bar dataKey="avgScore" fill="url(#colorAvgScore)" name="사용자 평균" shape={RoundedBar} label={CustomBarLabelAvg} />
            </BarChart>
        </ResponsiveContainer>
    )

}

export default BarGraph;