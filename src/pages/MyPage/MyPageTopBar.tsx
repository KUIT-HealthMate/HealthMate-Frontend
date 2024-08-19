import s from "./MyPageTopBar.module.scss";
import emptyProfile from "../../assets/emptyProfile.svg";
import editNickName from "../../assets/rightGreyArrow.svg";
import { useNavigate } from "react-router-dom";

interface MyPageTopBarProps {
  userName: string;
  userProfileImg: string;
}


export default function MyPageTopBar({
  userName,
  userProfileImg,
}: MyPageTopBarProps) {

  const navigate = useNavigate();


  return (
    <div className={s.topBarContainer}>
      <div className={s.nickNameContainer}>
        <div className={s.nameContainer}>
          <div className={s.nickName}>{userName}</div>
          <div className={s.honorific}>님</div>
        </div>
        <div className={s.beHealthy}>오늘도 건강하세요!</div>
        <div className={s.editNickNameContainer}>
          <div className={s.editName} onClick={() => navigate('/profile', {
            state: {
              image: `${userProfileImg}`
            }
          })}>프로필 편집하기</div>
          <img src={editNickName} alt="닉네임수정" className={s.editArrow} />
        </div>
      </div>
      <div className={s.profileImgContainer}>
        <img
          src={userProfileImg === "null" ? emptyProfile : userProfileImg}
          alt="프로필사진을등록하세요"
          className={s.profileImg}
        />
      </div>
    </div>
  );
}
