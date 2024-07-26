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


const BarGraph: React.FC = () => {


    return (
        // <div className={styles.barGraph}>
        <ResponsiveContainer className={styles.BarGraphWrap} width="100%" height={400}>
            <BarChart className={styles.BarGraph}
                data={data}
                margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="0" vertical={false} />
                <XAxis className={styles.labelNames} dataKey="date" />

                {/* <Tooltip /> */}
                {/* <Legend /> */}
                <Bar dataKey="myScore" fill="#82ca9d" name="내 점수" shape={RoundedBar} />
                <Bar dataKey="avgScore" fill="#ff7f7f" name="사용자 평균" />
            </BarChart>
        </ResponsiveContainer>
        // </div>
    )

}

export default BarGraph;