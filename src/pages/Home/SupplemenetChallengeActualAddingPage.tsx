import React from 'react'
import { useNavigate } from 'react-router-dom';
import s from "./SupplemenetChallengeActualAddingPage.module.scss"
import leftBracket from "../../assets/leftBraket.svg"


const SupplemenetChallengeActualAddingPage = () => {
  const navigate = useNavigate();

  return (
    <div className={s.wrap}>
        <div className={s.statusBar}></div>
        <div className={s.header}>
            <div className={s.titleBar}>
                <button onClick={() => navigate(-1)}><img src={leftBracket} alt=""/></button>
                <div className={s.title}>알약 챌린지 추가</div>
            </div>
        </div>
        <div>
          <div className={s.detailDiv}>
            <span className={s.detailTitle}>알약 이름</span>
            <input type="text" />
          </div>
          <div className={s.detailDiv}>
            <span className={s.detailTitle}>섭취 시간</span>
            <div>
              <button type="button" className={s.smallButton}>식전</button>
              <button type="button" className={s.smallButton}>식후</button>
              <input type="text" />
              <span>분 이내</span>
            </div>
          </div>
          <div className={s.detailDiv}>
            <span className={s.detailTitle}>일 섭취 시기</span>
            <div>
              <button type="button" className={s.smallButton}>아침</button>
              <button type="button" className={s.smallButton}>점심</button>
              <button type="button" className={s.smallButton}>저녁</button>
            </div>
          </div>
          <div className={s.detailDiv}>
            <span className={s.detailTitle}>주 섭취 횟수</span>
            <div>
              <button type="button" className={s.bigButton}>월</button>
              <button type="button" className={s.bigButton}>화</button>
              <button type="button" className={s.bigButton}>수</button>
              <button type="button" className={s.bigButton}>목</button>
              <button type="button" className={s.bigButton}>금</button>
              <button type="button" className={s.bigButton}>토</button>
              <button type="button" className={s.bigButton}>일</button>
            </div>
          </div>
          <div className={s.detailDiv}>
            <div>
              <span className={s.detailTitle}>키키오톡 알림 시간</span>
              <button type="button">+</button>
            </div>
            <div>
              <span></span>
            </div>
          </div>
          <button type="button" className={s.completeButton}>완료</button>
        </div>
    </div>
  )
}

export default SupplemenetChallengeActualAddingPage