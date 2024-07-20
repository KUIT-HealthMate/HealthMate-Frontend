import React, { useEffect, useState } from 'react';
import styles from './Survey.module.scss'

import GreenButton from '../../../components/organs/GreenButton';

interface Props {
    questions: string[],
    candidates: string[]
}

const Survey = ({ questions, candidates }: Props) => {

    return (
        <div className={styles.survey}>
            <div className={styles.question}>
                {
                    questions.map((question, idx) => {
                        return (<div className={styles.questionText}>{question}</div>)
                    })
                }
            </div>

            <div className={styles.candidate}>
                {
                    candidates.map((candidate, idx) => {
                        return (<div className={styles.candidateBox}><div className={styles.candidateText}>{candidate}</div></div>)
                    })
                }
            </div>

            {/* <GreenButton text={"다음으로"} ></GreenButton> */}


        </div>
    )
};

export default Survey;