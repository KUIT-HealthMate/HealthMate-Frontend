import React from 'react'
import { useGlobalStore } from '../../store/store';
import { useEffect } from 'react';

import s from "./EmailCheckPage.module.scss"

const EmailCheckPage = () => {
  const { setShowBottomBar } = useGlobalStore();

  useEffect(() => {
    setShowBottomBar();
    return () => {
      setShowBottomBar();
    };
  },[])

  return (
    <>
      <div>
        <button type="button">
          <img src="" alt="" />
        </button>
        <span>이메일을 확인해주세요</span>
        <div>
          <img src="" alt="" />
          <span>user@example.com</span>
        </div>
      </div>
      <button type="button">
        다음
      </button>
    </>
  )
}

export default EmailCheckPage