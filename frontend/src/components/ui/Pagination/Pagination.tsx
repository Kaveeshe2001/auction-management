import { Col, Row } from 'react-bootstrap';
import './pagination.css';

type Props = {
    children: React.ReactNode;
};

const Pagination = ({ children }: Props) => {
  return (
    <Row className='mb-40'>
        <Col lg={12} className='d-flex justify-content-center'>
            <div className='inner-pagination-area'>
                <ul className='paginations'>{children}</ul>
            </div>
        </Col>
    </Row>
  );
};

export default Pagination;
