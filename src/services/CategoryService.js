import axios from "axios";
import { serverConfig } from "../const/serverConfig"

const getAllCategory = async () => {
    const res = await axios.get(`${serverConfig.server}/api/category/get-all-category`)
    return res.data
}

const createCategory = async (data) => {
    const res = await axios.post(`${serverConfig.server}/api/category/create-category`, data)
    return res.data
}

export const categoryService = {
    getAllCategory,
    createCategory
}