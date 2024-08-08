import styles from "./findKeyword.module.scss";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useGlobalStore } from "../../store/store";
import { useEffect } from "react";
import TopBarWithBackBtn from "../../components/organs/Bars/TopBarWithBackBtn";

// interface findKeywordProps {
//     navigateText: string;
// }

export const FindKeyword = () => {
  const location = useLocation();
  const navigateText = location.state.value;

  console.log(navigateText);
  const setShowBottomBar = useGlobalStore((state) => state.setShowBottomBar);
  useEffect(() => {
    console.log("마운트됨");
    setShowBottomBar();
    return () => {
      setShowBottomBar();
    };
  }, [setShowBottomBar]);

  const navigate = useNavigate();

  return (
    <div className={styles.findKeyword}>
      <TopBarWithBackBtn></TopBarWithBackBtn>
      <div className={styles.findKeywordWrap}>
        <div className={styles.findKeywordText}>어떤 증상을</div>
        <div className={styles.findKeywordText}>겪고 계신가요?</div>
        <input
          className={styles.findKeywordInput}
          placeholder="증상을 입력해주세요."
        ></input>
      </div>
      <button
        className={styles.NextButton}
        onClick={() => navigate(navigateText)}
      >
        <p className={styles.NextButtonText}>다음으로</p>
      </button>
    </div>
  );
};
