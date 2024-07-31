import MyPageTopBar from "./MyPageTopBar";
import s from "./MyPage.module.scss";
import CoinBlock from "./CoinPage/CoinBlock";

export default function MyPage() {
  return (
    <div className={s.background}>
      <MyPageTopBar userName="유저이름" userProfileImg="null" />
      <CoinBlock deposit={120} />
      <CoinBlock deposit={120} />
      <CoinBlock deposit={120} />
      <CoinBlock deposit={120} />
      <CoinBlock deposit={120} />
    </div>
  );
}
