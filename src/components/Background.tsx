import type { FunctionComponent } from 'react'
import styles from './Background.module.css'

const Background: FunctionComponent = ({}) => {
    return (
        <div className={styles.bg} style={{
            // TODO:
            // backgroundImage={SET_ME}
        }} />
    )
}

export default Background
