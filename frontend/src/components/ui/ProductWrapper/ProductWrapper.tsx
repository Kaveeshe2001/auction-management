import { Row } from "react-bootstrap";

type Props = {
  children: React.ReactNode;
};

const ProductWrapper = ({ children }: Props) => {
  return (
    <Row className="g-4 mb-60">{children}</Row>
  );
};

export default ProductWrapper;
