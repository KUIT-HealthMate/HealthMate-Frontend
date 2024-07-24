import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import MyPage from "./pages/MyPage/MyPage";
import Community from "./pages/Community/Community";
import HealthChart from "./pages/HealthChart/HealthChart";
import ChallengeStatistics from "./pages/Home/ChallengeStatistics/ChallengeStatistics";
import SupplementChallengeEditingPage from "./pages/Home/SupplementChallengeEditingPage";
import SupplementChallengeActualEditingPage from "./pages/Home/SupplementChallengeActualEditingPage";
import SupplemenetChallengeActualAddingPage from "./pages/Home/SupplemenetChallengeActualAddingPage";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chart" element={<HealthChart />} />
        <Route path="/community" element={<Community />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/statistics" element={<ChallengeStatistics />} />
        <Route
          path="/supplementChallengeEdit"
          element={<SupplementChallengeEditingPage />}
        />
        <Route
          path="/supplementChallengeActualAdd"
          element={<SupplemenetChallengeActualAddingPage />}
        />
        <Route
          path="/supplementChallengeActualEdit"
          element={<SupplementChallengeActualEditingPage />}
        />
      </Routes>
    </div>
  );
};

export default Router;
