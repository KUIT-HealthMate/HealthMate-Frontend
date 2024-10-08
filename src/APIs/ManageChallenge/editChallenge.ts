import { getRequestOptions } from "../utils/getRequestOptions";
import { serverURL } from "../utils/serverURL";
import { typeOfChallengeToManage } from "../types/typeOfChallengeToManage";
import { pillInfo } from "../../store/challengeTypes";
import { habitInfo } from "../../store/challengeTypes";



export const editChallenge = (challengeToEdit: pillInfo | habitInfo, challengeType: string) => {

  const endpoint: string = `/${challengeType}/edit/` + challengeToEdit.id;
  console.log(JSON.stringify(challengeToEdit as unknown as typeOfChallengeToManage));
  // 서버에 요청을 보낸다.
  fetch(serverURL + endpoint, getRequestOptions('PUT', JSON.stringify(challengeToEdit as unknown as typeOfChallengeToManage), localStorage.getItem('jwtToken') as string))
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('editPill Error', error));
}



