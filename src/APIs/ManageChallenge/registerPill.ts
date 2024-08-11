import pillInfo from "../../store/pillInfo";
import { getRequestBodyFromChallenge } from "./getRequestBodyFromChallenge";
import {getRequestOptions} from "./requestOptions";




export const registerPill = (pillToRegister : pillInfo) => {

  let requestBody = getRequestBodyFromChallenge<pillInfo>(pillToRegister);

  // 서버에 요청을 보낸다.
  fetch("localhost:9000/supplements/register", getRequestOptions('POST', requestBody))
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('registerPill Error', error));
}


