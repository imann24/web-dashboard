import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AppState } from '../store'
import { RequestStatus } from '../lib/types'

export interface BackgroundState {
    images: string[],
    status: RequestStatus,
}

interface UnsplashResult {
    links: {
        download: string,
    },
}

const initialState: BackgroundState = {
    images: [],
    status: 'loading',
}

export const fetchImagesAsync = createAsyncThunk(
    'background/fetchImages',
    async () => {
        const res = await fetch('/api/unsplash')
        return await res.json()
    }
)

export const backgroundSlice = createSlice({
    name: 'background',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchImagesAsync.pending, state => {
            state.status = 'loading'
        })
        .addCase(fetchImagesAsync.fulfilled, (state, action) => {
            state.status = 'idle'
            state.images = action.payload.results.map((res: UnsplashResult) => (
                res.links.download
            ))
        })
        .addCase(fetchImagesAsync.rejected, state => {
            state.status = 'failed'
        })
    }
})

export const selectBackgroundStatus = (state: AppState) => state.background.status
export const selectBackgroundImages = (state: AppState) => state.background.images

export default backgroundSlice.reducer
