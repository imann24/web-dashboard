import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchWeather, getIconUrl } from '../api/open-weather/open-weather'
import type { Coords } from '../lib/location'
import { AppState } from '../store'
import { RequestStatus } from '../lib/types'

export interface WeatherState {
    temp: number,
    condition: string,
    iconUrl: string,
    status: RequestStatus
}

const initialState: WeatherState = {
    temp: 0,
    condition: '',
    iconUrl: '',
    status: 'loading',
}

export const fetchWeatherAsync = createAsyncThunk(
    'weather/fetchWeather',
    async (coords: Coords) => {
        const weather = await fetchWeather(coords.lat, coords.lon)
        return weather
    }
)

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchWeatherAsync.pending, state => {
            state.status = 'loading'
        })
        .addCase(fetchWeatherAsync.fulfilled, (state, action) => {
            state.status = 'idle'
            state.temp = action.payload.temperature
            state.condition = action.payload.condition
            state.iconUrl = getIconUrl(action.payload.icon)
        })
        .addCase(fetchWeatherAsync.rejected, state => {
            state.status = 'failed'
        })
    }
})

export const selectWeather = (state: AppState) =>  state.weather

export default weatherSlice.reducer
