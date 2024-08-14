import s from "./MyCommunity.module.scss";
import myCommunity from "../../../assets/myCommunity.png";
import rightGreyArrow from "../../../assets/rightGreyArrow.svg";

interface MyCommunityProps {
  myPosts: number;
  myComments: number;
  savedPost: number;
}

export default function MyCommunity({
  myPosts,
  myComments,
  savedPost,
}: MyCommunityProps) {
  return (
    <div className={s.blockContainer}>
      <div className={s.titleContainer}>
        <img src={myCommunity} alt="coin" className={s.coinImg} />
        <div className={s.title}>나의 커뮤니티</div>
      </div>

      <div className={s.contentContainer}>
        <div className={s.contentComponent}>
          <div className={s.rowContainer}>
            <div className={s.name}>내가 작성한 글</div>
            <div className={s.content}>{myPosts}</div>
          </div>
          <img src={rightGreyArrow} alt="바로가기" />
        </div>
        <div className={s.divider} />
        <div className={s.contentComponent}>
          <div className={s.rowContainer}>
            <div className={s.name}>내가 작성한 댓글</div>
            <div className={s.content}>{myComments}</div>
          </div>
          <img src={rightGreyArrow} alt="바로가기" />
        </div>
        <div className={s.divider} />
        <div className={s.contentComponent}>
          <div className={s.rowContainer}>
            <div className={s.name}>내가 저장한 글 목록</div>
            <div className={s.content}>{savedPost}</div>
          </div>
          <img src={rightGreyArrow} alt="바로가기" />
        </div>
      </div>
    </div>
  );
}
