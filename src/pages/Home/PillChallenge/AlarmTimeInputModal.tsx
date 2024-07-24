import React, { useRef } from 'react';
import s from "../PillChallenge/AlarmTimeInputModal.module.scss";
import blackX from "../../../assets/blackX.svg";
import modal from "../PillChallenge/PillAddingPage";

interface Props {
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlarmTimeInputModal:React.FC<Props> = ({modal, setModal}) => {
  const modalBackground = useRef();

  return (
    <div className={s.AlarmTimeInputWrapper} ref={modalBackground as any} onClick={e => {
        if(e.target === modalBackground.current) {
            setModal(false);
        }
    }}>
        <div className={s.AlarmTimeInputContent}>
          <div className={s.TitleBar}>
            <span className={s.AlarmTimeInputTitle}>알림 시간 설정</span>
            <button type="button" onClick={() => setModal(false)}><img src={blackX} alt="" /></button>
          </div>
          <div>

          </div>
          <button type="button" className={s.AlarmTimeInputCompleteButton}>완료</button>
        </div>
    </div>
  )
}

export default AlarmTimeInputModal