import DailySymptomCheck from "../DailyCheck/DailySymptomCheck"
import DailySymptomCheckStart from "../DailyCheck/DailySymptomCheckStart"

export const OnBoarding = () => {

    return (
        <DailySymptomCheckStart title1="내 기본 건강정보 등록하기" text1="저장된 기본정보들을 반영해" greentext="s" text2="건강관련 정보들을 제공해드려요!"
            buttonText="설문 시작하기" buttonNavigate="/onboarding_checksymptom"></DailySymptomCheckStart>
    )
}

export const OnBoardingCheckSymptom = () => {
    return (
        <DailySymptomCheck title1="쿠잇님이 현재 겪고있는 증상을" title2="선택해주세요" buttonNavigate="/onboarding_checkpurpose"></DailySymptomCheck>
    )
}


