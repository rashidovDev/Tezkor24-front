import {createSlice} from '@reduxjs/toolkit';

const initialState = {
     loader : false, 
     reload : false
}

const loaderSlice = createSlice({
    name : 'loader',
    initialState,
    reducers : {
        showLoader : function(state, action){
            state.loader = true
        },
        hideLoader : function(state){
            state.loader = false;
        },
        showReload : function(state){
            state.reload = true
        },
        hideReload : function(state){
            state.reload = false
        }
    }
})

export const {showLoader, hideLoader, showReload, hideReload} = loaderSlice.actions;
export default loaderSlice.reducer;