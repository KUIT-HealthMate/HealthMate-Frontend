
export interface habitDto {
    challengeId: number,
    challengeName: string,
    achievementStatus: boolean,
}

export interface supplementDto {
    challengeName: string,
    challengeId: number,
    afterMeal: number,
    breakfastSuccess: boolean,
    lunchSuccess: boolean,
    dinnerSuccess: boolean,
    breakfastRequired: boolean,
    lunchRequired: boolean,
    dinnerRequired: boolean,
    success: boolean
}

