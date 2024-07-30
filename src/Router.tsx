import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import MyPage from "./pages/MyPage/MyPage";
import Community from "./pages/Community/Community";
import HealthChart from "./pages/HealthChart/HealthChart";
import ChallengeStatistics from "./pages/Home/ChallengeStatistics/ChallengeStatistics";

import SupplementChallengeEditingPage from "./pages/Home/PillChallenge/SupplementChallengeEditingPage";

import PillManagePage from "./pages/Home/PillChallenge/PillManagePage"; 
import DailyCheckStart from "./pages/DailyCheck/DailyCheckStart";
import DailyMealCheckStart from "./pages/DailyCheck/DailyMealCheckStart";
import DailySleepCheckStart from "./pages/DailyCheck/DailySleepCheckStart";
import DailyCheck from "./pages/DailyCheck/DailyCheck";
import DailyMealCheck from "./pages/DailyCheck/DailyMealCheck";
import DailySleepCheck from "./pages/DailyCheck/DailySleepCheck";
import DailySymptomCheckStart from "./pages/DailyCheck/DailySymptomCheckStart";
import DailySymptomCheck from "./pages/DailyCheck/DailySymptomCheck";
import DailyCheckDone from "./pages/DailyCheck/DailyCheckDone";
import HabitManagePage from "./pages/Home/PillChallenge/HabitManagePage";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chart" element={<HealthChart />} />
        <Route path="/community" element={<Community />} />
        <Route path="/mypage" element={<MyPage />} />

        <Route path="/statistics" element={<ChallengeStatistics />} />
        <Route path="/supplementChallengeEdit" element={<SupplementChallengeEditingPage/>}/>
        <Route path="/pillAddingPage" element={<PillManagePage/>}/>
        <Route path="/pillEditingPage/:id" element={<PillManagePage/>}/>
        <Route path="/habitAddingPage" element={<HabitManagePage/>}/>
        <Route path="/habitEditingPage/:id" element={<HabitManagePage/>}/>

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
        <Route path="/dailymealcheck" element={<DailyMealCheck />} />
        <Route path="/dailysleepcheck" element={<DailySleepCheck />} />
        <Route path="/dailycheckdone" element={<DailyCheckDone />} />
      </Routes>
    </div>
  );
};

export default Router;
