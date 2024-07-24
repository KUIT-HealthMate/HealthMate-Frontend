import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import usePillInfoStore from '../../../store/usePillInfoStore';

import leftBracket from "../../../assets/leftBraket.svg";
import pillImg from "../../../assets/pill.png";
import dummbellImg from "../../../assets/dumbbell.png";
import plusIconImg from "../../../assets/plusIcon.svg";
import deleteImg from "../../../assets/deleteIcon.svg";
import pencilImg from "../../../assets/pencil.svg";
import s from "./SuppplementChallengeEditingPage.module.scss";


const SupplementChallengeEditingPage = () => {
    const navigate = useNavigate();
    const { PillInfo, setPillInfo, getIntakeTime, getMealTime, deletePill} = usePillInfoStore();


    const changeStyleToEditMode = () => {
        console.log("1");
        const plusBtn = document.querySelectorAll("."+s.addPills) as NodeListOf<HTMLElement>;
        const editActivateBtn = document.querySelectorAll("."+s.editPills) as NodeListOf<HTMLElement>;
        const confirmBtn = document.querySelectorAll("."+s.completeButton) as NodeListOf<HTMLElement>;
        const editAndDeleteBtn = document.querySelectorAll(".editAndDeleteBtn") as NodeListOf<HTMLElement>;

        
        for(const element of plusBtn){
            element.style.display = "block";
        }
        for(const element of confirmBtn){
            element.style.display = "block";
        }
        for(const element of editAndDeleteBtn){
            element.style.display = "block";
        }
        for(const element of editActivateBtn){
            element.style.display = "none";
        }
    };

    const changeStyleToNormalMode = () => {
        const plusBtn = document.querySelectorAll("."+s.addPills) as NodeListOf<HTMLElement>;
        const editActivateBtn = document.querySelectorAll("."+s.editPills) as NodeListOf<HTMLElement>;
        const confirmBtn = document.querySelectorAll("."+s.completeButton) as NodeListOf<HTMLElement>;
        const editAndDeleteBtn = document.querySelectorAll(".editAndDeleteBtn") as NodeListOf<HTMLElement>;

        
        for(const element of plusBtn){
            element.style.display = "none";
        }
        for(const element of confirmBtn){
            element.style.display = "none";
        }
        for(const element of editAndDeleteBtn){
            element.style.display = "none";
        }
        for(const element of editActivateBtn){
            element.style.display = "block";
        }
    };

  return (
    
    <div className={s.wrap}>
        <div className={s.statusBar}></div>
        <div className={s.header}>
            <div className={s.titleBar}>
                <button onClick={() => navigate(-1)}><img src={leftBracket} alt=""/></button>
                <div className={s.title}>챌린지 편집</div>
            </div>
            <div className={s.challengeNameWrap}>
                <div className={s.challengeName}><img src={pillImg} alt="영양제"/><span>영양제 챌린지</span></div>
                <div className={s.challengeName}><img src={dummbellImg} alt="생활습관"/><span>생활 습관 챌린지</span></div>
            </div>
        </div>
        <div className={s.body}>
            <div className={s.supplementTitle}>
                <span>복용할 알약</span>
                <Link to="/PillAddingPage" className={s.addPills}><img src={plusIconImg} alt="plus" /></Link>
                <button className={s.editPills} onClick={changeStyleToEditMode}>편집</button>
            </div>
            <div>
                {
                PillInfo.map((pill,index) => {
                    return <div className={s.supplementWrap}><span>{pill.name}</span><span>{"주 "+Object.values(pill.weeklyIntakeFrequency).filter(value => value).length+"회, "+getIntakeTime(pill)+", "+Object.values(pill.dailyIntakePeriod).filter(value => value).length+"회"}</span><div className={"editAndDeleteBtn"}><Link to="/PillEditingPage" className="edit_button"><img src={pencilImg} alt=""/></Link><button className="delete_button" onClick={() => deletePill(pill.id)}><img src={deleteImg} alt=""/></button></div></div>
                })
                }
            </div>
            <button className={s.completeButton} onClick={changeStyleToNormalMode}>완료</button>
        </div>
    </div>
  )
}

export default SupplementChallengeEditingPage