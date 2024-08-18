
import ProfileTopBar from "./ProfileTopBar";
import { postProfile } from "../../../APIs/myPage/profileApi";
import React from "react";
import { useMutation } from 'react-query';
import { useState, ChangeEvent } from "react";


export default function Profile() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);



    const postProfileMutation = useMutation(postProfile, {
        onSuccess: (response) => {
            console.log('프로필 성공:', response.result);

        },
        onError: (error) => {
            console.error('프로필실패:', error);
        },
    })


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        // 파일 선택 시, 해당 파일을 상태로 저장
        if (e.target.files && e.target.files.length > 0) {
            console.log("dkr: ", e.target.files[0])
            setSelectedFile(e.target.files[0]);
        }
    };


    const handleSubmit = async () => {
        if (!selectedFile) {
            console.log("파일이 선택되지 않았습니다.");
            return;
        } else {
            console.log("파일 선택: ", selectedFile)
        }

        //const formData = new FormData();
        // formData.append("profileImage", selectedFile);
        //postProfile(selectedFile);
        postProfileMutation.mutate(selectedFile);

    }

    return (
        <>
            {/* <ProfileTopBar></ProfileTopBar> */}
            {/* <div onClick={EditProfile}> */}
            <div>프로필</div>
            <input type="file" accept="*/*" onChange={handleFileChange} />
            {/* </div> */}
            <div onClick={handleSubmit}>완료</div>
        </>
    )
}