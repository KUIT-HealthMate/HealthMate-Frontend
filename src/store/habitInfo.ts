export interface habitInfo {
    id: string;
    name: string; // 알약 이름
    // executionRecord: boolean;
    weeklyExecutionFrequency: {
      monday: boolean,
      tuesday: boolean,
      wednesday: boolean,
      thursday: boolean,
      friday: boolean,
      saturday: boolean,
      sunday: boolean
    }; // 주 섭취 횟수 (월 ~ 일)
    notificationTime: {hour:number, minutes:number}[]; // 팝업 알림 시간 (19:30 이면 19, 30)
}

export default habitInfo;