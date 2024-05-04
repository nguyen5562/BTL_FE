import axios from "axios";
import { serverConfig } from "../const/serverConfig"

const getAllProduct = async () => {
    const res = await axios.get(`${serverConfig.server}/api/product/get-all-product`)
    return res.data
}

const createProduct = async (data) => {
    const res = await axios.post(`${serverConfig.server}/api/product/create-product`, data)
    return res.data
}

export const productService = {
    getAllProduct,
    createProduct
}