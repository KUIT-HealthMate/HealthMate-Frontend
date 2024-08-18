import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACK_URL;
//const JWT_TOKEN = localStorage.getItem("jwtToken");

export const client = axios.create({
    baseURL: "http://3.39.60.18:9000",
    headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Jwt': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNjY5MTc3ODA4IiwiaWF0IjoxNzIzOTg2MTg4LCJleHAiOjM2MTcyMzk4NjE4OCwidXNlcklkIjoyfQ.TPdvkoLhbV2jp3LyCjZEiCD3v4A74vEscWgLjyV8-u0',
    },
});


//프로필 수정
export const postProfile = async (selectedFile: File) => {
    const data = new FormData();

    data.append('profileImage', selectedFile);
    console.log("selectedFile: ", selectedFile)
    console.log("postProfile들어옴: ", data)
    try {
        const response = await client.patch('/users/edit/profile', data);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('프로필 수정 실패:', error);
        throw error;
    }
    // client.patch("/users/edit/profile", data)
    //     .then((res) => { console.log("응담: ", res) })
    //     .catch((err) => { console.log("에러: ", err) })
};


// export const postProfile = async () => {
//     console.log("JWT_TOKEN: ", JWT_TOKEN)
//     try {
//         const response = await client.get('/challenges/today');
//         console.log(response.data)
//         return response.data;
//     } catch (error) {
//         console.error('홈정보 불러오기 실패:', error);
//         throw error;
//     }

// };

// export const postModifyUser = async (
//     request: modifyUserRequestDTO
// ): Promise<BaseResponse<string>> => {
//     try {
//         const response = await apiClient.post('/user/modify', request);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };