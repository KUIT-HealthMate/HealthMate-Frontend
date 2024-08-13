import React, { ChangeEvent } from "react";
import s from "../ManagePage.module.scss";

import InputClearButton from "./InputClearButton";
import { isPillChallenge } from "../utils/determineChallenge";
import handleChallengeName from "../utils/handleChallengeName";

interface Props<T> {
  setNewChallenge: React.Dispatch<React.SetStateAction<T>>;
  newChallenge: Omit<T, "id" | "notificationTime">;
  defaultValue: string;
  challengeType: string;
  nameInputStyle:  React.CSSProperties;
}

const NameInputSection = <T,>({
  setNewChallenge,
  newChallenge,
  defaultValue,
  challengeType,
    nameInputStyle
}: Props<T>) => {
  let placeHolderMessage: string = isPillChallenge(challengeType)
    ? "알약"
    : "운동";
  placeHolderMessage += " 이름을 입력해주세요";

  return (
    <div className={s.detailDiv}>
      <span className={s.detailTitle}>
        {isPillChallenge(challengeType) ? "알약 이름" : "운동 챌린지 이름"}
      </span>
      <div className={s.inputWrap}>
        <input
          className={s.nameInput}
          type="text"
          placeholder={placeHolderMessage}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleChallengeName(e.target, setNewChallenge, newChallenge);
          }}
          defaultValue={defaultValue}
          style={nameInputStyle}
        />
        <InputClearButton />
      </div>
    </div>
  );
};

export default NameInputSection;
