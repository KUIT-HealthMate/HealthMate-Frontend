import DailySymptomCheck from "../DailyCheck/DailySymptomCheck"
import DailySymptomCheckStart from "../DailyCheck/DailySymptomCheckStart"

export const OnBoarding = () => {

    return (
        <DailySymptomCheckStart title1="내 기본 건강정보 등록하기" text1="저장된 기본정보들을 반영해" greentext="" text2="건강관련 정보들을 제공해드려요!" iconName="dailyCheckStartIcon"
            buttonText="설문 시작하기" buttonNavigate="/onboarding_survey"></DailySymptomCheckStart>
    )
}

export const OnBoardingCheckSymptom = () => {
    return (
        <DailySymptomCheck title1="쿠잇님이 현재 겪고있는 증상을" title2="선택해주세요" buttonNavigatePass="/onboarding_checkpurpose" buttonNavigate="/onboarding_checkpurpose" findKeywordNavigate="/onboarding_checkpurpose" progressPercent={50} type={0}></DailySymptomCheck>
    )
}

export const Welcome = () => {
    return (
        <DailySymptomCheckStart title1="환영합니다!" text1="헬스메이트가 건강한 생활을 도와드릴게요." greentext="" text2="더 정밀한 결과를 위해 일일 건강 진단을 해보세요!"
            buttonText="홈으로" buttonNavigate="/" iconName="welcomeIcon"></DailySymptomCheckStart>
    )
}


