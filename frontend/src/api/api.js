import axios from "axios";
import { BASE_URL } from "../constants"

const fetchPhotos = async () => {
    const response = await axios.get(`${BASE_URL}/api/photos`);
    return response.data
}

const postPhoto = async (file) => {
    const formData = new FormData();
    formData.append('file', file.image);

    const response = await axios.post(`${BASE_URL}/api/photos`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })

    return response.data
}

export {
    fetchPhotos,
    postPhoto,
}