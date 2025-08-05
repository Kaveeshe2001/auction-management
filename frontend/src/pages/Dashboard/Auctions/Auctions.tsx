import { useEffect, useState } from "react";
import type { Art } from "../../../models/Art";
import { sellerAuctionsPills } from "../../../data/sellerAuctionsPills";
import { getAuctionsByUser } from "../../../utils/auction";
import NavPills from "../../../components/ui/NavPills/NavPills";
import { Col, Row } from "react-bootstrap";
import AuctionCard from "../../../components/ui/Cards/AuctionCard/AuctionCard";

interface AuctionWithArt {
    id: number;
    status: string;
    art: Art;
    startDate: string;
    endDate: string;
}

const Auctions = () => {
  const [auctions, setAuctions] = useState<AuctionWithArt[] | null | undefined>(
    null
  );
  const [activePill, setActivePill] = useState<number>(0);
  const [status, setStatus] = useState('');

  const handlePillClick = (index: number) => {
    setActivePill(index);
    setStatus(sellerAuctionsPills[index].text);
  };

  const userId = localStorage.getItem('id');

  useEffect(() => {
    if (userId) {
        if (status !== 'All') {
            getAuctionsByUser(userId, setAuctions, status);
        } else {
            getAuctionsByUser(userId, setAuctions);
        }
    }
  }, [userId, status]);

  return (
    <div className="my-auction-wrap">
      <NavPills
        navpills={sellerAuctionsPills}
        active={activePill}
        onPillClick={handlePillClick}
      />

      <Row>
        {auctions?.map((auction) => (
            <Col xl={4} lg={6} key={auction.id}>
                <AuctionCard
                   art={auction.art}
                   status={auction.status}
                   startDate={auction.startDate}
                   endDate={auction.endDate}
                />
            </Col>
        ))}
      </Row>
    </div>
  );
};

export default Auctions;
