import s from "./ChallengeRecommendation.module.scss";
import ChallengeAddButton from "./ChallengeAddButton";

interface challengeRecommendProps {
  challengeRecommended: string | number | undefined;
}

export default function ChallengeRecommendation({
  challengeRecommended,
}: challengeRecommendProps) {
  const challenges: string[] | undefined = challengeRecommended
    ?.toString()
    .split(", ");

  return (
    <div className={s.challengeRecommendContainer}>
      <div className={s.title}>챌린지 추천</div>
      {challenges === undefined ? (
        <div>추천 챌린지 불러오기에 실패했어요.</div>
      ) : (
        challenges.map((item, index) => (
          <ChallengeAddButton key={index} challengeName={item} />
        ))
      )}
    </div>
  );
}
