import { getHeader } from "./getHeader";

export const getRequestOptions = (requestType: string, requestBody: string, JWT_TOKEN: string): RequestInit => {
    if (requestType === "GET") {
        return {
            method: requestType,
            headers: getHeader(JWT_TOKEN),
            redirect: 'follow'
        }
    } else {
        return {
            method: requestType,
            headers: getHeader(JWT_TOKEN),
            body: requestBody,
            redirect: 'follow'
        };
    }
}
