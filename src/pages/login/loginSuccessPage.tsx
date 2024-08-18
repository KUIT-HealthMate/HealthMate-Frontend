import queryString from 'query-string';
import { useEffect } from "react";

export const LoginSuccess = () => {
    useEffect(() => {
        console.log(window.location.search)
        let qs = queryString.parse(window.location.search);
        let jwtToken = "Bearer " + qs['Jwt'];

        console.log("quertStrign: ", jwtToken)
        localStorage.setItem('jwtToken', jwtToken)

    }, []);

    return (
        <>로그인 성~공~</>
    )
}