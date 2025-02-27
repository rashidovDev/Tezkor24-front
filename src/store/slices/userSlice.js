import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user : {}, //User data
    isAuth : false,
    profile : false
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        setUser: function(state, action){
            state.user = action.payload;
            state.isAuth = true;
        },
        logoutAdminUser : function(state){
            state.user = null;
            state.auth = false
            localStorage.removeItem("admin_access_token")
            localStorage.removeItem("admin_user")
            localStorage.removeItem("admin_tokenTime")
        },
        logoutUser : function(state){
            state.user = null;
            state.auth = false;
            localStorage.removeItem("access_token")
            localStorage.removeItem("user")
            localStorage.removeItem("user_tokenTime")
        },
        showProfile : function(state){
            state.profile = !state.profile
        },
        hideProfile : function(state){
            state.profile = false
        }
    }
})

export const {setUser, logoutAdminUser, logoutUser, showProfile, hideProfile} = userSlice.actions;
export default userSlice.reducer;