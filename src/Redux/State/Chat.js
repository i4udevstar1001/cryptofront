import { createSlice } from '@reduxjs/toolkit'

const initialState = [{type: 'RECEIVE', from: 'Jack', message: 'Hi whats Up with the Game here!'}]

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addMessage(state, action) {
            state.push(action.payload)
        }
    },
})

export const { addMessage } = counterSlice.actions
export default counterSlice.reducer
