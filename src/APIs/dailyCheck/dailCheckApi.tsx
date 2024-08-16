import axios from 'axios';
import { diagnosisRequestDto } from '../../dtos/dailycheck/dailyCheckDto';

const BASE_URL = process.env.REACT_APP_BACK_URL;

export const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Jwt': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNjQ5NjU4MTQzIiwiaWF0IjoxNzIzMDg1ODA4LCJleHAiOjE3MjY2ODU4MDgsInVzZXJJZCI6MX0.0y4fkQBnXqIXNJEPt9RZRpCI0HDBCE50KOPeHjelCw8`,
    },
});


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



