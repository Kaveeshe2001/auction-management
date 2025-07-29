import { Col, Row } from 'react-bootstrap';
import './feature.css';
import { features } from '../../../data/feature';

const Feature = () => {
  return (
    <div className='home4-feature-section mb-120'>
      <Row className='mb-50'>
        <Col lg={12}>
            <div className='section-title3'>
                <h2>Highlight Featured</h2>
                <p>
                  Feel free adapt this based one the specifical managed services,
                  features auctions
                </p>
            </div>
        </Col>
      </Row>
      <div className='feature-wrapper'>
        <Row className='g-4'>
            {features.map((feature, index) => (
                <Col lg={3} sm={6} className='divider' key={index}>
                    <div className='single-feature'>
                        <div className='icon'>
                            <feature.icon size={50} />
                        </div>
                        <div className='content'>
                            <h4>{feature.title}</h4>
                            <p>{feature.des}</p>
                        </div>
                    </div>
                </Col>
            ))}
        </Row>
      </div>

      <div className='feature-bottom-area'>
        <Row className='g-4'>
            <Col lg={6}>
               <div
                 className='feature-banner'
                 style={{
                    backgroundImage:
                        'linear-gradient(180deg, rgba(11, 12, 12, 0.8) 0%, rgba(11, 12, 12, 0.8) 100%), url(how-to-bid.jpg)',
                 }}
                >
                    <div className='banner-content'>
                        <span>How to use</span>
                        <h2>
                            <a href='/art-auction/how-to-buy'>How to bid your item</a>
                        </h2>
                    </div>
                    <a className='arrow' href='/art-auction/how-to-buy'>
                        <svg
                          width='100'
                          height='100'
                          viewBox='0 0 100 100'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <g>
                            <path d='M0.495049 0H99.9999V18.6274L18.8119 99.9997L0 81.3723L55.4455 26.4705L0.495049 26.9607V0Z'></path>
                            <path d='M100 100.001V37.2559L73.2673 63.7264V100.001H100Z'></path>
                          </g>
                        </svg>
                    </a>
                </div>
            </Col>

            <Col lg={6}>
                <div
                  className='feature-banner'
                  style={{
                    backgroundImage:
                      'linear-gradient(180deg, rgba(11, 12, 12, 0.8) 0%, rgba(11, 12, 12, 0.8) 100%), url(how-to-sell.jpg)',
                  }}
                >
                    <div className='banner-content'>
                        <span>How to use</span>
                        <h2>
                          <a href='how-to-sell'>How to sell your item</a>
                        </h2>
                    </div>
                    <a className='arrow' href='how-to-sell'>
                      <svg
                        width='100'
                        height='100'
                        viewBox='0 0 100 100'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <g>
                          <path d='M0.495049 0H99.9999V18.6274L18.8119 99.9997L0 81.3723L55.4455 26.4705L0.495049 26.9607V0Z'></path>
                          <path d='M100 100.001V37.2559L73.2673 63.7264V100.001H100Z'></path>
                        </g>
                      </svg>
                    </a>
                </div>
            </Col>
        </Row>
      </div>
    </div>
  );
};

export default Feature;
