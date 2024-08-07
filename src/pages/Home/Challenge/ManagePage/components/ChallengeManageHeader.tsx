import React from 'react'
import { useNavigate } from 'react-router-dom';

import s from "../ManagePage.module.scss"

import leftBraket from "../../../../../assets/leftBraket.svg";
import { isHabitChallenge, isPillChallenge } from '../utils/determineChallenge';

interface Props {
    challengeType: string;
    isAddingNewChallenge: boolean;
}

const ChallengeManageHeader:React.FC<Props> = ({challengeType, isAddingNewChallenge}) => {
    const navigate = useNavigate();

    let titleString: string;
    if(isPillChallenge(challengeType)){
        titleString =  isAddingNewChallenge ? "알약 챌린지 추가" : "알약 정보 편집";
    } else {
        titleString = isAddingNewChallenge ? "운동 챌린지 추가" : "운동 정보 편집";
    }
  return (
    <>
    <div className={s.statusBar}></div>
        <div className={s.header}>
          <div className={s.titleBar}>
            <button onClick={() => navigate(-1)}>
              <img src={leftBraket} alt="뒤로가기" />
            </button>
            <div className={s.title}>
              {titleString}
            </div>
          </div>
        </div>
    </>
  )
}

export default ChallengeManageHeader