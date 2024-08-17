
interface challengeBaseInfo {

    // 챌린지 ID 
    id: string;

    // 챌린지 이름
    name: string; 

    // 월요일 ~ 일요일 중 챌린지를 수행하는 요일
    weeklyIntakeFrequency: {
      monday: boolean,
      tuesday: boolean,
      wednesday: boolean,
      thursday: boolean,
      friday: boolean,
      saturday: boolean,
      sunday: boolean
    }; 

    // 유저가 등록한 알림톡 시간
    notificationTime: {hour:number, minute:number}[];
}

export interface pillInfo extends challengeBaseInfo {

    // 알약 섭취 시간
    intakeTime: { beforeOrAfterMeal:number, minutes:number}; 

    // 아침, 점심, 저녁 중 알약을 섭취하는 끼니
    dailyIntakePeriod: { breakfast: boolean, lunch: boolean, dinner: boolean  };

}

export interface habitInfo extends challengeBaseInfo {

    // 다른 필드 없음
    
}



export default challengeBaseInfo