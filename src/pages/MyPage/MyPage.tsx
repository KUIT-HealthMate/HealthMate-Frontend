import MyPageTopBar from "./MyPageTopBar";
import s from "./MyPage.module.scss";
import CoinBlock from "./CoinPage/CoinBlock";
import MyCommunity from "./MyCommunity/MyCommunity";
import MyHealthProblems from "./MyHealthProblems/MyHealthProblems";
import SettingManagement from "./SettingManagement/SettingManage";
import { useMutation } from 'react-query';
import { getProfileInfo } from "../../APIs/myPage/profileApi";
import { useState, useEffect } from "react";
import { profileInfoDto } from "../../dtos/profile/profileDto";

export default function MyPage() {
  const [profileInfo, setProfileInfo] = useState<profileInfoDto>();


  const getProfileInfoMutation = useMutation(getProfileInfo, {
    onSuccess: (response) => {
      console.log('사용자 정보 가져오기 성공:', response);
      setProfileInfo(response);
    },
    onError: (error) => {
      console.error('사용자 정보 가져오기 실패:', error);
    },
  })

  useEffect(() => {
    console.log("profile")

    // 컴포넌트가 마운트될 때 데이터 가져오기
    getProfileInfoMutation.mutate();
    // eslint-disable-next-line
  }, []);


  return (
    <div className={s.background}>
      <MyPageTopBar userName={profileInfo ? profileInfo.nickname : '쿠잇'} userProfileImg={profileInfo ? profileInfo.profileImage : "null"} />
      <CoinBlock deposit={profileInfo ? profileInfo.coin : 0} />
      <MyCommunity myPosts={12} myComments={8} savedPost={12} />
      <MyHealthProblems myProblems={["다리통증", "감기", "코로나"]} />
      <SettingManagement version="ver 1.0" />
    </div>
  );
}
