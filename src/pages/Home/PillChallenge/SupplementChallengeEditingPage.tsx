import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { usePillInfoStore } from "../../../store/usePillInfoStore";
import { useEffect } from "react";
import { useGlobalStore } from "../../../store/store";
import useHabitInfoStore from "../../../store/useHabitInfoStore";
import pillInfo from "../../../store/pillInfo";

import leftBracket from "../../../assets/leftBraket.svg";
import pillImg from "../../../assets/pill.png";
import dummbellImg from "../../../assets/dumbbell.png";
import plusIconImg from "../../../assets/plusIcon.svg";
import deleteImg from "../../../assets/deleteIcon.svg";
import pencilImg from "../../../assets/pencil.svg";
import s from "./SuppplementChallengeEditingPage.module.scss";


import ChallengeDisplay from "./ChallengeDisplay";
import PageTopBar from "../../../components/organs/Bars/PageTopBar";

const SupplementChallengeEditingPage = () => {
  const setShowBottomBar = useGlobalStore((state) => state.setShowBottomBar);
  useEffect(() => {
    console.log("마운트됨");
    setShowBottomBar();
    return () => {
      setShowBottomBar();
    };
  }, [setShowBottomBar]);
  const navigate = useNavigate();
  const { PillInfo, setPillInfo, getIntakeTime, getMealTime, deletePill } =
    usePillInfoStore();

  const { HabitInfo, deleteHabit } = useHabitInfoStore();

  const [challengeDisplayInfo, setChallengeDisplayInfo] = useState("pill");

  const changeEditType = (type:string) => {
    setChallengeDisplayInfo(type);
    const buttons = document.getElementsByClassName(s.challengeName);
    if(type == "pill"){
      (buttons[0] as HTMLElement).style.borderBottom = "3px solid #0E9494";
      (buttons[1] as HTMLElement).style.borderBottom = "none";
    } else {
      (buttons[1] as HTMLElement).style.borderBottom = "3px solid #0E9494";
      (buttons[0] as HTMLElement).style.borderBottom = "none";
    }
  }

  return (
    <div className={s.wrap}>
      <div className={s.statusBar}></div>
      <div className={s.header}>
        <div className={s.titleBar}>
          <button onClick={() => navigate(-1)}>
            <img src={leftBracket} alt="" />
          </button>
          <div className={s.title}>챌린지 편집</div>
        </div>
        <div className={s.challengeNameWrap}>
          <button className={s.challengeName} onClick={() => changeEditType("pill")}>
            <img src={pillImg} alt="영양제" />
            <span>영양제 챌린지</span>
          </button>
          <button className={s.challengeName} onClick={() => changeEditType("habit")}>
            <img src={dummbellImg} alt="생활습관" />
            <span>생활 습관 챌린지</span>
          </button>
        </div>
      </div>
      <ChallengeDisplay item={PillInfo} getIntakeTime={(pill: pillInfo) => getIntakeTime(pill)} deleteFunc={deletePill} challengeType={"pill"} displayInfo={challengeDisplayInfo}/>
      <ChallengeDisplay item={HabitInfo} getIntakeTime={() => {}} deleteFunc={deleteHabit} challengeType={"habit"} displayInfo={challengeDisplayInfo} />
    </div>
  );
};

export default SupplementChallengeEditingPage;
