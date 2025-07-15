import './banner.css';
import homeBanner from '../../../assets/home-banner.png';
import bannerImage from '../../../assets/banner.jpg';
import { Col, Row } from 'react-bootstrap';
import PrimaryButton from '../../ui/PrimaryButton/PrimaryButton';
import { RiArrowRightDownLine } from '@remixicon/react';

const Banner = () => {
  return (
    <div className='home-banner' style={{ backgroundImage: `url(${bannerImage})` }}>
      <div className='banner-wrapper'>
        <div className='container'>
            <Row>
              <Col xl={6} lg={7}>
                <div className='banner-content-area'>
                  <div className='banner-content'>
                    <span className='subtitle'>
                      <svg
                        width='14'
                        height='14'
                        viewBox='0 0 14 14'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M6.6304 0.338424C6.67018 -0.112811 7.32982 -0.112807 7.3696 0.338428L7.72654 4.38625C7.75291 4.68505 8.10454 4.83069 8.33443 4.63804L11.4491 2.02821C11.7963 1.73728 12.2627 2.20368 11.9718 2.55089L9.36197 5.66556C9.1693 5.89546 9.31496 6.24709 9.61374 6.27346L13.6615 6.6304C14.1128 6.67018 14.1128 7.32982 13.6615 7.3696L9.61374 7.72654C9.31496 7.75291 9.1693 8.10454 9.36197 8.33443L11.9718 11.4491C12.2627 11.7963 11.7963 12.2627 11.4491 11.9718L8.33443 9.36197C8.10454 9.1693 7.75291 9.31496 7.72654 9.61374L7.3696 13.6615C7.32982 14.1128 6.67018 14.1128 6.6304 13.6615L6.27346 9.61374C6.24709 9.31496 5.89546 9.1693 5.66556 9.36197L2.55089 11.9718C2.20368 12.2627 1.73729 11.7963 2.02822 11.4491L4.63804 8.33443C4.83069 8.10454 4.68504 7.75291 4.38625 7.72654L0.338424 7.3696C-0.112811 7.32982 -0.112807 6.67018 0.338428 6.6304L4.38625 6.27346C4.68505 6.24709 4.83069 5.89546 4.63804 5.66556L2.02821 2.55089C1.73728 2.20368 2.20368 1.73729 2.55089 2.02822L5.66556 4.63804C5.89546 4.83069 6.24709 4.68504 6.27346 4.38625L6.6304 0.338424Z'></path>
                      </svg>
                      PROBID YOU CAN TRUST
                      <svg
                        width='14'
                        height='14'
                        viewBox='0 0 14 14'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M6.6304 0.338424C6.67018 -0.112811 7.32982 -0.112807 7.3696 0.338428L7.72654 4.38625C7.75291 4.68505 8.10454 4.83069 8.33443 4.63804L11.4491 2.02821C11.7963 1.73728 12.2627 2.20368 11.9718 2.55089L9.36197 5.66556C9.1693 5.89546 9.31496 6.24709 9.61374 6.27346L13.6615 6.6304C14.1128 6.67018 14.1128 7.32982 13.6615 7.3696L9.61374 7.72654C9.31496 7.75291 9.1693 8.10454 9.36197 8.33443L11.9718 11.4491C12.2627 11.7963 11.7963 12.2627 11.4491 11.9718L8.33443 9.36197C8.10454 9.1693 7.75291 9.31496 7.72654 9.61374L7.3696 13.6615C7.32982 14.1128 6.67018 14.1128 6.6304 13.6615L6.27346 9.61374C6.24709 9.31496 5.89546 9.1693 5.66556 9.36197L2.55089 11.9718C2.20368 12.2627 1.73729 11.7963 2.02822 11.4491L4.63804 8.33443C4.83069 8.10454 4.68504 7.75291 4.38625 7.72654L0.338424 7.3696C-0.112811 7.32982 -0.112807 6.67018 0.338428 6.6304L4.38625 6.27346C4.68505 6.24709 4.83069 5.89546 4.63804 5.66556L2.02821 2.55089C1.73728 2.20368 2.20368 1.73729 2.55089 2.02822L5.66556 4.63804C5.89546 4.83069 6.24709 4.68504 6.27346 4.38625L6.6304 0.338424Z'></path>
                      </svg>
                    </span>

                    <h1>
                      Select <span>Our Product</span> At Our Auction.
                    </h1>

                    <p>
                      Join us as we carve a path to success, driven by passion,
                      powered by innovation, and we're here to turn them into
                      reality.
                    </p>

                    <div className='button-wrapper'>
                      <PrimaryButton
                        text='start a bid'
                        variant='white'
                        icon={<RiArrowRightDownLine size={16} />}
                      />
                      <PrimaryButton text='view all auction' variant='default' />
                    </div>
                  </div>
                </div>
              </Col>
              <Col xl={6} lg={5}>
                <div className='banner-img-area'>
                  <div className='banner-img'>
                    <img src={homeBanner} alt='homeBanner' />
                  </div>
                </div>
              </Col>
            </Row>
        </div>
      </div>
    </div>
  );
};

export default Banner;
