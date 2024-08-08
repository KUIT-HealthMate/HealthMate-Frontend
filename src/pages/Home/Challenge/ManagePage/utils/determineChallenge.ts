export const isPillChallenge = (challengeType: string): boolean => {
    return challengeType == 'pill' ? true : false;
}

export const isHabitChallenge = (challengeType: string): boolean => {
    return challengeType == 'habit' ? true : false;
}