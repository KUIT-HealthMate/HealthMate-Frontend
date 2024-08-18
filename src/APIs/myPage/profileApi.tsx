import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACK_URL;
//const JWT_TOKEN = localStorage.getItem("jwtToken");

export const client = axios.create({
    baseURL: "http://3.39.60.18:9000",
    headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Jwt': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNjQ5NjU4MTQzIiwiaWF0IjoxNzIzMDg1ODA4LCJleHAiOjE3MjY2ODU4MDgsInVzZXJJZCI6MX0.0y4fkQBnXqIXNJEPt9RZRpCI0HDBCE50KOPeHjelCw8',
    },
});

export const clientNickname = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Jwt': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNjQ5NjU4MTQzIiwiaWF0IjoxNzIzMDg1ODA4LCJleHAiOjE3MjY2ODU4MDgsInVzZXJJZCI6MX0.0y4fkQBnXqIXNJEPt9RZRpCI0HDBCE50KOPeHjelCw8',
    },
});


//프로필 수정
export const postProfile = async (selectedFile: File) => {
    const data = new FormData();

    data.append('profileImage', selectedFile);
    console.log("selectedFile: ", selectedFile)
    console.log("postProfile들어옴: ", data)
    try {
        const response = await client.post('/users/edit/profile', data);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('프로필 수정 실패:', error);
        throw error;
    }

};

//닉네임 수정
export const postNickname = async (nickname: string) => {
    console.log("nickname: ", nickname)
    try {
        const response = await clientNickname.patch('/users/edit/nickname', {
            "nickname": nickname
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('닉네임 수정 실패:', error);
        throw error;
    }

};

