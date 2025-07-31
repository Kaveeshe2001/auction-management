import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { storeGetByIdApi } from "../../services/StoreServices";
import { artGetByStoreApi } from "../../services/ArtServices";
import Breadcrumb from "../../components/Shared/Breadcrumb/Breadcrumb";
import { Col, Container } from "react-bootstrap";
import SellerProfile from "../../components/store/SellerProfile/SellerProfile";
import Filter from "../../components/ui/Filter/Filter";
import ProductWrapper from "../../components/ui/ProductWrapper/ProductWrapper";
import AuctionCard from "../../components/ui/Cards/AuctionCard/AuctionCard";
import Pagination from "../../components/ui/Pagination/Pagination";
import PaginationItem from "../../components/ui/Pagination/PaginationItem";
import type { StoreGet } from "../../models/Store";
import type { Art } from "../../models/Art";

const SellerDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [seller, setSeller] = useState<StoreGet[] | null | undefined>(null);
  const [arts, setArts] = useState<Art[] | null | undefined>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (id) {
        getSeller(id);
    }
  }, [id]);

  useEffect(() => {
    if (seller && seller[0]?.id) {
        getArts(seller[0].id, pageNumber, pageSize);
    }
  }, [seller, pageNumber, pageSize]);

  const getSeller = async (id: string) => {
    try {
        const res = await storeGetByIdApi(id);

        if (res?.data) {
            const sellerArray = Array.isArray(res.data) ? res.data : [res.data];
            setSeller(sellerArray);
        } else {
            setSeller(null);
        }
    } catch (error) {
        console.error(error);
        setSeller(null);
    }
  };

  const getArts = async (storeId: number, page: number, size: number) => {
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
            setTotalPages(Math.ceil(res?.data.totalCount / size));
        } else {
            setArts(null);
        }
    } catch (error) {
        console.error(error);
        setArts(null);
    }
  };

  const handlePageChange = (page: number) => {
    setPageNumber(page);
  };

  return (
    <div>
      <Breadcrumb>
          <h1>Seller Details</h1>

          <ul className="breadcrumb-list">
            <li>
                <a href="/">Home</a>
            </li>
            <li>Seller Details</li>
          </ul>
      </Breadcrumb>

      <Container>
        {seller?.map((sellerValues) => (
            <SellerProfile seller={sellerValues} key={sellerValues.id} />
        ))}

        <Filter items={pageSize} />

        <ProductWrapper>
            {arts?.map((art, index) => (
                <Col xl={3} md={4} key={index}>
                    <AuctionCard art={art} />
                </Col>
            ))}
        </ProductWrapper>

        <Pagination>
            {[...Array(totalPages)].map((_, index) => (
                <PaginationItem
                  key={index + 1}
                  active={index + 1}
                  handleClick={() => handlePageChange(index + 1)}
                >
                    {index + 1}
                </PaginationItem>
            ))}
        </Pagination>
      </Container>
    </div>
  );
};

export default SellerDetails;
