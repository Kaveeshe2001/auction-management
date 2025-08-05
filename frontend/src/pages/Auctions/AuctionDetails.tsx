import { useLocation } from "react-router-dom";
import type { Art } from "../../models/Art";
import { useEffect, useState } from "react";
import { getAuctionsById } from "../../utils/auction";
import Breadcrumb from "../../components/Shared/Breadcrumb/Breadcrumb";
import AuctionDetailsWrapper from "../../components/auction/AuctionDetailsWrapper";

interface AuctionWithArt {
    id: number;
    status: string;
    art: Art;
    startDate: string;
    endDate: string;
}

const AuctionDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [auction, setAuction] = useState<AuctionWithArt[] | null | undefined>(
    null
  );

  useEffect(() => {
    if(id) {
        getAuctionsById(parseInt(id), setAuction);
    }
  }, [id]);

  console.log(auction);

  return (
    <div className="auction-details-section">
      <Breadcrumb>
        <h1>Auction Details</h1>

        <ul className="breadcrumb-list">
            <li>
                <a href="/">Home</a>
            </li>
            <li>Auction Details</li>
        </ul>
      </Breadcrumb>

      <AuctionDetailsWrapper
        id={auction && auction.length > 0 ? auction[0].id : undefined}
        art={auction && auction.length > 0 ? auction[0].art : null}
        startDate={auction && auction.length > 0 ? auction[0].startDate : ''}
        endDate={auction && auction.length > 0 ? auction[0].endDate : ''}
        status={auction && auction.length > 0 ? auction[0].status : ''}
      />
    </div>
  );
};

export default AuctionDetails;
