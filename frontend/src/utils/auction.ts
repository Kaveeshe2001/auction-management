import type { Dispatch, SetStateAction } from "react";
import type { Art } from "../models/Art";
import { auctionGetApi } from "../services/AuctionServices";

interface AuctionWithArt {
  id: number;
  status: string;
  art: Art;
  startDate: string;
  endDate: string;
}

export const getAllAuctions = async (
    setAuctions: Dispatch<SetStateAction<AuctionWithArt[] | null | undefined>>
) => {
    try {
        const res = await auctionGetApi();
    } catch (error) {
        
    }
}