import React, { createContext, useContext, useState, useCallback } from 'react';

// const DailyCheckContext = createContext();

// export const DailyCheckProvider = ({ children }) => {
//     const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

//     const NextQuestion = useCallback(() => {
//         if (currentQuestionIdx < surveys.length - 1) {
//             setCurrentQuestionIdx(currentQuestionIdx + 1);
//         } else {
//             console.log("다함");
//         }
//     }, [currentQuestionIdx]);

//     return (
//         <DailyCheckContext.Provider value={{ NextQuestion }}>
//             {children}
//         </DailyCheckContext.Provider>
//     );
// };

//export const useDailyCheck = () => useContext(DailyCheckContext);
