import type { Dispatch, SetStateAction } from "react";
import type { CategoryGet } from "../models/Category";
import { getCategoriesApi } from "../services/CategoryServices";

export const getCategories = async (
    setCategories: Dispatch<SetStateAction<CategoryGet[] | null | undefined>>
) => {
    try {
        const res = await getCategoriesApi();
        if (res?.data) {
            const categoriesArray = Array.isArray(res.data) ? res.data : [res.data];
            setCategories(categoriesArray);
        } else {
            setCategories(null);
        }
    } catch (error) {
        console.error('Error fetching styles:', error);
        setCategories(null);
    }
};