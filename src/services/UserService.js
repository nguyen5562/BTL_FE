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

export const userService = {
    loginUser,
    createUser
}