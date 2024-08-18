import { getRequestOptions } from "../utils/getRequestOptions";
import {serverURL} from "../utils/serverURL";


export const deleteChallenge = (challengeIdToDelete : string, challengeType: string) => {

  const endpoint: string = `/${challengeType}/delete/` + challengeIdToDelete// challengeToDelete.id;
  console.log(serverURL + endpoint);

  // 서버에 요청을 보낸다.
  fetch(serverURL + endpoint, getRequestOptions('PUT', ""))
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('deleteChallenge Error', error));

}


