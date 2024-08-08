// export const dummyDataInCalander = {
//   //오늘 날짜 클릭하면 세부수행여부 확인가능
//   date: dayjs(),
//   supplementChallenges: ["알약1", "알약2"],
//   habitChallenges: ["습관1", "습관2"],
// };

export interface DailyChallenges {
  supplementChallenges: {
    pill: string;
    dailyIntakePeriod: {
      breakfast: boolean;
      lunch: boolean;
      dinner: boolean;
    };
  }[];
  habitChallenges: {
    habbit: string;
    accomplished: boolean;
  }[];
  dailyAccomplishment: number;
}

export interface CalanderDataInterface {
  [key: number]: DailyChallenges;
  periodAverage: number;
}

export const julyMock: CalanderDataInterface = {
  1: {
    supplementChallenges: [
      {
        pill: "알약1",
        dailyIntakePeriod: { breakfast: true, lunch: false, dinner: true },
      },
      {
        pill: "알약2",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "앞구르기", accomplished: true },
      { habbit: "물구나무", accomplished: false },
    ],
    dailyAccomplishment: 75,
  },
  2: {
    supplementChallenges: [
      {
        pill: "알약8",
        dailyIntakePeriod: { breakfast: true, lunch: false, dinner: false },
      },
      {
        pill: "알약12",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "날기", accomplished: true },
      { habbit: "노래하기", accomplished: false },
    ],
    dailyAccomplishment: 62,
  },
  3: {
    supplementChallenges: [
      {
        pill: "알약8",
        dailyIntakePeriod: { breakfast: true, lunch: false, dinner: false },
      },
      {
        pill: "알약12",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "날기", accomplished: true },
      { habbit: "노래하기", accomplished: false },
    ],
    dailyAccomplishment: 62,
  },
  4: {
    supplementChallenges: [
      {
        pill: "알약8",
        dailyIntakePeriod: { breakfast: true, lunch: false, dinner: false },
      },
      {
        pill: "알약12",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "날기", accomplished: true },
      { habbit: "노래하기", accomplished: false },
    ],
    dailyAccomplishment: 62,
  },
  5: {
    supplementChallenges: [
      {
        pill: "알약8",
        dailyIntakePeriod: { breakfast: true, lunch: false, dinner: false },
      },
      {
        pill: "알약12",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "날기", accomplished: true },
      { habbit: "노래하기", accomplished: false },
    ],
    dailyAccomplishment: 62,
  },
  6: {
    supplementChallenges: [
      {
        pill: "알약8",
        dailyIntakePeriod: { breakfast: true, lunch: false, dinner: false },
      },
      {
        pill: "알약12",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "날기", accomplished: true },
      { habbit: "노래하기", accomplished: false },
    ],
    dailyAccomplishment: 62,
  },
  7: {
    supplementChallenges: [
      {
        pill: "알약8",
        dailyIntakePeriod: { breakfast: true, lunch: false, dinner: false },
      },
      {
        pill: "알약12",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "날기", accomplished: true },
      { habbit: "노래하기", accomplished: false },
    ],
    dailyAccomplishment: 62,
  },
  8: {
    supplementChallenges: [
      {
        pill: "알약8",
        dailyIntakePeriod: { breakfast: true, lunch: false, dinner: false },
      },
      {
        pill: "알약12",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "날기", accomplished: true },
      { habbit: "노래하기", accomplished: false },
    ],
    dailyAccomplishment: 62,
  },
  9: {
    supplementChallenges: [
      {
        pill: "알약8",
        dailyIntakePeriod: { breakfast: true, lunch: false, dinner: false },
      },
      {
        pill: "알약12",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "날기", accomplished: true },
      { habbit: "노래하기", accomplished: false },
    ],
    dailyAccomplishment: 62,
  },
  10: {
    supplementChallenges: [
      {
        pill: "알약8",
        dailyIntakePeriod: { breakfast: true, lunch: false, dinner: false },
      },
      {
        pill: "알약12",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "날기", accomplished: true },
      { habbit: "노래하기", accomplished: false },
    ],
    dailyAccomplishment: 62,
  },
  11: {
    supplementChallenges: [
      {
        pill: "알약1",
        dailyIntakePeriod: { breakfast: true, lunch: false, dinner: true },
      },
      {
        pill: "알약2",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "앞구르기", accomplished: true },
      { habbit: "물구나무", accomplished: false },
    ],
    dailyAccomplishment: 62,
  },
  12: {
    supplementChallenges: [
      {
        pill: "알약1",
        dailyIntakePeriod: { breakfast: true, lunch: false, dinner: true },
      },
      {
        pill: "알약2",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "앞구르기", accomplished: true },
      { habbit: "물구나무", accomplished: false },
    ],
    dailyAccomplishment: 62,
  },
  13: {
    supplementChallenges: [
      {
        pill: "알약1",
        dailyIntakePeriod: { breakfast: false, lunch: false, dinner: true },
      },
      {
        pill: "알약2",
        dailyIntakePeriod: { breakfast: false, lunch: false, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "꼭꼭씹어먹기", accomplished: false },
      { habbit: "물구나무", accomplished: false },
    ],
    dailyAccomplishment: 25,
  },
  14: {
    supplementChallenges: [
      {
        pill: "알약1",
        dailyIntakePeriod: { breakfast: true, lunch: false, dinner: true },
      },
      {
        pill: "알약2",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "앞구르기", accomplished: true },
      { habbit: "물구나무", accomplished: false },
    ],
    dailyAccomplishment: 62,
  },
  15: {
    supplementChallenges: [
      {
        pill: "알약1",
        dailyIntakePeriod: { breakfast: true, lunch: false, dinner: true },
      },
      {
        pill: "알약2",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "꼭꼭씹어먹기", accomplished: true },
      { habbit: "물구나무", accomplished: false },
    ],
    dailyAccomplishment: 62,
  },
  16: {
    supplementChallenges: [
      {
        pill: "알약8",
        dailyIntakePeriod: { breakfast: true, lunch: false, dinner: false },
      },
      {
        pill: "알약12",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "날기", accomplished: true },
      { habbit: "노래하기", accomplished: true },
    ],
    dailyAccomplishment: 75,
  },
  17: {
    supplementChallenges: [
      {
        pill: "알약1",
        dailyIntakePeriod: { breakfast: true, lunch: false, dinner: true },
      },
      {
        pill: "알약2",
        dailyIntakePeriod: { breakfast: false, lunch: false, dinner: false },
      },
    ],
    habitChallenges: [
      { habbit: "꼭꼭씹어먹기", accomplished: true },
      { habbit: "물구나무", accomplished: true },
    ],
    dailyAccomplishment: 50,
  },
  18: {
    supplementChallenges: [
      {
        pill: "알약8",
        dailyIntakePeriod: { breakfast: true, lunch: false, dinner: false },
      },
      {
        pill: "알약12",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "날기", accomplished: true },
      { habbit: "노래하기", accomplished: false },
    ],
    dailyAccomplishment: 62,
  },
  19: {
    supplementChallenges: [
      {
        pill: "알약8",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: false },
      },
      {
        pill: "알약12",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "날기", accomplished: true },
      { habbit: "꼭꼭씹어먹기", accomplished: false },
    ],
    dailyAccomplishment: 75,
  },
  20: {
    supplementChallenges: [
      {
        pill: "알약8",
        dailyIntakePeriod: { breakfast: true, lunch: false, dinner: false },
      },
      {
        pill: "알약12",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "날기", accomplished: true },
      { habbit: "노래하기", accomplished: false },
    ],
    dailyAccomplishment: 62,
  },
  21: {
    supplementChallenges: [
      {
        pill: "알약8",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
      {
        pill: "알약12",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "날기", accomplished: true },
      { habbit: "노래하기", accomplished: true },
    ],
    dailyAccomplishment: 100,
  },
  22: {
    supplementChallenges: [
      {
        pill: "알약8",
        dailyIntakePeriod: { breakfast: true, lunch: false, dinner: false },
      },
      {
        pill: "알약12",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "꼭꼭씹어먹기", accomplished: true },
      { habbit: "노래하기", accomplished: false },
    ],
    dailyAccomplishment: 62,
  },
  23: {
    supplementChallenges: [
      {
        pill: "알약8",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
      {
        pill: "알약12",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "날기", accomplished: true },
      { habbit: "노래하기", accomplished: true },
    ],
    dailyAccomplishment: 100,
  },
  24: {
    supplementChallenges: [
      {
        pill: "알약8",
        dailyIntakePeriod: { breakfast: true, lunch: false, dinner: false },
      },
      {
        pill: "알약12",
        dailyIntakePeriod: { breakfast: true, lunch: false, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "안날기", accomplished: true },
      { habbit: "노래하기", accomplished: true },
    ],
    dailyAccomplishment: 75,
  },
  25: {
    supplementChallenges: [
      {
        pill: "알약8",
        dailyIntakePeriod: { breakfast: true, lunch: false, dinner: false },
      },
      {
        pill: "알약12",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "안날기", accomplished: true },
      { habbit: "노래하기", accomplished: true },
    ],
    dailyAccomplishment: 75,
  },
  26: {
    supplementChallenges: [
      {
        pill: "알약8",
        dailyIntakePeriod: { breakfast: true, lunch: false, dinner: false },
      },
      {
        pill: "알약12",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "날기", accomplished: true },
      { habbit: "춤추기", accomplished: true },
    ],
    dailyAccomplishment: 75,
  },
  27: {
    supplementChallenges: [
      {
        pill: "알약8",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: false },
      },
      {
        pill: "알약12",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "날기", accomplished: true },
      { habbit: "춤추기", accomplished: false },
    ],
    dailyAccomplishment: 75,
  },
  28: {
    supplementChallenges: [
      {
        pill: "알약8",
        dailyIntakePeriod: { breakfast: true, lunch: false, dinner: true },
      },
      {
        pill: "알약12",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "날기", accomplished: true },
      { habbit: "춤추기", accomplished: false },
    ],
    dailyAccomplishment: 75,
  },
  29: {
    supplementChallenges: [
      {
        pill: "알약8",
        dailyIntakePeriod: { breakfast: true, lunch: false, dinner: true },
      },
      {
        pill: "알약12",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "날기", accomplished: true },
      { habbit: "춤추기", accomplished: false },
    ],
    dailyAccomplishment: 75,
  },
  30: {
    supplementChallenges: [
      {
        pill: "알약8",
        dailyIntakePeriod: { breakfast: true, lunch: false, dinner: true },
      },
      {
        pill: "알약12",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "날기", accomplished: true },
      { habbit: "노래하기", accomplished: false },
    ],
    dailyAccomplishment: 75,
  },
  31: {
    supplementChallenges: [
      {
        pill: "알약8",
        dailyIntakePeriod: { breakfast: true, lunch: false, dinner: false },
      },
      {
        pill: "알약12",
        dailyIntakePeriod: { breakfast: true, lunch: true, dinner: true },
      },
    ],
    habitChallenges: [
      { habbit: "날기", accomplished: true },
      { habbit: "춤추기", accomplished: false },
    ],
    dailyAccomplishment: 62,
  },
  periodAverage: 82,
};
