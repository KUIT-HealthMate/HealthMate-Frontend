
import { Link } from "react-router-dom";
import { usePillInfoStore } from "../../../store/usePillInfoStore";
import { useEffect } from "react";
import { useGlobalStore } from "../../../store/store";
import useHabitInfoStore from "../../../store/useHabitInfoStore";

import { pillInfo } from "../../../store/challengeTypes";

import leftBracket from "../../../assets/leftBraket.svg";
import pillImg from "../../../assets/pill.png";
import dummbellImg from "../../../assets/dumbbell.png";
import s from "./SuppplementChallengeEditingPage.module.scss";

import ChallengeDisplay from "./ChallengeDisplay";
import { serverRequest } from "../../../APIs/ManageChallenge/serverRequest";
import useViewingChallengeStore from "./viewingChallengeStore/useViewingChallengeStore";

const SupplementChallengeEditingPage = () => {
  const setShowBottomBar = useGlobalStore((state) => state.setShowBottomBar);
  useEffect(() => {
    console.log("마운트됨");
    setShowBottomBar(false);
    return () => {
      setShowBottomBar(true);
    };
  }, [setShowBottomBar]);
  
  const { PillInfo, getIntakeTime, deletePill } = usePillInfoStore();

  const { HabitInfo, deleteHabit } = useHabitInfoStore();

  const { viewingChallenge, setViewingChallenge } = useViewingChallengeStore();


  // const [challengeDisplayInfo, setChallengeDisplayInfo] = useState<string>("pill");

  useEffect(() => {
    changeEditType(viewingChallenge);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  console.log("viewingChallenge is: " + viewingChallenge);

  const changeEditType = (type: string) => {
    setViewingChallenge(type);
    const buttons = document.getElementsByClassName(s.challengeName);
    if (type === "pill") {
      (buttons[0] as HTMLElement).style.borderBottom = "3px solid #0E9494";
      (buttons[1] as HTMLElement).style.borderBottom = "3px solid #FFFFFF";
    } else {
      (buttons[1] as HTMLElement).style.borderBottom = "3px solid #0E9494";
      (buttons[0] as HTMLElement).style.borderBottom = "3px solid #FFFFFF";
    }
  };

  const handleDeleteFunc = (challengeType: string, challengeId: string) => {
    if(challengeType === "pill") {

      deletePill(challengeId);

      serverRequest.deleteChallenge(challengeId,"supplements");
      
    } else {

      deleteHabit(challengeId);

      serverRequest.deleteChallenge(challengeId,"habits");

    }
  };

  return (
    <div className={s.wrap}>
      <div className={s.statusBar}></div>
      <div className={s.header}>
        <div className={s.titleBar}>
          <Link to="/" onClick={() => setShowBottomBar(true)}>
            <img src={leftBracket} alt="뒤로가기" />
          </Link>
          <div className={s.title}>챌린지 편집</div>
        </div>
        <div className={s.challengeNameWrap}>
          <button
            className={s.challengeName}
            onClick={() => changeEditType("pill")}
          >
            <img src={pillImg} alt="영양제" />
            <span>영양제 챌린지</span>
          </button>
          <button
            className={s.challengeName}
            onClick={() => changeEditType("habit")}
          >
            <img src={dummbellImg} alt="생활습관" />
            <span>생활 습관 챌린지</span>
          </button>
        </div>
      </div>
      <ChallengeDisplay
        item={PillInfo}
        getIntakeTime={(pill: pillInfo) => getIntakeTime(pill)}
        deleteFunc={(challengeId: string) => handleDeleteFunc("pill", challengeId)}
        challengeType={"pill"}
      />
      <ChallengeDisplay
        item={HabitInfo}
        getIntakeTime={() => {}}
        deleteFunc={(challengeId: string) => handleDeleteFunc("habit", challengeId)}
        challengeType={"habit"}
      />
    </div>
  );
};

export default SupplementChallengeEditingPage;
