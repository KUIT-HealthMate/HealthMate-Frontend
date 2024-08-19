import s from "./Community.module.scss";

import downBraket from "../../assets/community/downBracket.svg";
import fire from "../../assets/community/fire.svg";
import pencil from "../../assets/community/pencil.svg";
import search from "../../assets/community/search.svg";


const Community = () => {
  return (
    <>
    <div className={s.communityHeader}>
      <span>커뮤니티</span>
      <div className={s.communityMenu}>
        <div className={s.bulletinBoardType}>
          <span>전체 게시판</span>
          <button type="button"><img src={downBraket} alt="down" /></button>
        </div>
        <button type="button"><img src={search} alt="search" /></button>
      </div>
    </div>

    <div className={s.hotPostWrap}>
      <div className={s.hotPostSectionTitle}>
        <img src={fire} alt="fire" />
        <span>인기 게시글</span>
      </div>
      <div className={s.hotPost}>
        <span>챌린지 꾸준하게 하는 마음가짐 10가지</span>
      </div>
      <div className={s.hotPost}>
        <span>눈 건강에 좋다는 이 영양제! 거짓성분이라면서요?</span>
      </div>
    </div>

    <button type="button" className={s.newPostButton}>
      <img src={pencil} alt="pencil" />
    </button>

    <div className={s.postWrap}>
      <span className={s.postType}>Q&A</span>
      <span className={s.postTitle}>이 눈 영양제 안전한가요?</span>
      <span className={s.postContent}>얼마전에 매일 먹던 눈 영양제 뚜껑을 까보니 안쪽에
      조금 곰팡이가 나있더라고요.. 몇달 내내 먹었는데 ...</span>
      <span className={s.additionalInfo}>1분 전 ㅣ 익명 ㅣ 댓글 5</span>
    </div>
    <div className={s.postWrap}>
      <span className={s.postType}>후기</span>
      <span className={s.postTitle}>시슬림 진짜 효과 좋네요!</span>
      <span className={s.postContent}>진짜 인스타 광고보고 긴가민가 해서 샀는데
      숙취해소에도 너무 좋고 기본적인 내 체력이 올라간 것 ...</span>
      <span className={s.additionalInfo}>1분 전 ㅣ 익명 ㅣ 댓글 5</span>
    </div>
    <div className={s.postWrap}>
      <span className={s.postType}>Q&A</span>
      <span className={s.postTitle}>말로만 듣던 루테인 섭취 1달차</span>
      <span className={s.postContent}>진짜 귀찮았는데 한달 내내 루테인 먹기 성공했어요!
      먹은 후 느껴진 생생 변화 후기 들고왔습니다! 우선 ...</span>
      <span className={s.additionalInfo}>1분 전 ㅣ 익명 ㅣ 댓글 5</span>
    </div>
    <div className={s.postWrap}>
      <span className={s.postType}>Q&A</span>
      <span className={s.postTitle}>이 눈 영양제 안전한가요?</span>
      <span className={s.postContent}>얼마전에 매일 먹던 눈 영양제 뚜껑을 까보니 안쪽에
      조금 곰팡이가 나있더라고요.. 몇달 내내 먹었는데 ...</span>
      <span className={s.additionalInfo}>1분 전 ㅣ 익명 ㅣ 댓글 5</span>
    </div>
  </>
  );
}

export default Community;