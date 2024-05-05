import axios from "axios";
import { serverConfig } from "../const/serverConfig"

const getAllCategory = async () => {
    const res = await axios.get(`${serverConfig.server}/api/category/get-all-category`)
    return res.data
}

const getCategory = async (id) => {
    const res = await axios.get(`${serverConfig.server}/api/category/get-category/${id}`)
    return res.data
}

const createCategory = async (data) => {
    const res = await axios.post(`${serverConfig.server}/api/category/create-category`, data)
    return res.data
}

const updateCategory = async (id, data) => {
    const res = await axios.put(`${serverConfig.server}/api/category/update-category/${id}`, data)
    return res.data
}

const deleteCategory = async (id) => {
    const res = await axios.delete(`${serverConfig.server}/api/category/delete-category/${id}`)
    return res.data
}

export const categoryService = {
    getAllCategory,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}