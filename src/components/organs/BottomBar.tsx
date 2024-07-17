import home from "../../assets/home.svg";
import chart from "../../assets/chart.svg";
import community from "../../assets/community.svg";
import myPage from "../../assets/myPage.svg";
import s from "./BottomBar.module.scss";

interface BarItem {
  name: string;
  img: string;
  link: string;
}

export default function BottomBar() {
  const barItem: Array<BarItem> = [
    { name: "홈", img: home, link: "home" },
    { name: "건강차트", img: chart, link: "chart" },
    { name: "커뮤니티", img: community, link: "community" },
    { name: "마이페이지", img: myPage, link: "mypage" },
  ];

  const selectedBarItem: Array<BarItem> = [
    { name: "홈", img: home, link: "home" },
    { name: "건강차트", img: chart, link: "chart" },
    { name: "커뮤니티", img: community, link: "community" },
    { name: "마이페이지", img: myPage, link: "mypage" },
  ];

  return (
    <div className={s.barContainer}>
      {barItem.map((item, index) => (
        <div className={s.barItem} key={index}>
          <img src={item.img} alt={index.toString()} className={s.barIcon} />
          <p className={s.barItemName}>{item.name}</p>
        </div>
      ))}
    </div>
  );
}
