import React, { useEffect } from 'react'
import { registerChallenge } from './registerChallenge'
import { usePillInfoStore } from '../../store/usePillInfoStore'

const ManageChallengeAPITest = () => {

    const {PillInfo} = usePillInfoStore()
    let {id,dailyIntakeRecord, ...rest} = PillInfo[0];

    useEffect(() => {document.getElementsByClassName("testResult")[0].textContent = registerChallenge(rest,"supplements")}, [rest]);
    

  return (
    <div className="testResult">ManageChallengeAPITest</div>
  )
}

export default ManageChallengeAPITest