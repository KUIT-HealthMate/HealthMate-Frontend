import React from "react";
import { Link, useNavigate } from "react-router-dom";

import s from "../ManagePage.module.scss";

import leftBraket from "../../../../../assets/leftBraket.svg";
import { isPillChallenge } from "../utils/determineChallenge";

interface Props {
  challengeType: string;
  isAddingNewChallenge: boolean;
}

const ChallengeManageHeader: React.FC<Props> = ({
  challengeType,
  isAddingNewChallenge,
}) => {

  let titleString: string;
  if (isPillChallenge(challengeType)) {
    titleString = isAddingNewChallenge ? "알약 챌린지 추가" : "알약 정보 편집";
  } else {
    titleString = isAddingNewChallenge ? "운동 챌린지 추가" : "운동 정보 편집";
  }
  return (
    <>
      <div className={s.statusBar}></div>
      <div className={s.header}>
        <div className={s.titleBar}>
          <Link to="/ChallengeEdit" state={{data:challengeType}} >
            <img src={leftBraket} alt="뒤로가기" />
          </Link>
          <div className={s.title}>{titleString}</div>
        </div>
      </div>
    </>
  );
};

export default ChallengeManageHeader;
