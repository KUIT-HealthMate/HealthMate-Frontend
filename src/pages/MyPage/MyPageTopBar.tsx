import s from "./MyPageTopBar.module.scss";
import emptyProfile from "../../assets/emptyProfile.svg";
import edit from "../../assets/editProfile.svg";

export default function MyPageTopBar() {
  return (
    <div className={s.TopBarContainer}>
      <div className="NickNameContainer"></div>

      <div className="profileImgContainer">
        <img
          src={emptyProfile}
          alt="프로필사진을등록하세요"
          className="profileImg"
        />
        <img src={edit} alt="사진수정" className="profileEdit" />
      </div>
    </div>
  );
}
