import React, { useEffect } from 'react'
import { registerChallenge } from './registerChallenge'
import { usePillInfoStore } from '../../store/usePillInfoStore'
import {deleteChallenge} from "./deleteChallenge";

const ManageChallengeAPITest = () => {

    const {PillInfo} = usePillInfoStore()
    let {id,dailyIntakeRecord, ...rest} = PillInfo[0];
    console.log("rerendered")

    const handleDelete = () => {
        // PillInfo.forEach((item)  => deleteChallenge(item))
    }

  return (
      <div className="testResult">
          <button onClick={() => registerChallenge(rest, "supplements")}>registerChallenge</button>
          <button onClick={() => handleDelete()}>챌린지 정보 삭제</button>
      </div>
  )
}

export default ManageChallengeAPITest