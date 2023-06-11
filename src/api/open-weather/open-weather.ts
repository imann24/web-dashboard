interface WeatherData {
    temperature: number
    condition: string
    icon: string
}

export const getIconUrl = (icon: string): string => {
    return `https://openweathermap.org/img/wn/${icon}.png`
}

export const fetchWeather = async (lat: number, lon: number): Promise<WeatherData> => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=imperial`)
    const json = await res.json()

    return {
        temperature: json.main.temp,
        condition: json.weather[0].main,
        icon: json.weather[0].icon,
    }
}
