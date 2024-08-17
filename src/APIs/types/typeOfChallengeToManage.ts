import { pillInfo } from "../../store/challengeTypes";
import { habitInfo } from "../../store/challengeTypes";

type typeOfPillToManage = Omit<pillInfo,"id">;
type typeOfHabitToManage = Omit<habitInfo,"id">;
export type typeOfChallengeToManage = typeOfPillToManage | typeOfHabitToManage;
