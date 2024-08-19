import axios from 'axios';
import { profileInfoDto } from '../../dtos/profile/profileDto';

const BASE_URL = process.env.REACT_APP_BACK_URL;
const JWT_TOKEN = localStorage.getItem("jwtToken");


export const clientImg = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Jwt': JWT_TOKEN,
        //'Jwt': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNjQ5NjU4MTQzIiwiaWF0IjoxNzIzMDg1ODA4LCJleHAiOjE3MjY2ODU4MDgsInVzZXJJZCI6MX0.0y4fkQBnXqIXNJEPt9RZRpCI0HDBCE50KOPeHjelCw8',
    },
});

export const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Jwt': JWT_TOKEN,

        //'Jwt': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNjY5MTc3ODA4IiwiaWF0IjoxNzI0MDUwODUzLCJleHAiOjM2MTcyNDA1MDg1MywidXNlcklkIjo2fQ.i3j82Yv3EPZNeyFCYZ-70qVIUNB1SDWj1vRkMdl0U-o',
    },
});


//프로필 정보
export const getProfileInfo = async () => {
    try {
        console.log("getProfileInfo")
        const response = await client.get('/users/myPage');
        const responseResult = response.data.result;

        const responseData: profileInfoDto = {
            nickname: responseResult.nickname,
            profileImage: responseResult.profileImage,
            coin: responseResult.coin,
            isAlarm: responseResult.isAlarm,
            health: responseResult.health,
        }
        console.log("responseData: ", responseData)
        // console.log("name: ", response.data.result.nickname)
        return responseData;
    } catch (error) {
        console.error('프로필 정보 불러오기 실패:', error);
        throw error;
    }

};


//프로필 수정
export const postProfile = async (selectedFile: File) => {
    const data = new FormData();
    data.append('profileImage', selectedFile);
    try {
        const response = await clientImg.post('/users/edit/profile', data);
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
        const response = await client.post('/users/edit/nickname', {
            "nickname": nickname
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('닉네임 수정 실패:', error);
        throw error;
    }

};

