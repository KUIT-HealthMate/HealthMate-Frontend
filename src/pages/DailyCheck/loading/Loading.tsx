import styles from "../loading/Loading.module.scss"
import { useGlobalStore } from "../../../store/store";
import { useEffect } from "react";
import loading from "../../../assets/loading.svg"

export default function Loading() {

    const setShowBottomBar = useGlobalStore((state) => state.setShowBottomBar);
    useEffect(() => {
        console.log("마운트됨");
        setShowBottomBar(false);
        return () => {
            setShowBottomBar(false);
        };
    }, [setShowBottomBar]);

    return (
        <div className={styles.loadingPage}>
            <div className={styles.textWrap}>
                <div className={styles.title}>건강 진단 중</div>
                <div className={styles.subTitle}>잠시만 기다려주세요.</div>
            </div>
            <img className={styles.loadingImg} src={loading} alt="loading"></img>
        </div>
    )
}