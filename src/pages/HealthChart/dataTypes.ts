export interface dayLifeStyleResponse {
  description: string;
  regularness: number;
  lifeStyleScore: number;
  immersion: number;
  posture: number;
  riskScore: number;
  riskSymptoms: string;
  challenges: string;
}
export interface dayMealPatternResponse {
  description: string;
  regularity: number;
  alcoholFrequency: number;
  nutritionIntake: number;
  dailyMealPatternScore: number;
  riskScore: number;
  riskSymptoms: string;
  challenges: string;
}
export interface daySleepPatternResponse {
  description: string;
  regularity: number;
  sleepQuality: number;
  sleepFocus: number;
  dailySleepPatternScore: number;
  riskScore: number;
  riskSymptoms: string;
  challenges: string;
}

export interface dayLifeResponse {
  lifeAverage: number;
  lifeRegularnessAverage: number;
  lifePostureAverage: number;
  lifeImmersionAverage: number;
  lifeStyleResponse: dayLifeStyleResponse;
}

export interface dayMealResponse {
  mealAverage: number;
  mealRegularityAverage: number;
  mealNutritionAverage: number;
  mealAlcoholAverage: number;
  mealPatternResponse: dayMealPatternResponse;
}

export interface daySleepResponse {
  sleepAverage: number;
  sleepRegularityAverage: number;
  sleepQualityAverage: number;
  sleepFocusAverage: number;
  sleepPatternResponse: daySleepPatternResponse;
}

//day의 결과
export interface dayResult {
  date: string;
  life: dayLifeResponse;
  meal: dayMealResponse;
  sleep: daySleepResponse;
}

export interface dayResponseDataType {
  code: number;
  status: number;
  message: string;
  timestamp: string;
  result: dayResult;
}

export interface notDayLifeResponse {
  lifeStyleAverages: number[];
  lifeStyleScores: number[];
  description: string;
  lifeScore: number;
  lifeAvgScore: number;
  riskScore: number;
  riskSymptoms: string;
  challenges: string;
}

export interface notDayMealResponse {
  mealPatternAverages: number[];
  mealPatternScores: number[];
  description: string;
  mealScore: number;
  mealAvgScore: number;
  riskScore: number;
  riskSymptoms: string;
  challenges: string;
}

export interface notDaySleepResponse {
  sleepPatternAverages: number[];
  sleepPatternScores: number[];
  description: string;
  sleepScore: number;
  sleepAvgScore: number;
  riskScore: number;
  riskSymptoms: string;
  challenges: string;
}

//week, month의 결과
export interface notDayResult {
  date: string;
  life: notDayLifeResponse;
  meal: notDayMealResponse;
  sleep: notDaySleepResponse;
}

export interface notDayResponseDataType {
  code: number;
  status: number;
  message: string;
  timestamp: string;
  result: notDayResult;
}

