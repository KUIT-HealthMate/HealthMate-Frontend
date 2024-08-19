import { getHeader } from "./getHeader";

export const getRequestOptions = (requestType: string, requestBody: string):RequestInit => {
    if(requestType === "GET"){
        return {
            method: requestType,
            headers: getHeader(),
            redirect: 'follow'
        }
    } else {
        return {
            method: requestType,
            headers: getHeader(),
            body: requestBody,
            redirect: 'follow'
        };
    }
}
