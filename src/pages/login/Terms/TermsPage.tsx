import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import s from "./TermsPage.module.scss";
import TermsData from "./assets/TermsData";
import TermsCheck from "./assets/TermsCheck";

import uncheckedCheckBox from "../../../assets/loginPage/uncheckedCheckbox.svg";
import checkedCheckBox from "../../../assets/loginPage/checkedCheckbox.svg";
import rightBraket from "../../../assets/loginPage/rightBraket.svg";
import EachTerm from "./EachTerm";
import TermsDetailPage from "./TermsDetailPage";
import Terms from "./assets/Terms";

interface Props {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}


const TermsPage: React.FC<Props> = ({ modal, setModal }) => {
  const modalBackground = useRef();

  // 오른쪽 버튼 눌렀을 때 약관 내용 표시
  const [modals, setModals] = useState<boolean[]>(
    new Array(TermsData.length).fill(false)
  );

  // 약관 동의 정보
  const [allAgreeCheck, setAllAgreeCheck] = useState<boolean>(false);

  const [checks, setChecks] = useState<TermsCheck[]>(
    TermsData.map(item => ({
      isEssential: item.isEssential,
      isChecked: false,
    }))
  );

  const isAllEssentialChecksTrue = ():boolean => {
    let isTrue:boolean = true;
    checks.map((value, index) => {
      if(value.isEssential == true){
        if(value.isChecked == false){
          isTrue = false;
        }
      }
    });

    return isTrue;
  }

  const agreeAllTerms = (value: boolean) => {
    setAllAgreeCheck(value);
    setChecks(checks.map(checks => ({ ...checks, isChecked: value })));
  };

  // 완료 누르면 동의정보 서버로 전송 (선택항목에 동의여부 정보 전송 필요)
  return (
    <>
      <div
        className={s.AlarmTimeInputWrapper}
        ref={modalBackground as any}
        onClick={(e) => {
          if (e.target === modalBackground.current) {
            setModal(false);
          }
        }}
      >
        <div className={s.AlarmTimeInputContent}>
          <div className={s.TitleBar}>
            <span className={s.AgreeTermsTitle}>약관에 동의해 주세요</span>
          </div>
          <div className={s.TermsDetailWrap}>
            <div className={s.agreeAllTerms}>
              {allAgreeCheck ? (
                <img
                  src={checkedCheckBox}
                  alt="Checked"
                  onClick={() => agreeAllTerms(false)}
                />
              ) : (
                <img
                  src={uncheckedCheckBox}
                  alt="Unchecked"
                  onClick={() => agreeAllTerms(true)}
                />
              )}
              <span>약관 전체동의</span>
            </div>
            {TermsData.map((item, index) => {
              return (
                <EachTerm
                  termData={item}
                  index={index}
                  modals={modals}
                  setModals={setModals}
                  checks={checks}
                  setChecks={setChecks}
                />
              );
            })}
          </div>
          {isAllEssentialChecksTrue() ? (
            <Link
              to="/"
              className={s.agreeTermsCompleteButton}
              onClick={() => setModal(false)}
            >
              <span>확인</span>
            </Link>
          ) : (
            <button
              className={s.agreeTermsCompleteButtonDisabled}
            >
              <span>확인</span>
            </button>
          )}
        </div>
        {TermsData.map((item, index) => {
          return modals[index] ? (
            <TermsDetailPage
              termData={item}
              modals={modals}
              setModals={setModals}
              index={index}
            />
          ) : null;
        })}
      </div>
    </>
  );
};

export default TermsPage;
