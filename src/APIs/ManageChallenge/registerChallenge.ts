
import { getRequestOptions } from "../utils/getRequestOptions";
import { serverURL } from "../utils/serverURL";
import {typeOfChallengeToManage} from "../types/typeOfChallengeToManage";


export const registerChallenge = (challengeToRegister : typeOfChallengeToManage,challengeType: string):string => {

  const endpoint:string = `/${challengeType}/register`;
  let res:string = "";

  // 서버에 요청을 보낸다.
  fetch(
        serverURL + endpoint,
      getRequestOptions('POST', JSON.stringify(challengeToRegister))
  )
  .then(response => response.json())
  .then(result => {res = result.result})
  .catch(error => {res = error; console.log('registerPill Error', error)});

  return res;

}


