import styles from "../Home.module.scss";
import pillIcon from "../../../assets/pill.svg";
import clampR from "../../../assets/clampR.svg";
import SupplementComponent from "./SupplementComponent/SupplementComponent";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { usePillInfoStore } from "../../../store/usePillInfoStore";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";
import pillInfo from "../../../store/pillInfo";

SwiperCore.use([Pagination, Navigation]);

export default function SupplementChallenge() {
  const { PillInfo } = usePillInfoStore();

  const splitPillInfo = (array: pillInfo[]) => {
    const result = [];
    for (let i = 0; i < array.length; i += 3) {
      result.push(array.slice(i, i + 3));
    }
    return result;
  };

  const [newPillInfos, setNewPillInfos] = useState<pillInfo[][]>([]);

  useEffect(() => {
    const chunks = splitPillInfo(PillInfo);
    setNewPillInfos(chunks);
  }, [PillInfo]);

  return (
    <div className={styles.PillChallenge}>
      <div className={styles.PillChallengeTitle}>
        <img src={pillIcon} className={styles.PillImg} alt="kimpill"></img>
        <h1 className={styles.PillText}>영양제 챌린지</h1>
        <Link to="/ChallengeEdit" state={{data:"pill"}} className={styles.PillEdit}>
          편집하기<img src={clampR} className={styles.clampR} alt="clamp"></img>
        </Link>
      </div>

      {/* <div onClick={() => handleClick(currentPillPageNum)}> */}
      <div>
        <Swiper
          className={styles.swiper}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          {newPillInfos.map((chunk, chunkindex) => {
            return (
              <SwiperSlide>
                {chunk.map((pill, pillIndex) => {
                  return (
                    <SupplementComponent
                      pill={pill}
                      index={pillIndex}
                    ></SupplementComponent>
                  );
                })}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

//export default SupplementChallenge;
