import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '../store'

export interface GoalsState {
    goals: string[]
}

const initialState: GoalsState = {
    goals: []
}

export const goalsSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<string>) => {
            state.goals.push(action.payload)
        },
        remove: (state, action: PayloadAction<string>) => {
            state.goals = state.goals.filter(g => g !== action.payload)
        },
    },
})

export const { add, remove } = goalsSlice.actions

export const selectGoals = (state: AppState) => state.goals.goals

export default goalsSlice.reducer
