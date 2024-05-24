import axios from "axios";
import { serverConfig } from "../const/serverConfig"

const uploadImage = async (file) => {
    const res = await axios.post(`${serverConfig.server}/upload`, file)
    return res.data
}

export const imageService = {
    uploadImage
}