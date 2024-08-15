import { tokenAsString } from "./tokenAsString";

let header = new Headers();
header.append("Jwt", tokenAsString);

export const getRequestOptions = (
  requestType: string,
  requestBody: string
): RequestInit => {
  return {
    method: requestType,
    headers: header,
    body: requestBody,
    redirect: "follow",
  };
};
