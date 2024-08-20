import s from "./SettingManagement.module.scss";
import myCommunity from "../../../assets/settingManagement.png";
import rightGreyArrow from "../../../assets/rightGreyArrow.svg";
import { useEffect, useState } from "react";
import { setAlarm } from "../../../APIs/myPage/setAlarm";

interface SettingManagementProps {
  version: string;
}

export default function SettingManagement({ version }: SettingManagementProps) {
  const [alarmAllow, setAlarmAllow] = useState(false);

  const handleAlarmAllow = () => {
    setAlarmAllow(!alarmAllow);
  };

  useEffect(() => {
    setAlarm(alarmAllow);
  }, [alarmAllow]);

  return (
    <div className={s.blockContainer}>
      <div className={s.titleContainer}>
        <img src={myCommunity} alt="coin" className={s.coinImg} />
        <div className={s.title}>설정관리</div>
      </div>

      <div className={s.contentContainer}>
        <div className={s.componentContainer}>
          <div className={s.menuName}>카카오톡 알람 허용</div>
          <div
            className={`${s.switchButtonContainer} ${
              alarmAllow ? s.isClicked : ""
            }`}
            onClick={handleAlarmAllow}
          >
            <div className={`${s.thumb} ${alarmAllow ? s.isClicked : ""}`} />
          </div>
        </div>
        <div className={s.componentContainer}>
          <div className={s.menuName}>서비스 가이드 보기</div>
          <img src={rightGreyArrow} alt="바로가기" />
        </div>
        <div className={s.componentContainer}>
          <div className={s.menuName}>1 : 1 문의</div>
          <img src={rightGreyArrow} alt="바로가기" />
        </div>
        <div className={s.componentContainer}>
          <div className={s.rowContainer}>
            <div className={s.menuName}>서비스 정보</div>
            <div className={s.ver}>{`(현재 ${version})`}</div>
          </div>

          <img src={rightGreyArrow} alt="바로가기" />
        </div>
        <div className={s.componentContainer}>
          <div className={s.menuName}>개인정보 처리 방침</div>
          <img src={rightGreyArrow} alt="바로가기" />
        </div>
        <div className={s.componentContainer}>
          <div className={s.menuName}>서비스 이용 약관</div>
          <img src={rightGreyArrow} alt="바로가기" />
        </div>
        <div className={s.componentContainer}>
          <div className={s.menuName}>로그아웃</div>
          <img src={rightGreyArrow} alt="바로가기" />
        </div>
      </div>
    </div>
  );
}
