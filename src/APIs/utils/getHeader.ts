// const tokenName: string = "Bearer";

//const JWT = localStorage.getItem("jwtToken");
//const JWT: string = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNjQ5NjU4MTQzIiwiaWF0IjoxNzIzMDg1ODA4LCJleHAiOjE3MjY2ODU4MDgsInVzZXJJZCI6MX0.0y4fkQBnXqIXNJEPt9RZRpCI0HDBCE50KOPeHjelCw8";



export const getHeader = (JWT_TOKEN: string): Headers => {
    let header = new Headers();
    header.append("Jwt", JWT_TOKEN);
    header.append("Content-type", "application/json");
    // console.log(header)
    return header;

}
