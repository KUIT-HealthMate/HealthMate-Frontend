const tokenName: string = "Bearer";

const JWT: string = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNjQ5NjU4MTQzIiwiaWF0IjoxNzIzMDg1ODA4LCJleHAiOjE3MjY2ODU4MDgsInVzZXJJZCI6MX0.0y4fkQBnXqIXNJEPt9RZRpCI0HDBCE50KOPeHjelCw8";

let header = new Headers();
header.append("Jwt", tokenName + " " + JWT);
header.append("Content-type", "application/json")

export const getHeader = ():Headers => {

    return header;

}
