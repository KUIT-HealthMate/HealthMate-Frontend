import React, { useEffect } from 'react'
import { registerPill } from './registerPill'
import { usePillInfoStore } from '../../store/usePillInfoStore'
import pillInfo from '../../store/pillInfo'

const ManageChallengeAPITest = () => {

    const {PillInfo} = usePillInfoStore()
    let {id,dailyIntakeRecord, ...rest} = PillInfo[0];

    useEffect(() => {document.getElementsByClassName("testResult")[0].textContent = registerPill(rest)}, [rest]);
    

  return (
    <div className="testResult">ManageChallengeAPITest</div>
  )
}

export default ManageChallengeAPITest