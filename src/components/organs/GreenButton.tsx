import styles from "./Button.module.scss";

// ({ questions, candidates }: Props)

interface Props {
    text: string;
}

const GreenButton = ({ text }: Props) => {

    return (
        <button className={styles.GreenButton}>
            <p className={styles.GreenButtonText}>{text}</p>
        </button>
    )
}

export default GreenButton



