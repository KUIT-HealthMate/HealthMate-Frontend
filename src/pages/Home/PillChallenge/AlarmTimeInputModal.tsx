import React, { useRef } from 'react'
import s from "../PillChallenge/AlarmTimeInputModal.module.scss"
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
        <div className={s.AlarmTimeInputContent}>hello</div>
    </div>
  )
}

export default AlarmTimeInputModal