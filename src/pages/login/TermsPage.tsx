import React from 'react'
import { useRef } from 'react';
import s from "./TermsPage.module.scss";

import uncheckedCheckBox from "../../assets/loginPage/uncheckedCheckbox.svg";
import checkedCheckBox from "../../assets/loginPage/checkedCheckbox.svg";
import rightBraket from "../../assets/loginPage/rightBraket.svg";

interface Props {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TermsPage: React.FC<Props> = ({modal, setModal}) => {


  const modalBackground = useRef();

  

  const handleTimeSet = () => {
    setModal(false);
    //handleAlarmTime();
  }

  return (
    <div className={s.AlarmTimeInputWrapper} ref={modalBackground as any} onClick={e => {
        if(e.target === modalBackground.current) {
            setModal(false);
        }
    }}>
        <div className={s.AlarmTimeInputContent}>
          <div className={s.TitleBar}>
            <span className={s.AgreeTermsTitle}>약관에 동의해 주세요</span>
          </div>
          <div className={s.TermsDetailWrap}>
            <div className={s.agreeAllTerms}>
              <img src={uncheckedCheckBox} alt="Unchecked" />
              <img src={checkedCheckBox} alt="Checked" />
              <span>약관 전체동의</span>
            </div>
            <div className={s.eachTermWrap}>
              <img src={uncheckedCheckBox} alt="Unchecked" />
              <img src={checkedCheckBox} alt="Checked" />
              <span>서비스 이용약관 전체동의(필수)</span>
              <button type="button"><img src={rightBraket} alt="" /></button>
            </div>
            <div className={s.eachTermWrap}>
              <img src={uncheckedCheckBox} alt="Unchecked" />
              <img src={checkedCheckBox} alt="Checked" />
              <span>개인 정보 수집 및 이용 동의(필수)</span>
              <button type="button"><img src={rightBraket} alt="" /></button>
            </div>
          </div>
          <button type="button" className={s.agreeTermsCompleteButton} onClick={() => handleTimeSet()}>확인</button>
        </div>
    </div>
  )
}

export default TermsPage