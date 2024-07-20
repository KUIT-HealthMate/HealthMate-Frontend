import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import MyPage from "./pages/MyPage/MyPage";
import Community from "./pages/Community/Community";
import HealthChart from "./pages/HealthChart/HealthChart";
import SupplementChallengeEditingPage from "./pages/Home/SupplementChallengeEditingPage";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chart" element={<HealthChart />} />
        <Route path="/community" element={<Community />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/supplementChallengeEdit" element={<SupplementChallengeEditingPage/>}/>
      </Routes>
    </div>
  );
};

export default Router;
