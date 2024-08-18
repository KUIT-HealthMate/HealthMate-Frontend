import { useEffect } from "react";
import { useGlobalStore } from "../../store/store";

import s from "./styles/LoginPage.module.scss";

import healthMateIcon from "../../assets/loginPage/healthMateIcon.svg";
import healthMateTitleImg from "../../assets/loginPage/healthMateTitleImg.svg";
import kakaoBtn from "../../assets/kakaoBtn.svg";


const LogInPage = () => {
  const { setShowBottomBar } = useGlobalStore();

  useEffect(() => {
    setShowBottomBar(false);
    return () => {
      setShowBottomBar(false);
    };
  }, [setShowBottomBar]);


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

        <a href="http://3.39.60.18:9000/login/kakao" className={s.kakaoWrap}>
          <img
            className={s.kakaoBtn}
            src={kakaoBtn}
            alt="kakaoTalkIcon"
          // onClick={clickKakaoLogin}
          />
        </a>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default LogInPage;
