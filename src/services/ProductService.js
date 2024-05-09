import axios from "axios";
import { serverConfig } from "../const/serverConfig"

const getAllProduct = async (filterName, ) => {
    let url = `${serverConfig.server}/api/product/get-all`;

    if (filterName && typeof filterName !== 'object') {
        url += `?filterName=${filterName}`;
    }

    const res = await axios.get(url)
    return res.data
}

const getProduct = async (id) => {
    const res = await axios.get(`${serverConfig.server}/api/product/get-product/${id}`)
    return res.data
}

const createProduct = async (data) => {
    const res = await axios.post(`${serverConfig.server}/api/product/create-product`, data)
    return res.data
}

const updateProduct = async (id, data) => {
    const res = await axios.put(`${serverConfig.server}/api/product/update-product/${id}`, data)
    return res.data
}

const deleteProduct = async (id) => {
    const res = await axios.delete(`${serverConfig.server}/api/product/delete-product/${id}`)
    return res.data
}

export const productService = {
    getAllProduct,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}