import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACK_URL;
//const JWT_TOKEN = localStorage.getItem("jwtToken");

export const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
});


//건강진단 설문 결과 전송
export const getKakaoLogin = async () => {
    try {

        const response = await client.get('/login/kakao');
        return response;
    } catch (error) {
        console.error('카카오로그인 실패:', error);
        throw error;
    }
};



