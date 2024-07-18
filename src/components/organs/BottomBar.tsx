import { Link, useLocation } from "react-router-dom";
import home from "../../assets/home.svg";
import chart from "../../assets/chart.svg";
import community from "../../assets/community.svg";
import myPage from "../../assets/myPage.svg";
import sHome from "../../assets/selectedHome.svg";
import sChart from "../../assets/selectedChart.svg";
import sCommunity from "../../assets/selectedCommunity.svg";
import sMyPage from "../../assets/selectedMyPage.svg";
import s from "./BottomBar.module.scss";

interface BarItem {
  name: string;
  img: string;
  selectedImg: string;
  link: string;
}

export default function BottomBar() {
  const location = useLocation();

  const barItem: Array<BarItem> = [
    { name: "홈", img: home, selectedImg: sHome, link: "/" },
    { name: "건강차트", img: chart, selectedImg: sChart, link: "/chart" },
    {
      name: "커뮤니티",
      img: community,
      selectedImg: sCommunity,
      link: "/community",
    },
    { name: "마이페이지", img: myPage, selectedImg: sMyPage, link: "/mypage" },
  ];

  return (
    <nav className={s.barContainer}>
      {barItem.map((item, index) => {
        const selected = location.pathname === item.link;
        return (
          <Link to={item.link} key={index}>
            <div className={s.barItem}>
              <img
                src={selected ? item.selectedImg : item.img}
                alt={index.toString()}
                className={s.barIcon}
              />
              <p className={`${s.barItemName} ${selected ? s.selected : ""}`}>
                {item.name}
              </p>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
