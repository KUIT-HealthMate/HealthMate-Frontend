export interface lifeStyleDto {
    environmentScore: number,
    focusTimeScore: number,
    coffeeConsumptionScore: number,
    exerciseTimeScore: number,
    postureDiscomfortScore: number,
}


export interface mealPatternDto {
    mealTimeScore: number,
    foodType: number,
    regularMealTimeScore: number,
    mealDurationScore: number,
    seasoningConsumptionScore: number,
    screenUsage: number,
    mealRemark: number,
}


export interface sleepPatternDto {
    sleepDurationScore: number,
    morningFatigueScore: number,
    peakConditionTimeScore: number,
    sleepRemarkScore: number,
}


export interface symptomDto {
    symptomInfos: { symptomName: string }[];
}


export interface diagnosisRequestDto {
    userName: string,
    lifeStyleDto: lifeStyleDto,
    mealPatternDto: mealPatternDto,
    sleepPatternDto: sleepPatternDto,
    symptomInfos: { symptomName: string }[],
    date: string
}

