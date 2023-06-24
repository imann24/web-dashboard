import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import counterReducer from './features/counter/counterSlice'
import weatherReducer from './store/weatherSlice'
import backgroundReducer from './store/backgroundSlice'
import goalsReducer from './store/goalsSlice'

export function makeStore() {
  return configureStore({
    reducer: { 
      background: backgroundReducer,
      counter: counterReducer,
      goals: goalsReducer,
      weather: weatherReducer,
    },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
