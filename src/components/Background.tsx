import type { FunctionComponent } from 'react'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons"
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchImagesAsync, selectBackgroundImages, selectBackgroundStatus } from '../store/backgroundSlice'
import styles from './Background.module.css'

const Background: FunctionComponent = ({}) => {
    const [imageIndex, setImageIndex] = useState(0)
    const dispatch = useAppDispatch()
    const status = useAppSelector(selectBackgroundStatus)
    const images = useAppSelector(selectBackgroundImages)

    const updateImage = (change: number) => {
        setImageIndex((imageIndex + change) % images.length)
    }

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
            backgroundImage: `url(${images[imageIndex]})`
        }}>
            <FontAwesomeIcon
                className={styles.arrowIcon}
                icon={faLeftLong}
                onClick={() => updateImage(-1)}
                size="2xl"
            />
            <FontAwesomeIcon 
                className={styles.arrowIcon}
                icon={faRightLong}
                onClick={() => updateImage(1)}
                size="2xl"
            />
        </div>
    )
}

export default Background
