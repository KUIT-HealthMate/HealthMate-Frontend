import { useGlobalStore } from "../../store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import TermsPage from "./TermsCheckPage/TermsPage";

import s from "./styles/EmailCheckPage.module.scss";

import kakaoTalkIconWithBackground from "../../assets/loginPage/kakakTalkIconWithBackground.svg";
import leftBraket from "../../assets/leftBraket.svg";

const EmailCheckPage = () => {
  const { setShowBottomBar } = useGlobalStore();
  const navigate = useNavigate();

  useEffect(() => {
    setShowBottomBar(false);
    return () => {
      setShowBottomBar(false);
    };
  }, [setShowBottomBar]);

  // 서버에서 이메일 받아서 설정
  // const handleEmailName = () => {
  //   const span = document.getElementsByClassName(s.emailText)[0] as HTMLSpanElement;
  //   span.innerText = "";
  // }

  const handleBackbutton = () => {
    navigate(-1);
  };

  // 약관 모달창 state값. true 시 모달창이 표시됨.
  const [modal, setModal] = useState(false);

  return (
    <div className={s.pageWrap}>
      <div className={s.emailCheckSection}>
        <button type="button" onClick={() => handleBackbutton()}>
          <img className={s.leftBraketImg} src={leftBraket} alt="" />
        </button>
        <span className={s.emailCheckText}>이메일을 확인해주세요</span>
        <div className={s.emailWrap}>
          <img src={kakaoTalkIconWithBackground} alt="" />
          <span className={s.emailText}>user@example.com</span>
        </div>
      </div>
      <button
        className={s.emailNextButton}
        type="button"
        onClick={() => setModal(true)}
      >
        다음
      </button>
      {modal === true ? <TermsPage modal={modal} setModal={setModal} /> : null}
    </div>
  );
};

export default EmailCheckPage;
