import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACK_URL;


//axios객체 생성
export const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Jwt': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNjQ5NjU4MTQzIiwiaWF0IjoxNzIzMDg1ODA4LCJleHAiOjE3MjY2ODU4MDgsInVzZXJJZCI6MX0.0y4fkQBnXqIXNJEPt9RZRpCI0HDBCE50KOPeHjelCw8`,
    },

});


//홈정보
export const gethomeInfo = async () => {

    try {
        const response = await client.get('/challenges/today');
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('홈정보 불러오기 실패:', error);
        throw error;
    }


    // client.get("/challenges/today")
    //     .then((response) => {
    //         console.log(response);
    //         return response.data
    //     })
    //     .catch((err) => { console.log(err) })
};

//영양제 체크
export const putSupplementCheck = async (timeSlot: string, pillId: string) => {
    console.log(timeSlot)
    client.put(`/supplements/check-status/${pillId}`, {
        "timeSlot": timeSlot
    })
        .then((res) => { console.log(res) })
        .catch((err) => { console.log(err) })
};



//습관 체크
export const putHabitCheck = async (date: string, habitId: number) => {
    console.log(date, habitId)
    client.put(`/habits/check-status/${habitId}`, {   // path param 있으면 백틱사용
        "date": date
    })
        .then((res) => { console.log(res) })
        .catch((err) => { console.log(err) })
};



