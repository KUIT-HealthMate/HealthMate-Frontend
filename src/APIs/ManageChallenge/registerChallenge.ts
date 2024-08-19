
import { getRequestOptions } from "../utils/getRequestOptions";
import { serverURL } from "../utils/serverURL";
import { typeOfChallengeToManage } from "../types/typeOfChallengeToManage";


export const registerChallenge = (challengeToRegister: typeOfChallengeToManage, challengeType: string): Promise<string> => {

  const endpoint: string = `/${challengeType}${challengeType === "supplements" ? "/register" : ""}`;
  let res: string = "";

  // 서버에 요청을 보낸다.
  return fetch(
    serverURL + endpoint,
    getRequestOptions('POST', JSON.stringify(challengeToRegister), localStorage.getItem('jwtToken') as string)
  )
    .then(response => response.json())
    .then(result => { res = result.result; console.log("id given by server is:" + res); return res; })
    .catch(error => { res = error; console.log('registerPill Error', error); throw error; });

}


