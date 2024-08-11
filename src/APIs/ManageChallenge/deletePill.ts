import habitInfo from "../../store/habitInfo";
import pillInfo from "../../store/pillInfo";
import { getRequestOptions } from "../utils/getRequestOptions";


export const deletePill = (pillToDelete : pillInfo) => {


  // 서버에 요청을 보낸다.
  fetch("localhost:9000/supplements/delete/" + pillToDelete.id, getRequestOptions('PUT', ""))
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('editPill Error', error));

}


