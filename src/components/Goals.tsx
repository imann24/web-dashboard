import React, { useState, ChangeEvent, KeyboardEvent } from 'react'
import type { FunctionComponent } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { useAppSelector, useAppDispatch } from '../hooks'
import { add, remove, selectGoals } from '../store/goalsSlice'
import styles from './Goals.module.css'

const Goals: FunctionComponent = ({}) => {
    const dispatch = useAppDispatch()
    const goals = useAppSelector(selectGoals)
    const [goalInput, setGoalInput] = useState('')

    const addGoal = (evt: KeyboardEvent<HTMLInputElement>) => {
        if (evt.key === 'Enter') {
            dispatch(add(goalInput))
            setGoalInput('')
        }
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.prompt}>What is your goal?</h2>
            <input
                value={goalInput}
                className={styles.input} 
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    setGoalInput(evt.target.value)  
                }}
                onKeyDown={addGoal}
            >
            </input>
            <div className={styles.goals}>
                {goals.map((goal, idx) =>
                    <div className={styles.singleGoal}>
                        <input type="checkbox" key={idx} />
                        <label>{goal}</label>
                        <FontAwesomeIcon
                            className={styles.deleteGoal}
                            icon={faTrash}
                            onClick={() => dispatch(remove(goal))}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Goals