// {
//   "code": 1000,
//   "status": 200,
//   "message": "요청에 성공하였습니다.",
//   "timestamp": "2024-08-19T13:38:09.5889202",
//   "result": {
//     "date": "2024-08-12",
//     "life": {
//       "lifeStyleAverages": [
//         64.78,
//         73.12,
//         61.23,
//         76.12,
//         65.45,
//         68.34,
//         66.78
//       ],
//       "lifeStyleScores": [
//         10,
//         10,
//         10,
//         10,
//         10,
//         10,
//         0
//       ],
//       "description": "박성준 님의 주간 생활 습관을 분석한 결과, 스트레스와 근육피로가 의심됩니다. 스트레스와 근육피로가 있으면 두통과 허리통증이 자주 발생할 수 있습니다. 불규칙한 근무/공부 환경과 오랜 시간 동안 집중한 것으로 보아 스트레스가 쌓일 수 있습니다. 또한, 하루 동안 커피를 3잔 이상 마신 것과 운동을 하지 않은 것도 근육피로를 유발할 수 있습니다. 이러한 증상들을 개선하기 위해 규칙적인 생활 패턴을 유지하고, 스트레칭이나 운동을 통해 근육을 이완시키는 것이 도움이 될 수 있습니다. 또한, 커피 섭취량을 조절하고 충분한 휴식을 취하는 것도 중요합니다.",
//       "lifeScore": 60,
//       "lifeAvgScore": 69.45,
//       "riskScore": 60,
//       "riskSymptoms": "스트레스, 근육피로",
//       "challenges": "규칙적인 생활 패턴 유지, 스트레칭 및 운동, 커피 섭취량 조절, 충분한 휴식"
//     },
//     "meal": {
//       "mealPatternAverages": [
//         75.12,
//         68.78,
//         71.78,
//         66.34,
//         74.23,
//         70.34,
//         63.12
//       ],
//       "mealPatternScores": [
//         20,
//         20,
//         20,
//         20,
//         20,
//         20,
//         0
//       ],
//       "description": "박성준 님의 주간 식사 습관을 분석한 결과, 식사 패턴이 대체로 규칙적이지만, 간헐적으로 과식 또는 불규칙한 식사를 하시는 것으로 보여요. 이러한 식사 습관은 소화 과정에 부담을 주고, 장기적으로 소화불량을 유발할 수 있어요. 일반적으로 많은 사람들이 가볍게 여기는 소화불량은, 실제로 우리 몸의 건강 상태를 반영하는 중요한 신호일 수 있어요. 약 20%의 사람들이 일상생활에서 소화불량으로 인한 불편함을 경험하고 있으며, 그 중 일부는 식사 습관의 부적절함으로 인해 발생한다고 해요. 단기간에 나타나는 소화불량은 대부분 식사 습관의 변화로 개선될 수 있으나, 만약 증상이 지속된다면 내과나 소화기내과에서 정확한 진단과 함께 상담이 필요해요. 정기적인 식사 시간을 유지하고, 과식을 피하며, 균형 잡힌 식사를 하는 것이 중요해요. 또한, 식사 후 적절한 활동을 통해 소화를 돕는 것도 좋은 방법이에요.",
//       "mealScore": 50,
//       "mealAvgScore": 73.45,
//       "riskScore": 80,
//       "riskSymptoms": "없음",
//       "challenges": "15번 이상 씹기"
//     },
//     "sleep": {
//       "sleepPatternAverages": [
//         68.34,
//         62.45,
//         64.45,
//         73.45,
//         60.12,
//         66.12,
//         75.23
//       ],
//       "sleepPatternScores": [
//         40,
//         40,
//         40,
//         40,
//         40,
//         40,
//         0
//       ],
//       "description": "박성준 님의 주간 수면 습관을 분석한 결과, 수면 패턴은 안정적이고 수면의 질과 집중도가 높은 편입니다. 다만, 오늘 느껴진 이상 증세인 두통과 허리통증이 있습니다. 이러한 증상은 수면 중에도 계속해서 발생할 수 있으며, 신체적인 문제나 스트레스로 인해 발생할 수 있습니다. 두통과 허리통증이 지속된다면 정확한 원인을 파악하기 위해 내과나 신경과를 방문하여 검사를 받아보는 것이 좋을 것입니다. 또한, 통증을 완화하기 위해 적절한 휴식과 스트레칭을 통해 관리하는 것이 중요합니다.",
//       "sleepScore": 60,
//       "sleepAvgScore": 76.12,
//       "riskScore": 60,
//       "riskSymptoms": "두통, 허리통증",
//       "challenges": "스트레칭 및 근육 강화 운동을 통한 통증 관리"
//     }
//   }
// }

