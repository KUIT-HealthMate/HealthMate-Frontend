import { Link } from "react-router-dom";
import s from "./CoinBlock.module.scss";
import coinImage from "../../../assets/coin.png";
import rightGreyArrow from "../../../assets/rightGreyArrow.svg";
import { useGlobalStore } from "../../../store/store";

interface coinProps {
  deposit: number;
}

export default function CoinBlock({ deposit }: coinProps) {
  const bottomBarState = useGlobalStore((state) => state.setShowBottomBar);
  return (
    <div className={s.blockContainer}>
      <div className={s.titleContainer}>
        <img src={coinImage} alt="coin" className={s.coinImg} />
        <div className={s.title}>나의 코인 개수</div>
      </div>
      <div className={s.contentContainer}>
        <div className={s.depositContainer}>
          <div className={s.deposit}>{deposit}</div>
          <div className={s.unit}>개</div>
        </div>
        <Link to={"/usage"} onClick={() => bottomBarState(false)}>
          <div className={s.noticeContainer}>
            <div className={s.notice}>적립/사용 내역</div>
            <img
              src={rightGreyArrow}
              alt="적립/사용내역"
              className={s.rightArrow}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
