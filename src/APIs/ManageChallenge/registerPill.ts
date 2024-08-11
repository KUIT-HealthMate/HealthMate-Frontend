import pillInfo from "../../store/pillInfo";
import { getRequestOptions } from "../utils/getRequestOptions";
import { serverURL } from "../utils/serverURL";

export const registerPill = (pillToRegister : Omit<pillInfo,"id"|"dailyIntakeRecord">):string => {
 
  let res:string = "";
  // 서버에 요청을 보낸다.
  fetch(serverURL + "/supplements/register", getRequestOptions('POST', JSON.stringify(pillToRegister)))
  .then(response => response.text())
  .then(result => {res = result; console.log(result);})
  .catch(error => {res = error; console.log('registerPill Error', error)});

  return res;

}


