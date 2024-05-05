import axios from "axios";
import { serverConfig } from "../const/serverConfig"

const getAllBrand = async () => {
    const res = await axios.get(`${serverConfig.server}/api/brand/get-all-brand`)
    return res.data
}

const getBrand = async (id) => {
    const res = await axios.get(`${serverConfig.server}/api/brand/get-brand/${id}`)
    return res.data
}

const createBrand = async (data) => {
    const res = await axios.post(`${serverConfig.server}/api/brand/create-brand`, data)
    return res.data
}

const updateBrand = async (id, data) => {
    const res = await axios.put(`${serverConfig.server}/api/brand/update-brand/${id}`, data)
    return res.data
}

const deleteBrand = async (id) => {
    const res = await axios.delete(`${serverConfig.server}/api/brand/delete-brand/${id}`)
    return res.data
}

const deleteBrands = async (data) => {
    data.forEach((id) => {
        brandService.deleteBrand(id)
    });
}

export const brandService = {
    getAllBrand,
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand,
    deleteBrands
}