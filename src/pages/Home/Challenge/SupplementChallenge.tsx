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

//api 관련
import { supplementDto } from "../../../dtos/home/homeDto";

SwiperCore.use([Pagination, Navigation]);

interface SupplementChallengeProps {
  supplements: supplementDto[];
}

export default function SupplementChallenge(props: SupplementChallengeProps) {
  const { PillInfo } = usePillInfoStore();

  const splitPillInfo = (array: supplementDto[]) => {
    const result = [];
    for (let i = 0; i < array.length; i += 3) {
      result.push(array.slice(i, i + 3));
    }
    return result;
  };

  const [newPillInfos, setNewPillInfos] = useState<supplementDto[][]>([props.supplements]);

  useEffect(() => {
    const chunks = splitPillInfo(props.supplements);
    setNewPillInfos(chunks);
    // eslint-disable-next-line
  }, [PillInfo]);

  return (
    <div className={styles.PillChallenge}>
      <div className={styles.PillChallengeTitle}>
        <img src={pillIcon} className={styles.PillImg} alt="kimpill"></img>
        <h1 className={styles.PillText}>영양제 챌린지</h1>
        <Link to="/ChallengeEdit" className={styles.PillEdit}>
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
