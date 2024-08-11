import { Link } from "react-router-dom";
import s from "./PageTopBar.module.scss";
import backButton from "../../../assets/backButton.svg";
import { useGlobalStore } from "../../../store/store";

interface PageTopBarProps {
  barName: string;
  bottomBarState: boolean;
  link: string;
}

export default function PageTopBar({
  barName,
  bottomBarState,
  link,
}: PageTopBarProps) {
  const setBottomBarState = useGlobalStore((state) => state.setShowBottomBar);
  return (
    <div className={s.pageTopBarContainer}>
      <Link to={link} onClick={() => setBottomBarState(bottomBarState)}>
        <img src={backButton} alt="goBack" className={s.backButton} />
      </Link>

      <div className={s.barName}>{barName}</div>
    </div>
  );
}
