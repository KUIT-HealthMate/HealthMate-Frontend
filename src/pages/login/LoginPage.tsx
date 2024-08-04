import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import {useGlobalStore} from "../../store/store";

import s from "./styles/LoginPage.module.scss";

import healthMateIcon from "../../assets/loginPage/healthMateIcon.svg";
import healthMateTitleImg from "../../assets/loginPage/healthMateTitleImg.svg";
import kakaoTalkIcon from "../../assets/loginPage/kakaoTalkIcon.svg";


const LogInPage = () => {
  const { setShowBottomBar } = useGlobalStore();
  
  useEffect(() => {
    setShowBottomBar();
    return () => {
      setShowBottomBar();
    };
  },[])

  return (
    <div className={s.pageWrap}>
      <div className={s.introWrap}>
        <img className={s.healthMateIcon} src={healthMateIcon} alt="healthMateIcon" />
        <div className={s.healthMateTitleText} >셀프 건강 진단 서비스</div>
        <img className={s.healthMateTitleImg} src={healthMateTitleImg} alt="healthMateTitleText" />
      </div>
      <Link to="/emailCheck" className={s.kakaoLoginBtn} type="button">
        <img className={s.kakaoTalkImg} src={kakaoTalkIcon} alt="kakaoTalkIcon" />
        <span>Kakao로 1초만에 시작하기</span>
      </Link>
    </div>
  )
}

export default LogInPage