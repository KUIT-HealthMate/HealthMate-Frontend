import axios from 'axios';
import { diagnosisRequestDto } from '../../dtos/dailycheck/dailyCheckDto';

const BASE_URL = process.env.REACT_APP_BACK_URL;
//const JWT_TOKEN = localStorage.getItem("jwtToken");

export const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
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


//건강진단 설문 결과 전송
export const postDiagnosis = async (request: diagnosisRequestDto) => {
    try {
        console.log("postDiagnosis 리퀘스트: ", request)
        const response = await client.post('/diagnosis', request);
        return response;
    } catch (error) {
        console.error('일일진단 결과 전송 실패:', error);
        throw error;
    }
};



