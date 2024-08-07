import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import MyPage from "./pages/MyPage/MyPage";
import Community from "./pages/Community/Community";
import HealthChart from "./pages/HealthChart/HealthChart";
import ChallengeStatistics from "./pages/Home/ChallengeStatistics/ChallengeStatistics";

import ChallengeEditingPage from "./pages/Home/Challenge/ChallengeEditingPage";


import DailyCheckStart from "./pages/DailyCheck/DailyCheckStart";
import DailyMealCheckStart from "./pages/DailyCheck/DailyMealCheckStart";
import DailySleepCheckStart from "./pages/DailyCheck/DailySleepCheckStart";
import DailyCheck from "./pages/DailyCheck/DailyCheck";
// import DailyMealCheck from "./pages/DailyCheck/DailyMealCheck";
// import DailySleepCheck from "./pages/DailyCheck/DailySleepCheck";
import DailySymptomCheckStart from "./pages/DailyCheck/DailySymptomCheckStart";
import DailySymptomCheck from "./pages/DailyCheck/DailySymptomCheck";
import DailyCheckDone from "./pages/DailyCheck/DailyCheckDone";


import LoginPage from "./pages/login/LoginPage";
import EmailCheckPage from "./pages/login/EmailCheckPage";
import CoinDepositAndUsage from "./pages/MyPage/CoinPage/CoinDepositAndUsage";
import ChallengeManagePage from "./pages/Home/Challenge/ManagePage/ChallengeManagePage";
import pillInfo from "./store/pillInfo";
import habitInfo from "./store/habitInfo";

enum challengeType {
  Pill = 'pill',
  Habit = 'habit'
}

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/emailCheck" element={<EmailCheckPage />} />

        <Route path="/" element={<Home />} />
        <Route path="/chart" element={<HealthChart />} />
        <Route path="/community" element={<Community />} />
        <Route path="/mypage" element={<MyPage />} />

        <Route path="/statistics" element={<ChallengeStatistics />} />
        <Route
          path="/ChallengeEdit"
          element={<ChallengeEditingPage />}
        />
        <Route path="/pillAddingPage" element={<ChallengeManagePage<pillInfo> challengeType={challengeType.Pill}/>} />
        <Route path="/pillEditingPage/:id" element={<ChallengeManagePage<pillInfo> challengeType={challengeType.Pill}/>} />
        <Route path="/habitAddingPage" element={<ChallengeManagePage<habitInfo> challengeType={challengeType.Habit}/>} />
        <Route path="/habitEditingPage/:id" element={<ChallengeManagePage<habitInfo> challengeType={challengeType.Habit}/>} />

        <Route path="/dailycheckstart" element={<DailyCheckStart />} />
        <Route path="/dailymealcheckstart" element={<DailyMealCheckStart />} />
        <Route
          path="/dailysleepcheckstart"
          element={<DailySleepCheckStart />}
        />
        <Route
          path="/dailysymptomcheckstart"
          element={<DailySymptomCheckStart />}
        />
        <Route path="/dailysymptomcheck" element={<DailySymptomCheck />} />

        <Route path="/dailycheck" element={<DailyCheck />} />
        {/* <Route path="/dailymealcheck" element={<DailyMealCheck />} />
        <Route path="/dailysleepcheck" element={<DailySleepCheck />} /> */}
        <Route path="/dailycheckdone" element={<DailyCheckDone />} />

        <Route path="/usage" element={<CoinDepositAndUsage />} />
      </Routes>
    </div>
  );
};

export default Router;
