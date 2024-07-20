import React from 'react'
import { Link } from 'react-router-dom';

import leftBracket from "../../assets/leftBraket.svg"
import pillImg from "../../assets/pill.png";
import dummbellImg from "../../assets/dumbbell.png";
import plusIconImg from "../../assets/plusIcon.svg";
import deleteImg from "../../assets/deleteIcon.svg";
import pencilImg from "../../assets/pencil.svg";
import s from "./SuppplementChallengeEditingPage.module.scss"


const SupplementChallengeEditingPage = () => {
  return (
    <div className={s.wrap}>
        <div className={s.statusBar}></div>
        <div className={s.header}>
            <div className={s.titleBar}>
                <button><img src={leftBracket} alt=""/></button>
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
                <Link to="/SupplementChallengeActualAdd" className={s.addPills}><img src={plusIconImg} alt="plus" /></Link>
                <button className={s.editPills}>편집</button>
            </div>
            <div>
                <div className={s.supplementWrap}><span>베아제</span><span>주 7회, 식후 30분 이내, 3회</span><div><Link to="/SupplementChallengeActualEdit" className="edit_button"><img src={pencilImg} alt=""/></Link><button className="delete_button"><img src={deleteImg} alt=""/></button></div></div>
                <div className={s.supplementWrap}><span>비타민</span><span>주 3회, 식후 30분 이내, 3회</span><div><Link to="/SupplementChallengeActualEdit" className="edit_button"><img src={pencilImg} alt=""/></Link><button className="delete_button"><img src={deleteImg} alt=""/></button></div></div>
                <div className={s.supplementWrap}><span>루테인</span><span>주 5회, 식후 30분 이내, 3회</span><div><Link to="/SupplementChallengeActualEdit" className="edit_button"><img src={pencilImg} alt=""/></Link><button className="delete_button"><img src={deleteImg} alt=""/></button></div></div>
            </div>
            <button className={s.completeButton}>완료</button>
        </div>
    </div>
  )
}

export default SupplementChallengeEditingPage