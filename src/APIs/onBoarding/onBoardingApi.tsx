import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACK_URL;
const JWT_TOKEN = localStorage.getItem("jwtToken");

//axios객체 생성
export const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        //'Jwt': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNjQ5NjU4MTQzIiwiaWF0IjoxNzIzMDg1ODA4LCJleHAiOjE3MjY2ODU4MDgsInVzZXJJZCI6MX0.0y4fkQBnXqIXNJEPt9RZRpCI0HDBCE50KOPeHjelCw8`,
        'Jwt': JWT_TOKEN,
    },

});

interface onBoardingRequestDto {
    gender: number,
    ageGroup: number,
    symptoms: string[],
    purpose: number[];
}

//온보딩 정보 전송
export const postOnBoarding = async (request: onBoardingRequestDto) => {
    try {
        console.log("postOnBoarding에서 리퀘스트: ", request)
        const response = await client.post('/onboarding', request);
        return response;
    } catch (error) {
        console.error('온보딩 정보 전송 실패:', error);
        throw error;
    }
};

