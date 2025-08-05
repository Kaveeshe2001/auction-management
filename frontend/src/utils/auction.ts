import type { Dispatch, SetStateAction } from "react";
import type { Art } from "../models/Art";
import { auctionGetApi, auctionGetByIdApi, auctionGetByUserApi, auctionGetLatestApi } from "../services/AuctionServices";
import { artGetByIdApi } from "../services/ArtServices";

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

        if(res?.data) {
            const auctionArray = Array.isArray(res.data) ? res.data : [res.data];

            const artsData = await Promise.all(
                auctionArray.map(async (auction) => {
                    try {
                        const artRes = await artGetByIdApi(auction.artId);
                        return { ...auction, art: artRes?.data || null };
                    } catch (error) {
                        console.error('Error fetching art data: ', error);
                        return { ...auction, art: null };
                    }
                })
            );

            const validAuctions = artsData.filter(
                (item): item is AuctionWithArt & { art: Art } => item.art !== null
            );

            setAuctions(validAuctions);
        }
    } catch (error) {
        console.error(error);
        setAuctions(null);
    }
};

export const getAuctionsByUser = async (
    userId: string,
    setAuctions: Dispatch<SetStateAction<AuctionWithArt[] | null | undefined>>,
    status?: string
) => {
    try {
        const res = await auctionGetByUserApi(userId, status);

        if (res?.data) {
            const auctionArray = Array.isArray(res.data) ? res.data : [res.data];

            const artsData = await Promise.all(
                auctionArray.map(async (auction) => {
                    try {
                       const artRes = await artGetByIdApi(auction.artId);
                       return { ...auction, art: artRes?.data || null }; 
                    } catch (error) {
                       console.error('Error fetching art data:', error);
                       return { ...auction, art: null };
                    }
                })
            );

            const validAuctions = artsData.filter(
              (item): item is AuctionWithArt & { art: Art } => item.art !== null
            );

            setAuctions(validAuctions);
        } else {
            setAuctions(null);
        }
    } catch (error) {
        console.error(error);
        setAuctions(null);
    }
};

export const getAuctionsById = async (
    id: number,
    setAuction: Dispatch<SetStateAction<AuctionWithArt[] | null | undefined>>
) => {
    try {
        const res = await auctionGetByIdApi(id);

        if (res?.data) {
            const auctionArray = Array.isArray(res.data) ? res.data : [res.data];

            const artsData = await Promise.all(
               auctionArray.map(async (auction) => {
                try {
                    const artRes = await artGetByIdApi(auction.artId);
                    return { ...auction, art: artRes?.data || null };
                } catch (error) {
                    console.error('Error fetching art data:', error);
                    return { ...auction, art: null };
                }
               })
            );

            const validAuctions = artsData.filter(
              (item): item is AuctionWithArt & { art: Art } => item.art !== null
            );

            setAuction(validAuctions);
        } else {
            setAuction(null);
        }
    } catch (error) {
        console.error(error);
        setAuction(null);
    }
};

export const getLatestAuction = async (
  limit: number | null,
  setAuctions: Dispatch<SetStateAction<AuctionWithArt[] | null | undefined>>
) => {
    try {
        const res = await auctionGetLatestApi(limit);

        if (res?.data) {
            const auctionArray = Array.isArray(res.data) ? res.data : [res.data];

            const artsData = await Promise.all(
                auctionArray.map(async (auction) => {
                    try {
                        const artRes = await artGetByIdApi(auction.artId);
                        return { ...auction, art: artRes?.data || null };
                    } catch (error) {
                        console.error('Error fetching art data:', error);
                        return { ...auction, art: null };
                    }
                })
            );

            const validAuctions = artsData.filter(
              (item): item is AuctionWithArt & { art: Art } => item.art !== null
            );

            setAuctions(validAuctions);
        }
    } catch (error) {
        console.log(error);
        setAuctions(null);
    }
};