// {
//     "code": 1000,
//     "status": 200,
//     "message": "요청에 성공하였습니다.",
//     "timestamp": "2024-08-16T01:03:54.9439065",
//     "result": {
//       "date": "2024-08-15",
//       "life": {
//         "lifeAverage": 50, //평균점수
//         "lifeRegularnessAverage": 50,
//         "lifePostureAverage": 50,
//         "lifeImmersionAverage": 50,
//         "lifeStyleResponse": {
//           "description": "박성준 님의 하루 생활 습관을 분석한 결과, 스트레스와 근육피로가 의심됩니다. 스트레스와 근육피로가 있으면 두통과 허리통증이 자주 발생할 수 있습니다. 불규칙한 근무/공부 환경과 오랜 시간 동안 집중한 것으로 보아 스트레스가 쌓일 수 있습니다. 또한, 하루 동안 커피를 3잔 이상 마신 것과 운동을 하지 않은 것도 근육피로를 유발할 수 있습니다. 이러한 증상들을 개선하기 위해 규칙적인 생활 패턴을 유지하고, 스트레칭이나 운동을 통해 근육을 이완시키는 것이 도움이 될 수 있습니다. 또한, 커피 섭취량을 조절하고 충분한 휴식을 취하는 것도 중요합니다.",
//           "regularness": 30, //생활습관의 규칙성
//           "lifeStyleScore": 60, //생활습관 점수
//           "immersion": 70, //몰입도
//           "posture": 70, //자세의 바른정도
//           "riskScore": 60,
//           "riskSymptoms": "스트레스, 근육피로",
//           "challenges": "규칙적인 생활 패턴 유지, 스트레칭 및 운동, 커피 섭취량 조절, 충분한 휴식"
//         }
//       },
//       "meal": {
//         "mealAverage": 50,
//         "mealRegularityAverage": 60,
//         "mealNutritionAverage": 59,
//         "mealAlcoholAverage": 50,
//         "mealPatternResponse": {
//           "description": "박성준 님의 하루 식사 습관을 분석한 결과, 식사 패턴이 대체로 불규칙하며, 특히 오늘의 식사는 불규칙한 시간에 이루어진 것으로 나타났습니다. 또한, 식사 중에 TV나 스마트폰을 함께 보는 습관이 있었고, 조미료를 많이 섭취한 것으로 나타났습니다. 이러한 식습관은 소화 과정에 부담을 주고, 소화불량을 유발할 수 있습니다. 또한, 불규칙한 식사 시간과 TV나 스마트폰을 함께 본다는 것은 식사 중에 충분한 집중을 하지 않는 것으로 이어질 수 있습니다. 두통과 허리통증이라는 이상 증세가 나타났는데, 이는 식사 습관의 변화나 영양 섭취 부족으로 인해 발생할 수 있습니다. 두통과 허리통증은 식습관의 개선과 함께 적절한 휴식과 운동을 통해 개선될 수 있습니다. 정기적인 식사 시간을 유지하고, TV나 스마트폰을 끄고 식사를 즐기며, 조미료 섭취를 줄이는 것이 중요합니다. 또한, 두통과 허리통증이 계속되거나 심해진다면 의사를 방문하여 상담 받는 것이 좋습니다.",
//           "regularity": 30,
//           "alcoholFrequency": 50,
//           "nutritionIntake": 40,
//           "dailyMealPatternScore": 60,
//           "riskScore": 60,
//           "riskSymptoms": "두통, 허리통증",
//           "challenges": "식사 시간에 집중하기"
//         }
//       },
//       "sleep": {
//         "sleepAverage": 50,
//         "sleepRegularityAverage": 50,
//         "sleepQualityAverage": 50,
//         "sleepFocusAverage": 50,
//         "sleepPatternResponse": {
//           "description": "박성준 님의 하루 생활 습관을 분석한 결과, 수면 시간이 2~3시간으로 매우 부족합니다. 이는 낮 동안의 피로도와 직결되며, 아침에 느껴진 피로도가 '조금 피곤함'으로 나타난 것도 이와 연관이 있을 수 있습니다. 또한, 컨디션이 가장 좋았던 시간이 오전 8시~10시로 보아, 아침 시간에 비교적 활동적인 것으로 보입니다. 수면 중 뒤척임이 있었다는 점은 수면의 질을 저하시킬 수 있는 요소입니다. 오늘 느껴진 이상 증세인 두통과 허리통증은 부족한 수면과 스트레스, 잘못된 자세에서 기인할 수 있습니다. 이러한 증상이 지속된다면 정확한 원인을 파악하기 위해 내과나 신경과를 방문하여 검사를 받아보는 것이 좋습니다. 또한, 통증을 완화하기 위해 적절한 휴식과 스트레칭을 통해 관리하는 것이 중요합니다.",
//           "regularity": 40,
//           "sleepQuality": 50,
//           "sleepFocus": 40,
//           "dailySleepPatternScore": 40,
//           "riskScore": 70,
//           "riskSymptoms": "두통, 허리통증",
//           "challenges": "스트레칭 및 근육 강화 운동을 통한 통증 관리"
//         }
//       }
//     }
//   }
