import { getHeader } from "./getHeader";

export const getRequestOptions = (requestType: string, requestBody: string):RequestInit => {
    return {
        method: requestType,
        headers: getHeader(),
        body: requestBody,
        redirect: 'follow'
    };
}
