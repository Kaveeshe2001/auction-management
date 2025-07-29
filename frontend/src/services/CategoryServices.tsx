import axios from "axios"
import type { CategoryGet } from "../models/Category"
import { handleError } from "../handlers/ErrorHandler";

const api = 'http://localhost:5018/auction_backend/category';

export const getCategoriesApi = async () => {
    try {
        const data = await axios.get<CategoryGet>(api);
        return data;
    } catch (error) {
        handleError(error);
    }
};