import queryString from 'query-string';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LoginSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log(window.location.search)
        let qs = queryString.parse(window.location.search);
        let jwtToken = "Bearer " + qs['Jwt'];
        let isNew = qs['isNew'];
        let isNewBoolean;
        console.log(isNew)
        if (isNew === "false") {
            isNewBoolean = false;
        } else {
            isNewBoolean = true;
        }

        console.log("quertStrign: ", jwtToken)
        localStorage.setItem('jwtToken', jwtToken)
        finishLogin(isNewBoolean)
        // eslint-disable-next-line
    }, []);


    const finishLogin = (isNew: boolean) => {
        console.log(isNew)
        if (isNew) {
            console.log("NEW임")
            navigate('/emailCheck')
        } else {
            console.log("NEW아님")
            navigate('/')
        }
    }


    return (
        <>로그인 성~공~</>
    )
}