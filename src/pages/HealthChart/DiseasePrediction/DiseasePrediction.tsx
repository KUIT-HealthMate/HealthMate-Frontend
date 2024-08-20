import AIDiagnosis from "./AIDiagnosis";
import ChallengeRecommendation from "./ChallengeRecommendation";
import s from "./DiseasePrediction.module.scss";

interface DiseasePredictionProps {
  data: (string | number | undefined)[];
}
// 위험질환, 위험점수, 설명, 추천챌린지 순

export default function DiseasePrediction({ data }: DiseasePredictionProps) {
  return (
    <div className={s.diseasePredictionContainer}>
      <div className={s.titleContainer}>
        <div className={s.title}>에측된 위험질환이에요!</div>
        <div className={s.row}>
          <div className={s.subtitle}>위험 질환은 AI가 예측한</div>
          <div className={s.subtitleHighlight}>발생 가능성이 있는 질환</div>
          <div className={s.subtitle}>으로,</div>
        </div>
        <div className={s.subtitle}>명확한 의료 정보가 아니니</div>
        <div className={s.subtitle}>반드시 참고용으로만 사용해주세요!</div>
      </div>
      <AIDiagnosis symptoms={data[0]} rate={data[1]} description={data[2]} />
      <ChallengeRecommendation challengeRecommended={data[3]} />
    </div>
  );
}
