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

const getUser = async (id, access_token) => {
    const res = await axios.get(`${serverConfig.server}/api/user/get-user/${id}`, {
        headers: {
            token: `Bearer ${access_token}`
        }
    })
    return res.data
}

export const userService = {
    loginUser,
    createUser,
    getUser
}