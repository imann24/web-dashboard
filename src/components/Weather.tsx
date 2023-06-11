import type { FunctionComponent } from 'react'
import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'
import { requestLocation } from '../lib/location'
import { fetchWeatherAsync, selectWeather } from '../store/weatherSlice'
import styles from './Weather.module.css'

const Weather: FunctionComponent = ({}) => {
    const dispatch = useAppDispatch()
    const weather = useAppSelector(selectWeather)
    const [coordinates, setCoordinates] = useState<GeolocationCoordinates>()

    useEffect(() => {
        requestLocation((position: GeolocationPosition) => {
            setCoordinates(position.coords)
        })
    }, [])

    useEffect(() => {
        if (!coordinates) {
            return
        }
        const { latitude, longitude } = coordinates
        dispatch(fetchWeatherAsync({
            lat: latitude,
            lon: longitude
        }))
    }, [coordinates])
    if (weather.status === 'loading') {
        return <p className={styles.container}>loading weather...</p>
    }
    if (weather.status === 'failed') {
        return <p className={styles.container}>failed to get weather.</p>
    }

    return (
        <div className={styles.container}>
            <img src={weather.iconUrl} />
            <p className={styles.text}>{weather.temp}° | {weather.condition}</p>
        </div>
    )
}

export default Weather
