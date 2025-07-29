import { Col, Container, Row } from "react-bootstrap"
import Breadcrumb from "../../components/Shared/Breadcrumb/Breadcrumb"
import Steps from "../../components/steps/Steps/Steps"
import { howToSell } from "../../data/howtosell"

const HowtoSell = () => {
  return (
    <div>
      <Breadcrumb>
        <h1>How to Sell</h1>

        <ul className="breadcrumb-list">
            <li>
                <a href="/">Home</a>
            </li>
            <li>How to Sell</li>
        </ul>
      </Breadcrumb>

      <Container>
        <Row style={{ justifyContent: 'center', marginBottom: 70}}>
            <Col lg={10}>
               <Steps steps={howToSell} />
            </Col>
        </Row>
      </Container>
    </div>
  )
}

export default HowtoSell
