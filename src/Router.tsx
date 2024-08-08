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

import { OnBoarding, OnBoardingCheckSymptom } from "./pages/OnBoarding/OnBoarding";
import OnBoardingCheckPurpose from "./pages/OnBoarding/OnBoardingCheckPurpose";
import { Welcome } from "./pages/OnBoarding/OnBoarding";
import { FindKeyword } from "./pages/OnBoarding/findKeyword";

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
        <Route path="/dailysymptomcheckstart" element={<DailySymptomCheckStart title1="마지막이에요" text1="마지막으로 쿠잇님의" greentext="오늘 느낀 이상증상" text2="을 알아보고 싶어요." buttonText="이상증상 체크하기" buttonNavigate="/dailysymptomcheck" iconName="dailyCheckStartIcon" />} />
        <Route path="/dailysymptomcheck" element={<DailySymptomCheck title1="오늘 느껴진 이상 증세가" title2="있으신가요?" buttonNavigatePass="/dailycheckdone" buttonNavigate="/dailycheckdone" findKeywordNavigate="/dailycheckdone" />} />

        <Route path="/dailycheck" element={<DailyCheck />} />
        <Route path="/dailycheckdone" element={<DailyCheckDone />} />

        <Route path="/onboarding" element={<OnBoarding />} />
        <Route path="/onboarding_checksymptom" element={<OnBoardingCheckSymptom />} />
        <Route path="/onboarding_checkpurpose" element={<OnBoardingCheckPurpose />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/findkeyword" element={<FindKeyword />} />

        <Route path="/usage" element={<CoinDepositAndUsage />} />

      </Routes>
    </div>
  );
};

export default Router;
