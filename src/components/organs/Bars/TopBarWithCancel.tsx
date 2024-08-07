import styles from './TopBarWithCancel.module.scss'
import backButton from "../../../assets/backButton.svg";
import cancelIcon from "../../../assets/cancelicon.svg";
import backward from "../../../assets/backward.svg"
import { useNavigate } from 'react-router-dom';

export default function TopBarWithCancel() {

    const navigate = useNavigate();
    return (
        <div className={styles.TopBar}>
            <img src={backward} style={{ width: `9px`, height: `16px` }} onClick={() => (navigate(-1))}></img>
            <img src={cancelIcon} style={{ width: `16px`, height: `16px` }} onClick={() => (navigate('/'))}></img>

        </div>
    )
}