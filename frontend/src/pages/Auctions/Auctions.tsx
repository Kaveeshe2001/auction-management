import { useEffect, useState } from "react";
import type { Art } from "../../models/Art";
import { getAllAuctions } from "../../utils/auction";
import Breadcrumb from "../../components/Shared/Breadcrumb/Breadcrumb";
import { Col, Container } from "react-bootstrap";
import Filter from "../../components/ui/Filter/Filter";
import ProductWrapper from "../../components/ui/ProductWrapper/ProductWrapper";
import AuctionCard from "../../components/ui/Cards/AuctionCard/AuctionCard";

interface AuctionWithArt {
    id: number;
    status: string;
    art: Art;
    startDate: string;
    endDate: string;
}

const Auctions = () => {
  const [pageSize] = useState(10);
  const [auctions, setAuctions] = useState<AuctionWithArt[] | null | undefined>(null);

  useEffect(() => {
    getAllAuctions(setAuctions);
  }, []);
  
  return (
    <div>
      <Breadcrumb>
        <h1>Auctions</h1>

        <ul className="breadcrumb-list">
            <li>
                <a href="/">Home</a>
            </li>
            <li>Auctions</li>
        </ul>
      </Breadcrumb>

      <Container>
        <Filter items={pageSize} />

        <ProductWrapper>
            {auctions?.map((auction, index) => (
                <Col xl={3} md={4} key={index}>
                    <AuctionCard
                      art={auction.art}
                      status={auction.status}
                      startDate={auction.startDate}
                      endDate={auction.endDate}
                      auctionId={auction.id}
                    />
                </Col>
            ))}
        </ProductWrapper>
      </Container>
    </div>
  );
};

export default Auctions;
