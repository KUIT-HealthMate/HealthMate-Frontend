import styles from "./TopBarWithBackBtn.module.scss";
import backward from "../../../assets/backward.svg";
import { useNavigate } from "react-router-dom";

export default function TopBarWithBackBtn() {
  const navigate = useNavigate();
  return (
    <div className={styles.TopBar}>
      <img
        src={backward}
        style={{ width: `9px`, height: `16px` }}
        alt="뒤로가기"
        onClick={() => navigate(-1)}
      ></img>
    </div>
  );
}
