import React, { ChangeEvent } from "react";
import s from "./PillManagePage.module.scss";

import InputClearButton from "./InputClearButton";

interface Props {
  placeHolderMessage: string;
  handleChangeFunc: (e: ChangeEvent<HTMLInputElement>) => void;
  defaultValue: string;
}

const NameInputSection: React.FC<Props> = ({
  placeHolderMessage,
  handleChangeFunc,
  defaultValue,
}) => {

  return (
    <div className={s.detailDiv}>
      <span className={s.detailTitle}>알약 이름</span>
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
