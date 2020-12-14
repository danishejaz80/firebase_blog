import axios from 'axios'
export const patch = async (url, obj) => {
    return await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(obj),
        headers: {
            'Content-type': 'application/json',
        },
    })
        .then((reponse) => reponse.json())
        .catch((e) => {
            const error =
                e.message === 'Failed to fetch'
                    ? { error: new Error(e.message) }
                    : e
            return error
        })
}
export const post = async (url, obj) => {
    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-type': 'application/json',
        },
    })
        .then((reponse) => reponse.json())
        .catch((e) => {
            const error =
                e.message === 'Failed to fetch'
                    ? { error: new Error(e.message) }
                    : e
            return error
        })
}
export const post_with_token = async (url, obj, token) => {
    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-type': 'application/json',
            Authorization: `${token}`,
        },
    })
        .then((reponse) => reponse.json())
        .catch((e) => {
            const error =
                e.message === 'Failed to fetch'
                    ? { error: new Error(e.message) }
                    : e
            return error
        })
}
export const get_with_token = async (url, token) => {
    return await fetch(url, {
        method: 'get',
        headers: {
            'Content-type': 'application/json',
            Authorization: `${token}`,
        },
    })
        .then((reponse) => reponse.json())
        .catch((e) => {
            const error =
                e.message === 'Failed to fetch'
                    ? { error: new Error(e.message) }
                    : e
            return error
        })
}
export const get = async (url) => {
    return await fetch(url, {
        method: 'get',
        headers: {
            'Content-type': 'application/json',
        },
    })
        .then((reponse) => reponse.json())
        .catch((e) => {
            const error =
                e.message === 'Failed to fetch'
                    ? { error: new Error(e.message) }
                    : e
            return error
        })
}

export const axiosPost = (url, obj, token = null, headers = null) => {
    if (!headers) headers = {}
    if (!headers['Content-Type'] && !headers['content-type'])
        headers['Content-Type'] = 'application/json'
    if (token) headers['Authorization'] = token
    return axios
        .post(url, obj, {
            headers,
        })
        .then((res) => {
            return res
        })
        .catch((error) => {
            let code = null
            let data = null
            let headers = null
            if (error.response) {
                code = error.response.status
                data = error.response.data
                headers = error.response.headers
            } else if (error.request) {
                code = 500
                data = {
                    message: `Unexpected error occurred.`,
                }
            } else {
                code = 500
                data = {
                    message: error.message || `Unexpected error occurred.`,
                }
            }

            return {
                status: code,
                data,
                headers,
            }
        })
}

export const axiosPut = (url, obj, token, headers = null) => {
    if (!headers) headers = {}
    if (!headers['Content-Type'] && !headers['content-type'])
        headers['Content-Type'] = 'application/json'
    if (token) headers['Authorization'] = token
    return axios
        .put(url, obj, {
            headers,
        })
        .then((res) => {
            return res
        })
        .catch((error) => {
            let code = null
            let data = null
            let headers = null
            if (error.response) {
                code = error.response.status
                data = error.response.data
                headers = error.response.headers
            } else if (error.request) {
                code = 500
                data = {
                    message: `Unexpected error occurred.`,
                }
            } else {
                code = 500
                data = {
                    message: error.message || `Unexpected error occurred.`,
                }
            }

            return {
                status: code,
                data,
                headers,
            }
        })
}

export const axiosDelete = (url, token) => {
    return axios
        .delete(url, {
            headers: {
                Authorization: `${token}`,
            },
        })
        .then((res) => {
            return res
        })
        .catch((error) => {
            let code = null
            let data = null
            let headers = null
            if (error.response) {
                code = error.response.status
                data = error.response.data
                headers = error.response.headers
            } else if (error.request) {
                code = 500
                data = {
                    message: `Unexpected error occurred.`,
                }
            } else {
                code = 500
                data = {
                    message: error.message || `Unexpected error occurred.`,
                }
            }

            return {
                status: code,
                data,
                headers,
            }
        })
}

export const axiosGet = (url, token = null) => {
    let headers = {}
    if (token) headers['Authorization'] = token

    return axios
        .get(url, {
            headers,
        })
        .then((res) => {
            return res
        })
        .catch((error) => {
            let code = null
            let data = null
            let headers = null
            if (error.response) {
                code = error.response.status
                data = error.response.data
                headers = error.response.headers
            } else if (error.request) {
                code = 500
                data = {
                    message: `Unexpected error occurred.`,
                }
            } else {
                code = 500
                data = {
                    message: error.message || `Unexpected error occurred.`,
                }
            }

            return {
                status: code,
                data,
                headers,
            }
        })
}
