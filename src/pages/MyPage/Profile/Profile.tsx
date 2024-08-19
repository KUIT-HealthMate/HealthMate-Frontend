import { postProfile, postNickname } from "../../../APIs/myPage/profileApi";
import { useMutation } from 'react-query';
import { useState, ChangeEvent } from "react";
import styles from "./Profile.module.scss";
import defaultImg from "../../../assets/defaultProfile.svg";
import profileEdit from "../../../assets/profileEdit.svg";
import backBtn from "../../../assets/backward.svg"
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const TopWrap = styled.div`
    display: flex;
    height: 49px;
    align-items: center;
`

const TopImg = styled.div`
height: 17px;
margin-left: 21px;

`

const TopText = styled.div`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    line-height: 26px;
    margin-left: 12.5px;
`


const StyledSubmit = styled.div`
position: absolute;
right: 21px;

display: flex;
flex-direction: row;
justify-content: center;
align-items: center;

width: 61px;
height: 31px;

background: #05697F;
border-radius: 19.9648px;
`

const SubmitText = styled.div`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    /* identical to box height */
    text-align: right;

    color: #FFFFFF;
`

export default function Profile() {
    const navigate = useNavigate();
    const location = useLocation();
    console.log("location: ", location.state.image)

    const [previewImg, setPreviewImg] = useState(location.state.image);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [nickName, setNickName] = useState(""); //props로 가져오는 값

    const [isSuccess, setIsSuccess] = useState([false, false]);

    const postProfileMutation = useMutation(postProfile, {
        onSuccess: (response) => {
            console.log('프로필 성공:', response.result);
            const newIsSuccess = [...isSuccess]
            newIsSuccess[0] = true
            setIsSuccess(newIsSuccess)

            checkEditSuccess()
        },
        onError: (error) => {
            console.error('프로필실패:', error);
        },
    })
    const postNickNameMutation = useMutation(postNickname, {
        onSuccess: (response) => {
            console.log('닉네임 변경 성공:', response.result);
            const newIsSuccess = [...isSuccess]
            newIsSuccess[1] = true
            setIsSuccess(newIsSuccess)

            checkEditSuccess()
        },
        onError: (error) => {
            console.error('닉네임 변경 실패:', error);
        },
    })

    const checkEditSuccess = () => {
        if (isSuccess.some(element => !element)) {
            navigate('/mypage')
        }
    }


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        // 파일 선택 시, 해당 파일을 상태로 저장
        if (e.target.files && e.target.files.length > 0) {
            console.log("dkr: ", e.target.files[0])
            setSelectedFile(e.target.files[0]);
            setPreviewImg(URL.createObjectURL(e.target.files[0]))
        }
    };


    // 이미지 전송 & 닉네임 전송
    const handleSubmit = async () => {
        //프로필 이미지
        if (!selectedFile) {
            console.log("파일이 선택되지 않았습니다.: ", previewImg);

            const newIsSuccess = [...isSuccess]
            newIsSuccess[0] = true
            setIsSuccess(newIsSuccess)
            //postProfileMutation.mutate(previewImg);
            //  return;
        } else {
            console.log("파일 선택: ", selectedFile);
            postProfileMutation.mutate(selectedFile);
        }


        // 닉네임
        postNickNameMutation.mutate(nickName);

    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("새로운 닉네임: ", e.target.value)
        setNickName(e.target.value);
    }


    return (
        <>
            {/* <ProfileTopBar></ProfileTopBar> */}
            <TopWrap>
                <TopImg>
                    <img src={backBtn} alt="back" onClick={() => { navigate(-1) }}></img>
                </TopImg>
                <TopText style={{ fontFamily: 'Pretendard', fontStyle: 'normal', }}> 내 프로필 편집하기</TopText>

                <StyledSubmit>
                    <SubmitText onClick={handleSubmit}>완료</SubmitText>
                </StyledSubmit>
            </TopWrap>
            <hr></hr>
            <div className={styles.profileWrap}>

                <div className={styles.ProfileImgWrap}>
                    <div className={styles.profileImg}>{

                        selectedFile === null && previewImg === "" ?
                            <img className={styles.defaultImg} src={defaultImg} alt="profileDefaultImg"></img>
                            : <img className={styles.defaultImg} src={previewImg} alt="profileDefaultImg"></img>
                    }</div>
                    <div className={styles.uploadWrapWrap}>
                        <div className={styles.uploadWrap}>
                            <label htmlFor="file-upload">
                                <img className={styles.customUploadImage} src={profileEdit} alt="Upload" />
                            </label>
                            <input className={styles.uploadImg} type="file" accept="*/*" onChange={handleFileChange} />
                        </div>
                    </div>
                </div>


                <div className={styles.enterFiledWrap}>
                    <div className={styles.nicknameTitle}>닉네임</div>
                    <input
                        className={styles.inputNickname}
                        placeholder={location.state.name}
                        type="text"
                        //   value={symptomValue}
                        onChange={handleNameChange}
                    ></input>
                </div>
            </div>
        </>
    )
}