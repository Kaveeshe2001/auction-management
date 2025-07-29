import type { Dispatch, SetStateAction } from "react";
import type { Art } from "../models/Art";
import { artGetByStoreApi } from "../services/ArtServices";

export const getArtsByStore = async (
    storeId: number,
    page: number = 1,
    size: number = 10,
    setArts: Dispatch<SetStateAction<Art[] | null | undefined>>,
    setTotalPages?: Dispatch<SetStateAction<number>>
) => {
    try {
        const res = await artGetByStoreApi(storeId, {
            pageNumber: page,
            pageSize: size,
        });

        if (res?.data) {
            const artsArray = Array.isArray(res.data.arts)
              ? res.data.arts
              : [res.data.arts];
            setArts(artsArray);
            if (setTotalPages) {
                setTotalPages(Math.ceil(res?.data.totalCount / size));
            }
        } else {
            setArts(null);
        }
    } catch (error) {
       console.error(error);
       setArts(null); 
    }
};