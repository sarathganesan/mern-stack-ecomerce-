import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        users : [],
        loading: false,
        isUserDeleted: false,
        isUserUpdated: false
    },
    reducers: {
        usersRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        usersSuccess(state, action) {
            return {
                ...state,
                loading: false,
                users: action.payload.users
            }
        },
        usersFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        userRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        userSuccess(state, action) {
            return {
                ...state,
                loading: false,
                user: action.payload.user
            }
        },
        userFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        updateUserRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        updateUserSuccess(state, action){
            return {
                ...state,
                loading: false,
                isUserUpdated: true,
            }
        },
        updateUserFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        deleteUserRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        deleteUserSuccess(state, action){
            return {
                ...state,
                loading: false,
                isUserDeleted: true,
            }
        },
        deleteUserFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        clearUser(state, action) {
            return{ ...state,
                user : {}
            }
        },
        clearUserUpdated(state, action) {
            return{ 
                ...state,
                isUserUpdated: false
            }
        },
        clearUserDeleted(state, action) {
            return{ 
                ...state,
                isUserDeleted: false
            }
        },
        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        },
    }
});

const { actions, reducer } = userSlice;

export const { 
    usersFail,
    usersSuccess,
    usersRequest,
    userFail,
    userSuccess,
    userRequest,
    updateUserFail,
    updateUserRequest,
    updateUserSuccess,
    clearUserUpdated,
    deleteUserFail,
    deleteUserRequest,
    deleteUserSuccess,
    clearUserDeleted,
    clearUser,
    clearError
 } = actions;

export default reducer;
