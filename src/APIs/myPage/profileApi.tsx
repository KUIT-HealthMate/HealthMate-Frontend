import axios from 'axios';
import { profileInfoDto } from '../../dtos/profile/profileDto';


const BASE_URL = process.env.REACT_APP_BACK_URL;
//const JWT_TOKEN = localStorage.getItem("jwtToken");



export const clientImg = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
    },
});
// 인터셉터 추가해 매 요청마다 JWT 토큰 추가
clientImg.interceptors.request.use(
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

