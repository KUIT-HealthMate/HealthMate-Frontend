import s from "./AIDIagnosis.module.scss";

interface diagnosisProps {
  symptoms: string | number | undefined;
  rate: string | number | undefined;
  description: string | number | undefined;
}

export default function AIDiagnosis({
  symptoms,
  rate,
  description,
}: diagnosisProps) {
  const descriptions: string[] | undefined = description?.toString().split(".");
  if (descriptions !== undefined) descriptions.pop();
  return (
    <div className={s.diagnosisContainer}>
      {rate === undefined ? (
        <div></div>
      ) : (
        <div className={s.AIDiagnosisContainer}>
          <div className={s.title}>{`위험질환: ${symptoms}`}</div>
          <div className={s.rateBarContainer}>
            <div className={s.notice}>위험정도</div>
            <div className={s.rateBarBackGround}>
              <div className={s.rateBar} style={{ width: `${rate}%` }} />
              <div
                className={s.rateIndicator}
                style={{ width: `calc(${rate}% - 12px)` }}
              >
                {rate}
              </div>
            </div>
          </div>
          <div className={s.divider} />
          {descriptions !== undefined &&
            descriptions.map((item) => (
              <div className={s.description}>{item + "."}</div>
            ))}
        </div>
      )}
    </div>
  );
}
