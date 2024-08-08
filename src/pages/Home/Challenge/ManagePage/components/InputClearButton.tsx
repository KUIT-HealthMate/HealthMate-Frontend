import React from 'react'
import InputClearButtonImg from "../../../../../assets/InputClearButton.svg";
import s from "../ManagePage.module.scss"

const InputClearButton = () => {
  return (
    <button
          className={s.inputClearButton}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            const buttonElement = e.currentTarget;
            const inputElement = buttonElement
              .closest(`.${s.inputWrap}`)
              ?.querySelector("input") as HTMLInputElement;
            if (inputElement) {
              inputElement.value = "";
            }
          }}
        >
          <img
            className={s.inputClearButtonImg}
            src={InputClearButtonImg}
            alt=""
          />
    </button>
  )
}

export default InputClearButton