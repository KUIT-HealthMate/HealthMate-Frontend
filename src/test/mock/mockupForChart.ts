export interface DataInDates {
  myScores: number;
  averageScores: number;
}

export interface ChartDataType {
  [key: number]: DataInDates;
  totalScore: number;
  averageScore: number;
}

export const chartMock: ChartDataType = {
  11: { myScores: 80, averageScores: 40 },
  12: { myScores: 60, averageScores: 20 },
  13: { myScores: 100, averageScores: 50 },
  14: { myScores: 80, averageScores: 70 },
  15: { myScores: 75, averageScores: 15 },
  16: { myScores: 80, averageScores: 40 },
  17: { myScores: 55, averageScores: 55 },
  totalScore: 82,
  averageScore: 35,
};
