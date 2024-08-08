import styles from "./ProgressBar.module.scss";

interface percentProps {
  percent: number;
}

const ProgressBar = (props: percentProps) => {
  return (
    <div className={styles.progressBarWrap}>
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${props.percent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
