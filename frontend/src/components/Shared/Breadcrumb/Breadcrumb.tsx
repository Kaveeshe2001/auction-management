import { Col, Container, Row } from "react-bootstrap";
import bannerImage from '../../../assets/banner.jpg';
import './breadcrumb.css';

type BreadcrumbProps = {
    children: React.ReactNode;
};

const Breadcrumb = ({ children }: BreadcrumbProps) => {
    return (
        <div className="breadcrumb" style={{ backgroundImage: `url(${bannerImage})` }}>
            <Container>
                <Row>
                    <Col lg={12} className="bread-col">
                       <div className="banner-content">{children}</div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Breadcrumb;