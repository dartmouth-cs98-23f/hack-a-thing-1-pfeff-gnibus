import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { IClass } from '../types'

interface ClassesState {
  classesList: IClass[];
  status: string;
}

const initialState: ClassesState = {
  classesList: [],
  status: 'init'
}

export const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    addClass: (state, action: PayloadAction<IClass>) => {
      if (state.classesList.some((cls) => cls.classTitle === action.payload.classTitle)) {
        return { ...state, status: 'error' }
      }

      if (state.classesList.some((course) => course.periodCode === action.payload.periodCode)) {
        return { ...state, status: 'overlap' }
      }
      const newClasses = [...state.classesList, action.payload]
      return {
        classesList: newClasses,
        status: 'success',
      }
    },
    removeClass: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        classesList: state.classesList.filter((course) => course.id !== action.payload),
        status: 'remove-success'
      }
    },
    resetStatus: (state, action: PayloadAction<void>) => {
      return {
        ...state,
        status: 'chillin'
      }
    }
  },
})

export const { addClass, removeClass, resetStatus } = classesSlice.actions
export const selectCount = (state: RootState) => state
export default classesSlice.reducer