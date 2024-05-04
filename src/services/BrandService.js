import axios from "axios";
import { serverConfig } from "../const/serverConfig"

const getAllBrand = async () => {
    const res = await axios.get(`${serverConfig.server}/api/brand/get-all-brand`)
    return res.data
}

const createBrand = async (data) => {
    const res = await axios.post(`${serverConfig.server}/api/brand/create-brand`, data)
    return res.data
}

export const brandService = {
    getAllBrand,
    createBrand
}