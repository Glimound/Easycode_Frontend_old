import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://example.com',
    headers: {
        'Content-Type': 'application/json',
        'Behaviour-Type': '',
        'User-ID': '',
        'User-Name': ''
    }
})

export const saveLayout = (layoutJSON) => {
    axiosInstance.defaults.headers['behaviour-type'] = 'saveLayout'
    return axiosInstance.post('/xxx', layoutJSON)
}

export const releaseApplication = (layoutJSON) => {
    axiosInstance.defaults.headers['behaviour-type'] = 'releaseApplication'
    return axiosInstance.post('/xxx', layoutJSON)
}

export const getLayout = () => {
    axiosInstance.defaults.headers['behaviour-type'] = 'getLayout'
    return axiosInstance.get('/xxx')
}