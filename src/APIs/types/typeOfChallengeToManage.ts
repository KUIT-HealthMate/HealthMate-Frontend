import pillInfo from "../../store/pillInfo";
import habitInfo from "../../store/habitInfo";

type typeOfPillToManage = Omit<pillInfo,"id"|"dailyIntakeRecord">;
type typeOfHabitToManage = Omit<habitInfo,"id"|"executionRecord">;
export type typeOfChallengeToManage = typeOfPillToManage | typeOfHabitToManage;
