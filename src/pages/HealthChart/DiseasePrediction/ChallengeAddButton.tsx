import { useState } from "react";
import s from "./ChallengeRecommendation.module.scss";

interface ButtonProps {
  key: number;
  challengeName: string;
}

export default function ChallengeAddButton({
  key,
  challengeName,
}: ButtonProps) {
  const [challengeAdded, setChallengeAdded] = useState(false);
  const handleButtonClick = () => {
    setChallengeAdded(!challengeAdded);
    //데이터도 전송
  };
  return (
    <div key={key} className={s.contentContainer}>
      <div className={s.contentDescription}>{challengeName}</div>
      {challengeAdded ? (
        <div className={s.challengeAddedButton} onClick={handleButtonClick}>
          추가 완료
        </div>
      ) : (
        <div className={s.challengeAddButton} onClick={handleButtonClick}>
          챌린지 추가
        </div>
      )}
    </div>
  );
}
