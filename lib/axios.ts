import axios from 'axios'
import { cookies } from 'next/headers'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const cookieStore = cookies()
const timeout = publicRuntimeConfig?.TIMEOUT || 30000
const token = cookieStore.get(`${publicRuntimeConfig.ACCESS_TOKEN_NAME ?? ''}`)

// export const defaultAppAxiosConfigs = {
//     timeout: Number.parseInt(`${timeout}`),
//     headers: {
//         Authorization: `Bearer ${token}`,
//     },
// }
export let defaultAppAxiosConfigs: any = null
if (token) {
    defaultAppAxiosConfigs = {
        timeout: Number.parseInt(`${timeout}`),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
} else {
    defaultAppAxiosConfigs = {
        timeout: Number.parseInt(`${timeout}`),
    }
}

export interface AppAxiosConfig {
    headers: any
}

/**
|--------------------------------------------------
| CUSTOM AXIOS
|--------------------------------------------------
*/
export const appAxios = (config?: AppAxiosConfig) => {
    const axiosInstance = config
        ? axios.create(config)
        : axios.create(defaultAppAxiosConfigs)

    axiosInstance.interceptors.request.use(
        (config) => {
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    axiosInstance.interceptors.response.use(
        (response) => {
            // console.log('response api', response)
            return response
        },
        (error) => {
            // console.log('error api error', error)
            return Promise.reject(error)
        }
    )

    return axiosInstance
}

/**
|--------------------------------------------------
| AXIOS with multipart/form-data
|--------------------------------------------------
*/
export const appAxiosMulipart = () => {
    return appAxios({
        ...defaultAppAxiosConfigs,
        headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'multipart/form-data',
        },
    })
}
