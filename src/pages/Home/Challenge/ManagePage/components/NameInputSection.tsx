import React, { ChangeEvent } from "react";
import s from "../ManagePage.module.scss";

import InputClearButton from "./InputClearButton";
import { isPillChallenge } from "../utils/determineChallenge";

interface Props {
  isAddingNewChallenge: boolean;
  handleChangeFunc: (e: ChangeEvent<HTMLInputElement>) => void;
  defaultValue: string;
  challengeType: string;
}

const NameInputSection: React.FC<Props> = ({
  isAddingNewChallenge,
  handleChangeFunc,
  defaultValue,
  challengeType
}) => {

  let placeHolderMessage: string = isPillChallenge(challengeType) ? "알약" : "운동";
  placeHolderMessage += " 이름을 입력해주세요";
  

  return (
    <div className={s.detailDiv}>
      <span className={s.detailTitle}>{isPillChallenge(challengeType) ? "알약 이름" : "운동 챌린지 이름"}</span>
      <div className={s.inputWrap}>
        <input
          className={s.nameInput}
          type="text"
          placeholder={placeHolderMessage}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleChangeFunc(e);
          }}
          defaultValue={defaultValue}
        />
        <InputClearButton />
      </div>
    </div>
  );
};

export default NameInputSection;
