import { periodName } from "../HealthChart";
import s from "./HabbitScore.module.scss";

interface HabbitScoreProps {
  period: periodName;
  periodScore: number;
  averageScore: number;
}

export default function HabbitScore({
  period,
  periodScore,
  averageScore,
}: HabbitScoreProps) {
  const showingPeriod = (period: periodName) => {
    if (period === "daily") return "일간";
    else if (period === "weekly") return "주간";
    else if (period === "monthly") return "월간";
  };

  const aboutHabbitState = (periodScore: number) => {
    if (periodScore < 20) {
      return "아직 많은 노력이 필요해요!";
    } else if (periodScore < 40) {
      return "조금만 더 노력해봐요!";
    } else if (periodScore < 60) {
      return "평균과 비슷한 상태이시네요!";
    } else if (periodScore < 80) {
      return "잘하고 있어요!";
    } else if (periodScore <= 100) {
      return "최고에요. 이대로 쭉 유지해봐요!";
    }
  };

  return (
    <div className={s.componentContainer}>
      <div className={s.contentContainer}>
        <div className={s.titleContainer}>
          <div className={s.title}>{`내 ${showingPeriod(
            period
          )} 생활습관은`}</div>
          <div className={s.score}>{`${periodScore}점`}</div>
          <div className={s.title}>이에요</div>
        </div>

        <div className={s.subtitle}>
          {periodScore === averageScore ? (
            <div className={s.write}>
              <div className={s.normal}>사용자 평균과 같아요</div>
            </div>
          ) : (
            <div>
              {periodScore > averageScore ? (
                <div className={s.write}>
                  <div className={s.normal}>사용자 평균 대비</div>
                  <div className={s.difference}>{`${
                    periodScore - averageScore
                  }점`}</div>
                  <div className={s.normal}>높아요</div>
                </div>
              ) : (
                <div className={s.write}>
                  <div className={s.normal}>사용자 평균 대비</div>
                  <div className={s.difference}>{`${
                    averageScore - periodScore
                  }점`}</div>
                  <div className={s.normal}>낮아요</div>
                </div>
              )}
            </div>
          )}
          <div className={s.status}>{aboutHabbitState(periodScore)}</div>
          <div className={s.barContainer}>
            <div className={s.bar}>
              <div
                className={s.averageBar}
                style={{ width: `${averageScore}%` }}
              >
                <div className={s.averageCircle} />
              </div>
              <div className={s.userBar} style={{ width: `${periodScore}%` }}>
                <div className={s.userLabel}>{periodScore}</div>
              </div>
              <div className={s.maxScore}>100</div>
            </div>
          </div>
        </div>
        <div className={s.noticeContainer}>
          <div
            className={s.notice}
            style={{ width: `${averageScore}%` }}
          >{`평균 ${averageScore}점`}</div>
        </div>
      </div>
    </div>
  );
}
