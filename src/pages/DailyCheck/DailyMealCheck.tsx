// import React, { useEffect, useState } from 'react';
// import styles from "./DailyCheck.module.scss";
// import { useGlobalStore } from '../../store/store';
// import Survey from "../DailyCheck/survey/Survey";

// import { useGlobalStoreSurvey, surveys } from '../../store/storeSurvey';



// const DailyMealCheck = () => {
//     const setShowBottomBar = useGlobalStore((state) => state.setShowBottomBar);
//     useEffect(() => {
//         console.log("마운트됨")
//         setShowBottomBar();
//         return () => {
//             setShowBottomBar();
//         };
//     }, [setShowBottomBar]
//     );



//     const { currentQuestionIdx, nextQuestion } = useGlobalStoreSurvey((state) => ({
//         currentQuestionIdx: state.currentQuestionIdx,
//         nextQuestion: state.nextQuestion
//         // currentQuestionIdx: state.mealCurrentQuestionIdx,
//         // nextQuestion: state.nextQuestionMeal
//     }));

//     return (
//         <>
//             <Survey questions={surveys[currentQuestionIdx].question} candidates={surveys[currentQuestionIdx].candidates} type={2} multipleAble={surveys[currentQuestionIdx].multipleAble} limit={surveys[currentQuestionIdx].limit} ></Survey>
//         </>

//     )
// };

export default null;