import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id : null
}

const idSlice = createSlice({
    name : 'id',
    initialState,
    reducers : {
        getId : function(state,payload){
            state.id = payload
        },
        removeId : function(state){
            state.id = null
        }
    }
})

export const {getId, removeId} = idSlice.actions
export default idSlice.reducer