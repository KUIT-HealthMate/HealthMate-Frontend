import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACK_URL;

// axios.get('http://3.39.60.18:9000/challenges/today/1').then((Response) => {
//     console.log(Response.data);
// }).catch((Error) => {
//     console.log(Error);
// })

// export const apiClient = axios.create({
//     baseURL: BASE_URL, // API의 기본 URL
//     withCredentials: true, // 쿠키를 포함한 요청을 보낼 때 필요
// });

//axios객체 생성
export const client = axios.create({
    baseURL: "http://3.39.60.18:9000",
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Jwt': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNjQ5NjU4MTQzIiwiaWF0IjoxNzIzMDg1ODA4LCJleHAiOjE3MjY2ODU4MDgsInVzZXJJZCI6MX0.0y4fkQBnXqIXNJEPt9RZRpCI0HDBCE50KOPeHjelCw8`,
    },

});



export const home = async (): Promise<String> => {
    try {
        const response = await client.get(`/challenges/today/1`, {
            headers: {
                'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNjQ5NjU4MTQzIiwiaWF0IjoxNzIzMDg1ODA4LCJleHAiOjE3MjY2ODU4MDgsInVzZXJJZCI6MX0.0y4fkQBnXqIXNJEPt9RZRpCI0HDBCE50KOPeHjelCw8',
            },
        });
        return response.data;
    } catch (error) {
        console.error('home error');
        throw error;
    }
};

export const putHabitCheck = async (date: string) => {
    console.log(date)
    client.put("/habits/check-status/1", {
        "date": date
    })
        .then((res) => { console.log(res) })
        .catch((err) => { console.log(err) })
};

