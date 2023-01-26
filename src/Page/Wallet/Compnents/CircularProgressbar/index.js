import React from 'react'
import 'react-circular-progressbar/dist/styles.css';
import variables from '../../../../variables'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import styles from './styles.module.sass'

const percentage = 66;

const CircularProgressbarObj = () => {
    return (
        <div className={styles.container}>
            <CircularProgressbar
                value={percentage}
                text={`+${percentage}%`}
                strokeWidth={12}
                background={true}
                styles={buildStyles({
                    backgroundColor: variables.colors.bgLight,
                    textColor: 'white',
                    pathColor: variables.colors.base,
                    trailColor: variables.colors.bgDark
                })}
            />
        </div>
    )
}

export default CircularProgressbarObj;