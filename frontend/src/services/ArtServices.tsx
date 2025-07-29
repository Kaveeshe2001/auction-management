import axios from "axios";
import type { Art, ArtGet, ArtPost } from "../models/Art";
import { handleError } from "../handlers/ErrorHandler";

const api = 'http://localhost:5018/auction_backend/art';

export const artPostAPI = async (
  title: string,
  image: string,
  currentMarketPrice: number,
  condition: string,
  isFramed: boolean,
  height: number,
  width: number,
  categoryId: number
) => {
    try {
        const token = localStorage.getItem('token');

        const data = await axios.post<ArtPost>(
            api,
            {
               title: title,
               image: image,
               currentMarketPrice: currentMarketPrice,
               condition: condition,
               isFramed: isFramed,
               height: height,
               width: width,
               categoryId: categoryId, 
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

export const artGetAPI = async () => {
    try {
        const data = await axios.get<ArtGet>(api);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const artGetByStoreApi = async (
    storeId: number,
    query: { pageNumber: number; pageSize: number;}
) => {
    try {
        const { pageNumber, pageSize } = query;
        const data = await axios.get<ArtGet>(`${api}/store/${storeId}`, {
            params: {
                pageNumber,
                pageSize,
            },
        });
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const artGetByIdApi = async (id: number) => {
    try {
        const data = await axios.get<Art>(`${api}/${id}`);
        return data;
    } catch (error) {
        handleError(error);
    }
};