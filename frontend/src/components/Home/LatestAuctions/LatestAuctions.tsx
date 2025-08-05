import { useEffect, useState } from "react";
import type { Art } from "../../../models/Art";
import { getLatestAuction } from "../../../utils/auction";
import { Col, Row } from "react-bootstrap";
import AuctionCard from "../../ui/Cards/AuctionCard/AuctionCard";

interface AuctionWithArt {
    id: number;
    status: string;
    art: Art;
    startDate: string;
    endDate: string;
}

const LatestAuctions = () => {
  const [auctions, setAuctions] = useState<AuctionWithArt[] | null | undefined>(
    null
  );
  const limit = 8;

  useEffect(() => {
    getLatestAuction(limit, setAuctions);
  }, [limit]);

  return (
    <div>
      <Row className="mb-50">
        <Col lg={12}>
            <div className="section-title3 text-center">
                <h2>New Live Auction.</h2>
                <p>
                  Feel free adapt this based on the specific managed services,
                  features
                </p>
            </div>
        </Col>
      </Row>

      <Row className="g-4 mb-50">
        {auctions?.map((auction) => (
            <Col xl={3} lg={4} md={6} key={auction.id}>
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

export default LatestAuctions;
