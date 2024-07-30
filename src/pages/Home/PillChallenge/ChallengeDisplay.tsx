import React from 'react'
import s from "./SuppplementChallengeEditingPage.module.scss"
import { Link } from 'react-router-dom'

import plusIconImg from "../../../assets/plusIcon.svg";
import deleteImg from "../../../assets/deleteIcon.svg";
import pencilImg from "../../../assets/pencil.svg";
import pillInfo from '../../../store/pillInfo';
import habitInfo from '../../../store/habitInfo';

interface Props {
    item: (pillInfo | habitInfo)[],
    getIntakeTime: any,
    deleteFunc: (Id: string) => void,
    challengeType: string,
    displayInfo: string
}

const ChallengeDisplay:React.FC<Props> = ({item, getIntakeTime, deleteFunc, challengeType, displayInfo}) => {
    const changeStyleToEditMode = () => {
        const plusBtn = document.getElementsByClassName(
          s.addPills
        ) as HTMLCollectionOf<Element>;
        const editActivateBtn = document.getElementsByClassName(
          s.editPills
        ) as HTMLCollectionOf<Element>;
        const confirmBtn = document.getElementsByClassName(
          s.completeButton
        ) as HTMLCollectionOf<Element>;
        const editAndDeleteBtn = document.getElementsByClassName(
          "editAndDeleteBtn"
        ) as HTMLCollectionOf<Element>;
    
        for (var i = 0; i < plusBtn.length; i++) {
          var div = plusBtn[i] as HTMLElement;
          div.style.display = "block";
        }
        for (var i = 0; i < editActivateBtn.length; i++) {
          var div = editActivateBtn[i] as HTMLElement;
          div.style.display = "none";
        }
        for (var i = 0; i < confirmBtn.length; i++) {
          var div = confirmBtn[i] as HTMLElement;
          div.style.display = "block";
        }
        for (var i = 0; i < editAndDeleteBtn.length; i++) {
          var div = editAndDeleteBtn[i] as HTMLElement;
          div.style.display = "flex";
          div.style.gap = "5px";
          div.style.alignItems = "center";
        }
      };
    
      const changeStyleToNormalMode = () => {
        const plusBtn = document.getElementsByClassName(
          s.addPills
        ) as HTMLCollectionOf<Element>;
        const editActivateBtn = document.getElementsByClassName(
          s.editPills
        ) as HTMLCollectionOf<Element>;
        const confirmBtn = document.getElementsByClassName(
          s.completeButton
        ) as HTMLCollectionOf<Element>;
        const editAndDeleteBtn = document.getElementsByClassName(
          "editAndDeleteBtn"
        ) as HTMLCollectionOf<Element>;
    
        for (var i = 0; i < plusBtn.length; i++) {
          var div = plusBtn[i] as HTMLElement;
          div.style.display = "none";
        }
        for (var i = 0; i < editActivateBtn.length; i++) {
          var div = editActivateBtn[i] as HTMLElement;
          div.style.display = "block";
        }
        for (var i = 0; i < confirmBtn.length; i++) {
          var div = confirmBtn[i] as HTMLElement;
          div.style.display = "none";
        }
        for (var i = 0; i < editAndDeleteBtn.length; i++) {
          var div = editAndDeleteBtn[i] as HTMLElement;
          div.style.display = "none";
        }
      };

      const hello = (item:pillInfo | habitInfo) => {
        console.log(item) 
        return item.name;
      }

  return (
    <>
      {displayInfo == challengeType && (
        <div className={s.body}>
          <div className={s.supplementTitle}>
            <span>
              {challengeType == "pill"
                ? "복용할 알약"
                : "수행할 생활습관 챌린지"}
            </span>
            <Link to={`/${challengeType}AddingPage`} className={s.addPills}>
              <img src={plusIconImg} alt="plus" />
            </Link>
            <button className={s.editPills} onClick={changeStyleToEditMode}>
              편집
            </button>
          </div>
          <div>
            {item.map((item, index) => {
              return (
                <div className={s.supplementWrap}>
                  <span>{hello(item)}</span>
                  {challengeType == "pill" && (
                    <span>
                      {"주 " +
                        Object.values(
                          (item as pillInfo).weeklyIntakeFrequency
                        ).filter((value) => value).length +
                        "회, " +
                        getIntakeTime(item) +
                        ", " +
                        Object.values(
                          (item as pillInfo).dailyIntakePeriod
                        ).filter((value) => value).length +
                        "회"}
                    </span>
                  )}
                  <div className={"editAndDeleteBtn"}>
                    <Link
                      to={`/${challengeType}EditingPage/${item.id}`}
                      className="edit_button"
                    >
                      <img src={pencilImg} alt="" />
                    </Link>
                    <button
                      className="delete_button"
                      onClick={() => deleteFunc(item.id)}
                    >
                      <img src={deleteImg} alt="" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className={s.completeButton}
            onClick={changeStyleToNormalMode}
          >
            완료
          </button>
        </div>
      )}
    </>
  );
}

export default ChallengeDisplay