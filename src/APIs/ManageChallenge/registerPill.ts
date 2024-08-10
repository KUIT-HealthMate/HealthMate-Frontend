import habitInfo from "../../store/habitInfo";
import pillInfo from "../../store/pillInfo";
import { getRequestBodyFromChallenge } from "./getRequestBodyFromChallenge";
import { tokenAsString } from "./tokenAsString";

let header = new Headers();
header.append("Jwt", tokenAsString);


export const registerPill = (pillToRegister : pillInfo) => {

  let requestBody = getRequestBodyFromChallenge<pillInfo>(pillToRegister);

  // 서버에 요청을 보낸다.
  fetch("localhost:9000/supplements/register", requestOptions('POST', requestBody))
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('registerPill Error', error));
}

const requestOptions = (requestType: string, requestBody: string):RequestInit => {
  return {
    method: requestType,
    headers: header,
    body: requestBody,
    redirect: 'follow'
  };
}

