import s from "./MyHealthProblems.module.scss";
import myCommunity from "../../../assets/myHealthProblem.png";
import rightGreyArrow from "../../../assets/rightGreyArrow.svg";

interface MyHealthProblemsProps {
  myProblems: Array<string>;
}

export default function MyHealthProblems({
  myProblems,
}: MyHealthProblemsProps) {
  return (
    <div className={s.blockContainer}>
      <div className={s.titleContainer}>
        <img src={myCommunity} alt="coin" className={s.coinImg} />
        <div className={s.title}>나의 건강 고민</div>
      </div>

      <div className={s.contentContainer}>
        {myProblems.map((problem) => (
          <div className={s.problemContainer}>{`#${problem}`}</div>
        ))}
      </div>
      <div className={s.noticeContainer}>
        <div className={s.notice}>수정하기</div>
        <img
          src={rightGreyArrow}
          alt="적립/사용내역"
          className={s.rightArrow}
        />
      </div>
    </div>
  );
}
