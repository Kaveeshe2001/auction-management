import axios from "axios";
import type { BidGet, BidPost } from "../models/Bid";
import { handleError } from "../handlers/ErrorHandler";

const api = 'http://localhost:5018/auction_backend/bid';

export const placeBidApi = async (auctionId: number, amount: number) => {
    try {
        const token = localStorage.getItem('token');

        const data = await axios.post<BidPost>(
            api,
            {
                auctionId: auctionId,
                amount: amount,
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

export const getBidsByAuctionApi = async (auctionId: number) => {
    try {
        const data = await axios.get<BidGet[]>(`${api}/auction/${auctionId}`);
        return data;
    } catch (error) {
        handleError(error);
    }
};