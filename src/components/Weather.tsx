import type { FunctionComponent } from 'react'
import { useEffect, useState } from 'react'
import { requestLocation } from '../lib/location'
import { fetchWeather, getIconUrl } from '../api/open-weather/open-weather'

const Weather: FunctionComponent = ({}) => {
    const [coordinates, setCoordinates] = useState<GeolocationCoordinates>()
    const [temp, setTemp] = useState(0)
    const [condition, setCondition] = useState('loading...')
    const [iconUrl, setIconUrl] = useState('')

    useEffect(() => {
        requestLocation((position: GeolocationPosition) => {
            setCoordinates(position.coords)
        })
    }, [])

    useEffect(() => {
        // TODO: move API logic into Redux
        const setWeather = async () => {
            if (!coordinates) {
                return
            }
            const { latitude, longitude } = coordinates
            const weather = await fetchWeather(latitude, longitude)
            const {
                temperature,
                condition,
                icon,
            } = weather
            setTemp(temperature)
            setCondition(condition)
            setIconUrl(getIconUrl(icon))
        }

        setWeather()
    }, [coordinates])

    return (
        <>
            <p>{temp}° | {condition}</p>
            <img src={iconUrl} />
        </>
    )
}

export default Weather
