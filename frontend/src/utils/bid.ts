import type { Dispatch, SetStateAction } from "react";
import type { UserProfileToken } from "../models/User";
import { getBidsByAuctionApi } from "../services/BidServices";
import { getUserByIdApi } from "../services/AuthServices";

interface BidsWithUser {
    amount: number;
    userId: string;
    user: UserProfileToken;
}

export const getBidsByAuction = async (
    auctionId: number,
    setBids: Dispatch<SetStateAction<BidsWithUser[] | null | undefined>>
) => {
    try {
        const res = await getBidsByAuctionApi(auctionId);

        if (res?.data) {
            const bidArray = Array.isArray(res.data) ? res.data : [res.data];

            console.log(bidArray);

            const userData = await Promise.all(
                bidArray.map(async (bid) => {
                    try {
                        const userRes = await getUserByIdApi(bid.userId);
                        return { ...bid, user: userRes?.data || null };
                    } catch (error) {
                        console.error('Error fetching user data:', error);
                        return { ...bid, user: null };
                    }
                })
            );

            const validBids = userData.filter(
                (item): item is BidsWithUser & { user: UserProfileToken } =>
                  item.user !== null
            );

            setBids(validBids);
        } else {
            setBids(null);
        }
    } catch (error) {
        console.error(error);
        setBids(null);
    }
};