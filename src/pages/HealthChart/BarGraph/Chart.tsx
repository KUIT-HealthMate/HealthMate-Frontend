import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Label, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import styles from "./Chart.module.scss";
import BarGarph from "./BarGraph";
import changeChartButton from "../../../assets/changChartButton.svg";

const Chart: React.FC = () => {

    return (
        <div className={styles.chart}>
            <div className={styles.chartTop}>
                <div className={styles.chartText}>차트보기</div>
                <img className={styles.changeChartBtn} src={changeChartButton}></img>
            </div>
            <BarGarph></BarGarph>
            <div className={styles.chartBottom}>
                <div className={styles.legend}>
                    <div className={styles.legendColor}></div> <div className={styles.legendText}>내 점수</div>
                </div>
                <div className={styles.legend}>
                    <div className={styles.legendColor} style={{ backgroundColor: `#F97F59` }}></div> <div className={styles.legendText}>사용자 평균</div>
                </div>
            </div>
        </div>
    )
}

export default Chart;