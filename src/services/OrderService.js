import axios from "axios";
import { serverConfig } from "../const/serverConfig"

const createOrder = async (data) => {
    const res = await axios.post(`${serverConfig.server}/api/order/create-order`, data)
    return res.data
}

const getOrder = async (id) => {
    const res = await axios.get(`${serverConfig.server}/api/order/get-order/${id}`)
    return res.data
}

const getAllOrder = async () => {
    const res = await axios.get(`${serverConfig.server}/api/order/get-all`)
    return res.data
}

const getAllOrderByUser = async (userId) => {
    const res = await axios.get(`${serverConfig.server}/api/order/get-order-user/${userId}`)
    return res.data
}

const updateOrder = async (id) => {
    const res = await axios.put(`${serverConfig.server}/api/order/update-order/${id}`)
    return res.data
}

const cancelOrder = async (id) => {
    const res = await axios.put(`${serverConfig.server}/api/order/cancel-order/${id}`)
    return res.data
}

const deleteOrder = async (id) => {
    const res = await axios.delete(`${serverConfig.server}/api/order/delete-order/${id}`)
    return res.data
}

export const orderService = {
    createOrder,
    getAllOrder,
    getOrder,
    getAllOrderByUser,
    updateOrder,
    deleteOrder,
    cancelOrder
}