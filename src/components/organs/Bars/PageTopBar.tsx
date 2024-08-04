import { Link } from "react-router-dom";
import s from "./PageTopBar.module.scss";
import backButton from "../../../assets/backButton.svg";

interface PageTopBarProps {
  barName: string;
  setBottomBarState: () => void | null;
  link: string;
}

export default function PageTopBar({
  barName,
  setBottomBarState,
  link,
}: PageTopBarProps) {
  return (
    <div className={s.pageTopBarContainer}>
      <Link to={link} onClick={setBottomBarState}>
        <img src={backButton} alt="goBack" className={s.backButton} />
      </Link>

      <div className={s.barName}>{barName}</div>
    </div>
  );
}
