
import backBtn from "../../../assets/backward.svg"



const ProfileTopBar = () => {

    return (
        <div>
            <img src={backBtn} alt="back"></img>
            <div style={{ fontFamily: 'Pretendard', fontStyle: 'normal', }}> 내 프로필 편집하기</div>

            <div>완료</div>
        </div>
    )
}

export default ProfileTopBar;