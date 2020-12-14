import { all, call, put, takeLatest, select } from 'redux-saga/effects'
import { fallbackMessage } from '../../redux/constants/constants'
import { API_BASE_URL } from '../constants/config'
import {
    SIGNIN_USER,
    SIGNOUT_USER,
} from '../constants/ActionTypes'
import {
    signinUserSuccess,
    signinUserFailed,
    setAuthLoader,
    signoutUserSuccess,
    signoutUserFailed,
} from '../actions/Auth'
import * as selector from '../constants/selectors'
import { axiosPost } from '../constants/apicall' //pass url to get,and (url,object) to post ,patch

function* signInUserWithEmailPassword({ payload }) {
    try {
        yield put(setAuthLoader({ isFailed: false, message: '', loader: true }))
        const url = `${API_BASE_URL}login`
        const resp = yield call(axiosPost, url, payload)
        if (resp.status === 200) {
            const signInUser = resp.data
            yield put(signinUserSuccess(signInUser))
        } else {
            yield put(
                signinUserFailed({
                    isFailed: true,
                    message: resp.data.error.message || fallbackMessage,
                    loader: false,
                })
            )
        }
    } catch (error) {
        yield put(
            signinUserFailed({
                isFailed: true,
                message: error.message || fallbackMessage,
                loader: false,
            })
        )
    }
}

function* signoutUser() {
    try {
        yield put(setAuthLoader({ isFailed: false, message: '', loader: true }))
        const url = `${API_BASE_URL}logout`
        const resp = yield call(
            axiosPost,
            url,
            {},
            yield select(selector.token)
        )

        if (resp.status !== 200) {
            yield put(
                signoutUserFailed({
                    message: resp.data.error.message || fallbackMessage,
                })
            )
        } else {
            yield put(
                signoutUserSuccess({
                    message: resp.data.message || `Logged out successfully.`,
                })
            )
        }
    } catch (error) {
        yield put(
            signoutUserFailed({ message: error.message || fallbackMessage })
        )
    }
}

export default all([
    takeLatest(SIGNIN_USER, signInUserWithEmailPassword),
    takeLatest(SIGNOUT_USER, signoutUser)
])
