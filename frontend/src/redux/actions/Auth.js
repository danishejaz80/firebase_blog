import {
    SIGNIN_USER,
    SIGNIN_USER_SUCCESS,
    SIGNIN_USER_FAILED,
    SET_AUTH_LOADER,
    SIGNOUT_USER,
    SIGNOUT_USER_SUCCESS,
    SIGNOUT_USER_FAILED
} from '../constants/ActionTypes'

export const signinUser = (payload) => {
    return {
        type: SIGNIN_USER,
        payload,
    }
}
export const signinUserSuccess = (payload) => {
    return {
        type: SIGNIN_USER_SUCCESS,
        payload,
    }
}
export const signinUserFailed = (payload) => {
    return {
        type: SIGNIN_USER_FAILED,
        payload,
    }
}
export const setAuthLoader = (payload) => {
    return {
        type: SET_AUTH_LOADER,
        payload,
    }
}
export const signoutUser = () => {
    return {
        type: SIGNOUT_USER,
    }
}

export const signoutUserSuccess = () => {
    return {
        type: SIGNOUT_USER_SUCCESS,
    }
}

export const signoutUserFailed = () => {
    return {
        type: SIGNOUT_USER_FAILED,
    }
}
