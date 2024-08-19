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
        // 'Jwt': JWT_TOKEN,
    },

});

// 인터셉터 추가해 매 요청마다 JWT 토큰 추가
client.interceptors.request.use(
    config => {
        const JWT_TOKEN = localStorage.getItem("jwtToken");
        console.log("온보딩 interceptor에서 jwt: ", JWT_TOKEN);
        if (JWT_TOKEN) {
            config.headers['Jwt'] = JWT_TOKEN;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

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
        console.log("JWT: ", JWT_TOKEN)
        const response = await client.post('/onboarding', request);
        return response;
    } catch (error) {
        console.error('온보딩 정보 전송 실패:', error);
        throw error;
    }
};

