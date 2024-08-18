import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalStore } from "../../store/store";

import s from "./styles/LoginPage.module.scss";

import healthMateIcon from "../../assets/loginPage/healthMateIcon.svg";
import healthMateTitleImg from "../../assets/loginPage/healthMateTitleImg.svg";
import kakaoTalkIcon from "../../assets/loginPage/kakaoTalkIcon.svg";

import { getKakaoLogin } from "../../APIs/login/loginApi";
import { useMutation } from 'react-query';



const LogInPage = () => {
  const { setShowBottomBar } = useGlobalStore();

  useEffect(() => {
    setShowBottomBar(false);
    return () => {
      setShowBottomBar(false);
    };
  }, [setShowBottomBar]);


  const getKakaoLoginAPI = useMutation(getKakaoLogin, {
    onSuccess: (response) => {
      console.log('로그인 성공:', response);
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
    },
  })

  const clickKakaoLogin = () => {
    console.log("clickKakaoLogin");
    getKakaoLoginAPI.mutate();
  }

  console.log("로긍니ㅏㅓㅇ")


  return (
    <div className={s.pageWrap}>
      <div className={s.introWrap}>
        <img
          className={s.healthMateIcon}
          src={healthMateIcon}
          alt="healthMateIcon"
        />
        <div className={s.healthMateTitleText}>셀프 건강 진단 서비스</div>
        <img
          className={s.healthMateTitleImg}
          src={healthMateTitleImg}
          alt="healthMateTitleText"
        />
      </div>
      {/* <Link to="/emailCheck" className={s.kakaoLoginBtn} type="button"> */}
      <div>
        {/* <img
          className={s.kakaoTalkImg}
          src={kakaoTalkIcon}
          alt="kakaoTalkIcon"
          onClick={clickKakaoLogin}
        /> */}
        <a href="http://3.39.60.18:9000/login/kakao">
          클릭</a>
        <span>Kakao로 1초만에 시작하기</span>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default LogInPage;
