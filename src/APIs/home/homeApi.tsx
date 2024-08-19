import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACK_URL;
const JWT_TOKEN = localStorage.getItem("jwtToken");

//axios객체 생성
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
        console.log("interceptor에서 ㅓ: ", JWT_TOKEN);
        if (JWT_TOKEN) {
            config.headers['Jwt'] = JWT_TOKEN; // 'Authorization' 헤더에 추가
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


//홈정보
export const gethomeInfo = async () => {
    console.log("JWT_TOKEN: ", JWT_TOKEN)
    console.log("JWT 가져옴: ", localStorage.getItem("jwtToken"))
    try {
        const response = await client.get('/challenges/today');
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('홈정보 불러오기 실패:', error);
        throw error;
    }

};

//영양제 체크
export const putSupplementCheck = async (timeSlot: string, pillId: number) => {
    console.log(timeSlot)
    client.put(`/supplements/check-status/${pillId}`, {
        "timeSlot": timeSlot
    })
        .then((res) => { console.log(res) })
        .catch((err) => { console.log(err) })
};



//습관 체크
export const putHabitCheck = async (todayDate: string, habitId: number) => {
    console.log("putHabitCheck: ", { todayDate }, habitId)
    // path param 있으면 백틱사용
    const data = {
        "date": todayDate
    }
    console.log("data: ", data)
    client.put(`/habits/check-status/${habitId}`, data)
        .then((res) => { console.log(res) })
        .catch((err) => { console.log(err) })
};



