import { STORAGE_NAME } from "../constants"

export const getToken = () => {
    return JSON.parse(localStorage.getItem(STORAGE_NAME)).token;
}