import MyPageTopBar from "./MyPageTopBar";
import s from "./MyPage.module.scss";
import CoinBlock from "./CoinPage/CoinBlock";
import MyCommunity from "./MyCommunity/MyCommunity";
import MyHealthProblems from "./MyHealthProblems/MyHealthProblems";
import SettingManagement from "./SettingManagement/SettingManage";

export default function MyPage() {
  return (
    <div className={s.background}>
      <MyPageTopBar userName="유저이름" userProfileImg="null" />
      <CoinBlock deposit={120} />
      <MyCommunity myPosts={12} myComments={8} savedPost={12} />
      <MyHealthProblems myProblems={["다리통증", "감기", "코로나"]} />
      <SettingManagement version="ver 1.0" />
    </div>
  );
}
