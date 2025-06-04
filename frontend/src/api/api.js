import axios from "axios";
import { BASE_URL } from "../constants"
import { getToken } from "../utils";

const fetchPhotos = async () => {
    let token = getToken();

    const response = await axios.get(`${BASE_URL}/api/photos`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response.data.data;
}

const postPhoto = async (file) => {
    const formData = new FormData();
    formData.append('file', file.image);

    let token = getToken();

    const response = await axios.post(`${BASE_URL}/api/photos`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${token}`
        }
    })

    return response.data
}

export {
    fetchPhotos,
    postPhoto,
}