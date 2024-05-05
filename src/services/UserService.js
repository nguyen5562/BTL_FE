import axios from "axios";
import { serverConfig } from "../const/serverConfig"

const loginUser = async (data) => {
    const res = await axios.post(`${serverConfig.server}/api/user/sign-in`, data)
    return res.data
}

const createUser = async (data) => {
    const res = await axios.post(`${serverConfig.server}/api/user/sign-up`, data)
    return res.data
}

const getAllUser = async () => {
    const res = await axios.get(`${serverConfig.server}/api/user/get-all`)
    return res.data
}

const getUser = async (id) => {
    const res = await axios.get(`${serverConfig.server}/api/user/get-user/${id}`)
    return res.data
}

const refreshToken = async (refreshToken) => {
    const res = await axios.post(`${serverConfig.server}/api/user/refresh-token`, {
        headers: {
            token: `Bearer ${refreshToken}`,
        }
    })
    return res.data
}

const updateUser = async (id, data, accessToken) => {
    const res = await axios.put(`${serverConfig.server}/api/user/update-user/${id}`, data, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    })
    return res.data
}

const deleteUser = async (id, accessToken) => {
    const res = await axios.delete(`${serverConfig.server}/api/user/delete-user/${id}`, {
        headers: {
            token: `Bearer ${accessToken}`,
        }
    })
    return res.data
}

export const userService = {
    loginUser,
    getAllUser,
    createUser,
    getUser,
    refreshToken,
    updateUser,
    deleteUser
}