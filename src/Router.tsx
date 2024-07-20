import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import MyPage from "./pages/MyPage/MyPage";
import Community from "./pages/Community/Community";
import HealthChart from "./pages/HealthChart/HealthChart";

import SupplementChallengeEditingPage from "./pages/Home/SupplementChallengeEditingPage";
import SupplementChallengeActualEditingPage from "./pages/Home/SupplementChallengeActualEditingPage";
import SupplemenetChallengeActualAddingPage from "./pages/Home/SupplemenetChallengeActualAddingPage";
import DailyCheckStart from "./pages/DailyCheck/DailyCheckStart";
import DailyMealCheckStart from "./pages/DailyCheck/DailyMealCheckStart";
import DailySleepCheckStart from "./pages/DailyCheck/DailySleepCheckStart";
import DailyCheck from "./pages/DailyCheck/DailyCheck"
import DailyMealCheck from "./pages/DailyCheck/DailyMealCheck";
import DailySleepCheck from "./pages/DailyCheck/DailySleepCheck";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chart" element={<HealthChart />} />
        <Route path="/community" element={<Community />} />
        <Route path="/mypage" element={<MyPage />} />

        <Route path="/supplementChallengeEdit" element={<SupplementChallengeEditingPage />} />
        <Route path="/supplementChallengeActualAdd" element={<SupplemenetChallengeActualAddingPage />} />
        <Route path="/supplementChallengeActualEdit" element={<SupplementChallengeActualEditingPage />} />

        <Route path="/dailycheckstart" element={<DailyCheckStart />} />
        <Route path="/dailymealcheckstart" element={<DailyMealCheckStart />} />
        <Route path="/dailysleepcheckstart" element={<DailySleepCheckStart />} />

        <Route path="/dailycheck" element={<DailyCheck />} />
        <Route path="/dailymealcheck" element={<DailyMealCheck />} />
        <Route path="/dailysleepcheck" element={<DailySleepCheck />} />
      </Routes>
    </div>
  );
};

export default Router;
