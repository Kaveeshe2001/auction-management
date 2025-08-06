import axios from "axios"
import type { CategoryPost, CategoryGet } from "../models/Category";
import { handleError } from "../handlers/ErrorHandler";

const api = 'http://localhost:5018/auction_backend/category';

export const categoryPostApi = async (
    categoryName: string,
    image: string,
    icon: string,
) => {
    try {
        const token = localStorage.getItem('token');

        const data = await axios.post<CategoryPost>(
            api,
            {
                categoryName: categoryName,
                image: image,
                icon: icon,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const getCategoriesApi = async () => {
    try {
        const data = await axios.get<CategoryGet>(api);
        return data;
    } catch (error) {
        handleError(error);
    }
};