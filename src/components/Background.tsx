import type { FunctionComponent } from 'react'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchImagesAsync, selectBackgroundImages, selectBackgroundStatus } from '../store/backgroundSlice'
import styles from './Background.module.css'

const Background: FunctionComponent = ({}) => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(selectBackgroundStatus)
    const images = useAppSelector(selectBackgroundImages)

    useEffect(() => {
        dispatch(fetchImagesAsync())
    }, [])

    if (status === 'loading' ||
        status === 'failed' ||
        images.length === 0 || !images[0]) {
        return <div className={styles.bg} />
    }

    return (
        <div className={styles.bg} style={{
            backgroundImage: `url(${images[0]})`
        }} />
    )
}

export default Background
