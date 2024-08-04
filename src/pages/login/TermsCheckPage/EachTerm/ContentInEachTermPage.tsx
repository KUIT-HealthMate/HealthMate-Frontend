import React, { useRef } from 'react'

import s from "../../styles/TermsPage.module.scss";
import Terms from '../assets/Terms';
import setMatchingModals from '../utils/setMatchingModal';
import { useNavigate } from 'react-router-dom';

interface Props {
  termData: Terms;
  modals: boolean[];
  setModals: React.Dispatch<React.SetStateAction<boolean[]>>
  index: number;
}

const TermsDetailPage:React.FC<Props> = ({termData, modals, setModals, index}) => {
  const navigate = useNavigate();

  const background = useRef();

  

  return (
    <>
      <div
          className={s.AlarmTimeInputWrapper}
          ref={background as any}
          onClick={(e) => {
            if (e.target === background.current) {
              setMatchingModals(modals, index, setModals)
            }
          }}
        >
      </div>
      <div className={s.AlarmTimeInputContent}>
        <span className={s.termDetailTitle}>{termData.title}</span>
        <span className={s.termDetailContent}>{termData.content}</span>
        <button className={s.agreeTermsCompleteButton}type="button" onClick={() => setMatchingModals(modals, index, setModals)}>확인</button>
      </div>
    </>
  )
}

export default TermsDetailPage