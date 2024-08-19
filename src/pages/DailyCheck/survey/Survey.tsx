import styles from "./Survey.module.scss";
import ProgressBar from "./ProgressBar";
import { useGlobalStoreSurvey, surveyAnswer, totalBtnActive } from "../../../store/storeSurvey";
import { useNavigate } from "react-router-dom";
import leftBracket from "../../../assets/leftBraket.svg";


interface Props {
  questions: string[];
  candidates: string[];
  type: number; // 1: 생활습관 2: 식사습관 3: 수면습관
  multipleAble: boolean; // 복수선택 가능 여부
  limit: number;
}

const Survey = ({
  questions,
  candidates,
  type,
  multipleAble,
  limit,
}: Props) => {
  const nextQuestion = useGlobalStoreSurvey((state) => ({
    currentQuestionIdx: state.currentQuestionIdx,
    nextQuestion: state.nextQuestion,
  }));
  const previousQuestion = useGlobalStoreSurvey((state) => ({
    previousQuestion: state.previousQuestion,
  }));
  const currentQuestionIdx = useGlobalStoreSurvey((state) => ({
    currentQuestionIdx: state.currentQuestionIdx,
  }));

  const { btnStatus, setBtnStatus, setBtnStatusFalse } = totalBtnActive()

  function changeBtnColor(idx: number) {
    console.log("changeBtnColor: ", currentQuestionIdx.currentQuestionIdx);
    setBtnStatus(currentQuestionIdx.currentQuestionIdx, idx)
  }


  function handleButtonClick(idx: number, multipleAble: boolean) {
    console.log("선택한 문제번호, 선지 idx: ", nextQuestion.currentQuestionIdx, idx, multipleAble)
    if (!multipleAble) {
      //복수 선택 불가
      setBtnStatusFalse(currentQuestionIdx.currentQuestionIdx);
    } else {
      // 체크한거 수 세서 >limit 면 changeBtnColor X
      const trueCnt = btnStatus[currentQuestionIdx.currentQuestionIdx].filter((element) => element).length;
      if (trueCnt >= limit && !btnStatus[currentQuestionIdx.currentQuestionIdx][idx]) {
        console.error("더 이상 선택 불가");
        return;
      }
    }
    changeBtnColor(idx);
  }


  const { setSurveyAnswerList } = surveyAnswer();
  const handleAnswer = (id: number, score: number) => {
    setSurveyAnswerList(id, score);
  };


  function calculateScore(questionIdx: number): number {
    let score = 0;
    for (let i = 0; i < candidates.length; i++) {
      if (btnStatus[currentQuestionIdx.currentQuestionIdx][i] === true) {

        if (questionIdx <= 2 || questionIdx === 7 || questionIdx === 14) {
          // 오름차순
          score += candidates.length - i;
        } else if (questionIdx <= 4 || questionIdx === 8 || questionIdx === 9 || questionIdx === 12 || questionIdx === 13) {
          //내림차순
          score += i + 1;
        } else if (questionIdx === 5) {
          //동일
          score += 1
        } else if (questionIdx === 15) {
          //다 다다름
          if (i < 4) {
            score += 1
          } else {
            score += 2
          }
        }

      }
    }
    return score;
  }

  function findType(questionIdx: number): number {
    let type = 0;
    for (let i = 0; i < candidates.length; i++) {
      if (btnStatus[currentQuestionIdx.currentQuestionIdx][i] === true) {
        type = i + 1;
        break;
      }
    }

    return type;
  }


  function handleClick() {
    console.log("handleClick문제번호: ", currentQuestionIdx);
    console.log("정답지수 : ", candidates.length);

    if (!NextButtonActive()) {
      return;
    }


    //'다음으로' 누르면 정답점수or타입 저장
    if (currentQuestionIdx.currentQuestionIdx === 6 || currentQuestionIdx.currentQuestionIdx === 10 || currentQuestionIdx.currentQuestionIdx === 11) {
      //score아님, type 찾기
      const type = findType(currentQuestionIdx.currentQuestionIdx);
      handleAnswer(currentQuestionIdx.currentQuestionIdx, type);
    } else {
      //score 계산
      const score = calculateScore(currentQuestionIdx.currentQuestionIdx);
      handleAnswer(currentQuestionIdx.currentQuestionIdx, score);
    }
    // setBtnDefault();

    nextQuestion.nextQuestion();

    if (type === 1) {
      if (nextQuestion.currentQuestionIdx >= 4) {
        navigate("/dailymealcheckstart");
      }
    } else if (type === 2) {
      if (nextQuestion.currentQuestionIdx >= 11) {
        navigate("/dailysleepcheckstart");
      }
    } else {
      if (nextQuestion.currentQuestionIdx >= 15) {
        navigate("/dailysymptomcheckstart");
      }
    }
  }

  function NextButtonActive() {
    if (btnStatus[currentQuestionIdx.currentQuestionIdx].some((isActive) => isActive)) {
      return true;
    } else {
      return false;
    }
  }

  const { progressPercent } = useGlobalStoreSurvey((state) => ({
    progressPercent: state.progressPercent,
  }));

  console.log("progressPercent: " + progressPercent);

  const navigate = useNavigate();

  function goBack() {
    console.log("goback");
    if (currentQuestionIdx.currentQuestionIdx === 0) {
      navigate('/dailycheckstart')
      return;
    } else if (currentQuestionIdx.currentQuestionIdx === 5) {
      navigate('/dailymealcheckstart')
    } else if (currentQuestionIdx.currentQuestionIdx === 12) {
      navigate('/dailysleepcheckstart')
    } else {
      previousQuestion.previousQuestion();
    }


  }

  console.log("현재 문제 번호: " + nextQuestion.currentQuestionIdx);
  return (
    <>
      <div className={styles.backButton} onClick={goBack}>
        <img
          style={{ width: `8.89px`, height: `16px` }}
          src={leftBracket}
          alt="left"
        />
      </div>
      <ProgressBar percent={progressPercent}></ProgressBar>
      <div className={styles.surveyWrap}>
        <div className={styles.survey}>
          <div className={styles.question}>
            <div className={styles.questionText}>
            </div>
            {
              questions.map((question, idx) => {
                return (<div className={styles.questionText}>{question}</div>)
              })
            }
          </div>
          {multipleAble ? (
            <div
              style={{
                color: `#F97F59`,
                marginTop: `14px`,
                marginLeft: `8.8%`,
              }}
            >
              *복수선택 가능
            </div>
          ) : null}

          <div
            className={styles.candidate}
            style={
              candidates.length <= 2
                ? { flexDirection: `row`, width: `82%`, marginLeft: `9%` }
                : { flexDirection: `column` }
            }
          >
            {candidates.map((candidate, idx) => {
              return (
                <div
                  className={styles.candidateBox}
                  onClick={() => {
                    handleButtonClick(idx, multipleAble);
                  }}
                  style={
                    btnStatus[nextQuestion.currentQuestionIdx][idx]
                      //btnActive[idx]
                      ? {
                        background: `rgba(14, 148, 148, 0.1)`,
                        color: `#0E9494`,
                        border: `1px solid #0E9494`,
                      }
                      : { background: `#FFFFFF`, color: `#8F8F8F` }
                  }
                >
                  <div className={styles.candidateText}>{candidate}</div>
                </div>
              );
            })}
          </div>
          <button
            className={styles.NextButton}
            onClick={handleClick}
            style={
              NextButtonActive()
                ? {}
                : { background: `#F5F6F8`, border: `1px solid #DEDEDE` }
            }
          >
            <p
              className={styles.NextButtonText}
              style={NextButtonActive() ? {} : { color: `#8F8F8F` }}
            >
              다음으로
            </p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Survey;
