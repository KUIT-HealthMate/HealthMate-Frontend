import styles from "../Home.module.scss";
import pillIcon from "../../../assets/pill.svg";
import clampR from "../../../assets/clampR.svg";
import SupplementComponent from "./SupplementComponent/SupplementComponent";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { usePillInfoStore, pillPage } from "../../../store/usePillInfoStore";

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css";



export default function SupplementChallenge() {
  const {
    PillInfo,
    setPillInfo,
    setIntakeRecord,
    getIntakeRecord,
    getIntakeTime,
    getMealTime,
  } = usePillInfoStore();

  const { currentPillPageNum, setPillPageNum } = pillPage();
  const [newPillInfo, setNewPillInfo] = useState(PillInfo.slice(0, 3));

  const handleClick = (currentPillPageNum: number) => {
    setPillPageNum(true);
    console.log("clieck!" + currentPillPageNum)
    setNewPillInfo(PillInfo.slice(3 * (currentPillPageNum), 3 * (currentPillPageNum) + 3));
  };

  return (
    <div className={styles.PillChallenge}>
      <div className={styles.PillChallengeTitle}>
        <img src={pillIcon} className={styles.PillImg}></img>
        <h1 className={styles.PillText}>영양제 챌린지</h1>
        <Link to="/ChallengeEdit" className={styles.PillEdit}>
          편집하기<img src={clampR} className={styles.clampR}></img>
        </Link>
      </div>

      {/* 


      <Container>

        {Array.from({ length: 9 }).map((_, pageIndex) => (
          <Page key={pageIndex}>
            <p>{pageIndex}</p>
            {PillInfo.slice(pageIndex * 3, pageIndex * 3 + 3).map((pill, index) => (
              <SupplementContainer key={index}>
                <SupplementComponent pill={pill} index={pageIndex * 3 + index} />
              </SupplementContainer>
            ))}
          </Page>
        ))}
      </Container> */}


      <div onClick={() => handleClick(currentPillPageNum)}>
        <Swiper spaceBetween={50} slidesPerView={2} >

          {newPillInfo.map((pill, index) => {

            console.log("indes: " + index)
            // if (index >= currentPillPageNum + 3) {

            //   // 다음 페이지로

            //   return;
            // }

            return (
              <>
                <SupplementComponent pill={pill} index={index}></SupplementComponent>
                {/* <SupplementComponent pill={pill} index={index}></SupplementComponent>
              <SupplementComponent pill={pill} index={index}></SupplementComponent> */}
              </>
            );

          })}


        </Swiper>
      </div>
    </div>

  );
}

//export default SupplementChallenge;
