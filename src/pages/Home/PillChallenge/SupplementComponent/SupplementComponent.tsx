import styles from "./SupplementComponent.module.scss";
import { usePillInfoStore, pillPage } from "../../../../store/usePillInfoStore";
import pillInfo from "../../../../store/pillInfo";


function changeIdxToString(idx: number): string {
    if (idx == 1) {
        return "breakfast";
    } else if (idx == 2) {
        return "lunch";
    } else if (idx == 3) {
        return "dinner";
    } else {
        return "";
    }
}


interface PillInfo {
    pill: pillInfo;
    index: number;
}

const SupplementComponent = (props: PillInfo) => {
    const {
        PillInfo,
        setPillInfo,
        setIntakeRecord,
        getIntakeRecord,
        getIntakeTime,
        getMealTime,
    } = usePillInfoStore();


    return (
        <div className={styles.PillInfo}>
            <div className={styles.PillInfoHeader}>
                <h1 className={styles.PillInfoName}>{props.pill.name}</h1>{" "}

                <h5 className={styles.PillInfoInfo}>{getIntakeTime(props.pill)}</h5>
            </div>
            <div>
                <div className={styles.PillInfoTimes}>
                    {props.pill.dailyIntakePeriod &&
                        Object.entries(props.pill.dailyIntakePeriod).map(
                            ([key, time], idx) => {

                                if (time) {
                                    return (
                                        <div
                                            key={idx}
                                            className={styles.PillInfoTimeButton}
                                            onClick={() =>
                                                setIntakeRecord(props.pill.id, changeIdxToString(idx))
                                            }
                                            style={
                                                getIntakeRecord(props.pill.id, changeIdxToString(idx))
                                                    ? {
                                                        background: `rgba(14, 148, 148, 0.1)`,
                                                        border: `1px solid #0E9494`,
                                                        color: `#0B7575`,
                                                    }
                                                    : {
                                                        background: `#F5F6F8`,
                                                        border: `1px solid #B3B3B3`,
                                                        color: `#B3B3B3`,
                                                    }
                                            }
                                        >
                                            {getMealTime(idx)}
                                        </div>
                                    );
                                }
                            }
                        )}
                </div>
            </div>
        </div>
    )

}

export default SupplementComponent;
