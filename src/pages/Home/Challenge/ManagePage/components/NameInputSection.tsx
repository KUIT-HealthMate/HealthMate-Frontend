import React, { ChangeEvent } from "react";
import s from "../ManagePage.module.scss";

import InputClearButton from "./InputClearButton";
import { isPillChallenge } from "../utils/determineChallenge";
import handleChallengeName from "../utils/handleChallengeName";

import errorIcon from "../../../../../assets/errorIcon.svg"

interface Props<T> {
  setNewChallenge: React.Dispatch<React.SetStateAction<T>>;
  newChallenge: Omit<T, "id" | "notificationTime">;
  defaultValue: string;
  challengeType: string;
  nameInputStyle:  React.CSSProperties;
  setNameInputStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
}

const NameInputSection = <T,>({
  setNewChallenge,
  newChallenge,
  defaultValue,
  challengeType,
    nameInputStyle,
    setNameInputStyle,
    errorMessage,
    setErrorMessage
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
            setNameInputStyle({border: "1px solid var(--2, #DEDEDE)"});
            setErrorMessage("");
          }}
          defaultValue={defaultValue}
          style={nameInputStyle}
        />
        {errorMessage !== "" && <div className={s.errorMessageDiv}><img src={errorIcon} alt="!" /><span>{errorMessage}</span></div>}
        <InputClearButton />
      </div>
    </div>
  );
};

export default NameInputSection;
