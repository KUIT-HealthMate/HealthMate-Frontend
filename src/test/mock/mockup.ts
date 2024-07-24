import dayjs from "dayjs";

// export const dummyDataInCalander = {
//   //오늘 날짜 클릭하면 세부수행여부 확인가능
//   date: dayjs(),
//   supplementChallenges: ["알약1", "알약2"],
//   habitChallenges: ["습관1", "습관2"],
// };

interface DailyChallenges {
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
}

interface CalanderMockInterface {
  [key: number]: DailyChallenges;
}

export const julyMock: CalanderMockInterface = {
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
  },
  13: {
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
      { habbit: "앞구르기", accomplished: true },
      { habbit: "물구나무", accomplished: false },
    ],
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
      { habbit: "노래하기", accomplished: false },
    ],
  },
  17: {
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
  },
  19: {
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
  },
  21: {
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
      { habbit: "날기", accomplished: true },
      { habbit: "노래하기", accomplished: false },
    ],
  },
  23: {
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
  },
  24: {
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
      { habbit: "날기", accomplished: true },
      { habbit: "노래하기", accomplished: false },
    ],
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
      { habbit: "노래하기", accomplished: false },
    ],
  },
  27: {
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
  },
  28: {
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
  },
  29: {
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
  },
  30: {
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
      { habbit: "노래하기", accomplished: false },
    ],
  },
};
