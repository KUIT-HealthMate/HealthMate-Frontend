import PageTopBar from "../../../components/organs/Bars/PageTopBar";
import CoinRecord from "./CoinRecord";

export default function CoinDepositAndUsage() {
  return (
    <div>
      <PageTopBar
        barName="코인 적립 / 사용 내역"
        bottomBarState={true}
        link="/mypage"
      />
      <CoinRecord
        date="2024. 10. 29"
        reason="일일 챌린지 수행도 80 이상"
        difference={10}
      />
      <CoinRecord
        date="2024. 10. 29"
        reason="일일 챌린지 수행도 80 이상"
        difference={-10}
      />
      <CoinRecord
        date="2024. 10. 29"
        reason="일일 챌린지 수행도 80 이상"
        difference={20}
      />
      <CoinRecord
        date="2024. 10. 29"
        reason="일일 챌린지 수행도 80 이상"
        difference={30}
      />
    </div>
  );
}
