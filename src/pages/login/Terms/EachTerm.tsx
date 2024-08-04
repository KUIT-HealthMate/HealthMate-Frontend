import React from "react";

import s from "./TermsPage.module.scss";
import Terms from "./assets/Terms";
import setMatchingModals from "./setMatchingModal";
import TermsCheck from "./assets/TermsCheck";

import uncheckedCheckBox from "../../../assets/loginPage/uncheckedCheckbox.svg";
import checkedCheckBox from "../../../assets/loginPage/checkedCheckbox.svg";
import rightBraket from "../../../assets/loginPage/rightBraket.svg";

interface Props {
  termData: Terms;
  index: number;
  modals: boolean[];
  setModals: React.Dispatch<React.SetStateAction<boolean[]>>;
  checks: TermsCheck[];
  setChecks: React.Dispatch<React.SetStateAction<TermsCheck[]>>;
}

const EachTerm: React.FC<Props> = ({
  termData,
  index,
  modals,
  setModals,
  checks,
  setChecks,
}) => {
  const agreeThisTerm = (value: boolean) => {
    const temp = [...checks];
    temp[index].isChecked = value;
    setChecks(temp);
  };
  return (
    <div className={s.eachTermWrap}>
      <div className={s.buttonAndText}>
        {checks[index].isChecked ? (
          <img
            src={checkedCheckBox}
            alt="Checked"
            onClick={() => agreeThisTerm(false)}
          />
        ) : (
          <img
            src={uncheckedCheckBox}
            alt="Unchecked"
            onClick={() => agreeThisTerm(true)}
          />
        )}
        {termData.isEssential ? (
          <span>{`${termData.title}(필수)`}</span>
        ) : (
          <span>{`${termData.title}(선택)`}</span>
        )}
      </div>
      <button
        type="button"
        onClick={() => setMatchingModals(modals, index, setModals)}
      >
        <img src={rightBraket} alt="" />
      </button>
    </div>
  );
};

export default EachTerm;
