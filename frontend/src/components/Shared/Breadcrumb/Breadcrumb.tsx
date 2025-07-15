import { Col, Container, Row } from "react-bootstrap";
import './breadcrumb.css';

type BreadcrumbProps = {
    children: React.ReactNode;
};

const Breadcrumb = ({ children }: BreadcrumbProps) => {
    return (
        <div className="breadcrumb">
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