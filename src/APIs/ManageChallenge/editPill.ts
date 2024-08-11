import habitInfo from "../../store/habitInfo";
import pillInfo from "../../store/pillInfo";
import { getRequestOptions } from "../utils/getRequestOptions";



export const editPill = (pillToEdit : pillInfo) => {

  // 서버에 요청을 보낸다.
  fetch("localhost:9000/supplements/edit/" + pillToEdit.id, getRequestOptions('PUT', JSON.stringify(pillToEdit)))
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('editPill Error', error));
}



