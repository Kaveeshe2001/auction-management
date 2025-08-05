import type { Art } from '../../models/Art';
import type { UserProfileToken } from '../../models/User';
import './auctiondetails.css';

type Props = {
    id: number | undefined;
    art: Art | null;
    startDate?: string;
    endDate?: string;
    status?: string;
};

interface BidsWithUser {
    amount: number;
    userId: string;
    user: UserProfileToken;
}

const AuctionDetailsWrapper = () => {
  return (
    <div>
      
    </div>
  )
}

export default AuctionDetailsWrapper
