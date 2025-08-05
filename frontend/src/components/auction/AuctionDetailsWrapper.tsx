import { useEffect, useState } from 'react';
import type { Art } from '../../models/Art';
import type { UserProfileToken } from '../../models/User';
import './auctiondetails.css';
import { placeBidApi } from '../../services/BidServices';
import { toast } from 'react-toastify';
import { getBidsByAuction } from '../../utils/bid';
import { Col, Container, Row } from 'react-bootstrap';
import BiddingSummaryAuction from '../ui/Tables/BiddingSummaryAuction';
import { RiAddLine, RiSubtractLine } from '@remixicon/react';
import Input from '../ui/Input/Input';
import PrimaryButton from '../ui/Buttons/PrimaryButton/PrimaryButton';

type Props = {
    id: number | undefined;
    art: Art | null;
    startDate?: string;
    endDate?: string;
    status?: string;
};

interface BidsWithUser {
    amount: number;
    userId: string;
    user: UserProfileToken;
}

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const AuctionDetailsWrapper = ({
    id,
    art,
    startDate,
    endDate,
    status,
}: Props) => {
  const [bidValue, setBidValue] = useState(0);
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [auctionDuration, setAuctionDuration] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [bids, setBids] = useState<BidsWithUser[] | null | undefined>(null);

  useEffect(() => {
    if (!startDate || !endDate) return;

    const calculateAuctionDuration = () => {
        const now = new Date().getTime();
        const end = new Date(endDate).getTime();
        const timeDiff = end - now;

        if (timeDiff > 0) {
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
              (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            setAuctionDuration({ days, hours, minutes, seconds });
        } else {
            setAuctionDuration({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
    };

    calculateAuctionDuration();
    const interval = setInterval(calculateAuctionDuration, 1000);

    return () => clearInterval(interval);
  }, [startDate, endDate]);

  useEffect(() => {
    if (!startDate) return;

    const calculateRemainingTime = () => {
        const now = new Date().getTime();
        const end = new Date(startDate).getTime();
        const timeDiff = end - now;

        if (timeDiff > 0) {
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
              (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            setRemainingTime({ days, hours, minutes, seconds });
        } else {
            setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 }); 
        }
    };

    calculateRemainingTime();
    const interval = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  const increaseValue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setBidValue(bidValue + 1);
  };

  const decreaseValue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (bidValue > 0) {
        setBidValue(bidValue - 1);
    } else {
        setBidValue(0);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue)) {
        setBidValue(parsedValue);
    } else if (value === '') {
        setBidValue(0);
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (id) {
        placeBidApi(id, bidValue)
          .then((res) => {
            if (res) {
                toast.success('Bid Place Successfully');
                window.location.reload();
            }
          })
          .catch((e) => {
            toast.warning(e);
          });
    }
  };

  useEffect(() => {
    if (id) {
        getBidsByAuction(id, setBids);
    }
  }, [id]);

  console.log(bids);

  return (
    <div className='auction-details mb-60 pt-60'>
      <Container fluid>
        <Row className='gy-5'>
            <Col xl={6}>
                <div className='auction-details-img'>
                    <div className='tab-content'>
                        <div className='tab-pane fade show active'>
                            <div className='auction-details-tab-img'>
                                <img src={art?.image} alt='' />
                            </div>
                        </div>
                    </div>
                </div>

                {bids && <BiddingSummaryAuction bids={bids} />}
            </Col>
            <Col xl={5}>
                <div className='auction-details-content'>
                    <div className='batch'>
                        <span>Lot: #{art?.lot}</span>
                    </div>
                    <h1>{art?.title}</h1>
                    <p>{art?.condition}</p>
                    <div className='price-area'>
                        <span>Current Bid at:</span>
                        <strong>${art?.currentMarketPrice.toLocaleString()}</strong>
                    </div>

                    {status === 'Active' && (
                        <div className='coundown-area'>
                            <h6>Auction Will Be End:</h6>
                            <div className='countdown-timer'>
                                <ul data-countdown='2025-08-04 12:00:00'>
                                    <li data-days='0'>
                                        {auctionDuration.days} <span>Days</span>{' '}
                                        <span>Days</span>
                                    </li>
                                    <li className='clone'>
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='4'
                                        height='13'
                                        viewBox='0 0 4 13'
                                      >
                                        <path d='M0 11.0633C0 11.5798 0.186992 12.0317 0.560976 12.419C0.95122 12.8063 1.43089 13 2 13C2.58537 13 3.06504 12.8063 3.43903 12.419C3.81301 12.0317 4 11.5798 4 11.0633C4 10.5146 3.81301 10.0546 3.43903 9.68343C3.06504 9.29609 2.58537 9.10242 2 9.10242C1.43089 9.10242 0.95122 9.29609 0.560976 9.68343C0.186992 10.0546 0 10.5146 0 11.0633ZM0 1.96089C0 2.49348 0.186992 2.95345 0.560976 3.34078C0.95122 3.72812 1.43089 3.92179 2 3.92179C2.58537 3.92179 3.06504 3.72812 3.43903 3.34078C3.81301 2.95345 4 2.49348 4 1.96089C4 1.42831 3.81301 0.968343 3.43903 0.581006C3.06504 0.193669 2.58537 0 2 0C1.43089 0 0.95122 0.193669 0.560976 0.581006C0.186992 0.968343 0 1.42831 0 1.96089Z'></path>
                                      </svg>
                                    </li>
                                    <li data-hours='0'>
                                      {auctionDuration.hours} <span>Hours</span>{' '}
                                      <span>Hours</span>
                                    </li>
                                    <li className='clone'>
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='4'
                                        height='13'
                                        viewBox='0 0 4 13'
                                      >
                                        <path d='M0 11.0633C0 11.5798 0.186992 12.0317 0.560976 12.419C0.95122 12.8063 1.43089 13 2 13C2.58537 13 3.06504 12.8063 3.43903 12.419C3.81301 12.0317 4 11.5798 4 11.0633C4 10.5146 3.81301 10.0546 3.43903 9.68343C3.06504 9.29609 2.58537 9.10242 2 9.10242C1.43089 9.10242 0.95122 9.29609 0.560976 9.68343C0.186992 10.0546 0 10.5146 0 11.0633ZM0 1.96089C0 2.49348 0.186992 2.95345 0.560976 3.34078C0.95122 3.72812 1.43089 3.92179 2 3.92179C2.58537 3.92179 3.06504 3.72812 3.43903 3.34078C3.81301 2.95345 4 2.49348 4 1.96089C4 1.42831 3.81301 0.968343 3.43903 0.581006C3.06504 0.193669 2.58537 0 2 0C1.43089 0 0.95122 0.193669 0.560976 0.581006C0.186992 0.968343 0 1.42831 0 1.96089Z'></path>
                                      </svg>
                                    </li>
                                    <li data-minutes='0'>
                                        {auctionDuration.minutes} <span>Mint</span>{' '}
                                        <span>Minutes</span>
                                    </li>
                                    <li className='clone'>
                                        <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='4'
                                        height='13'
                                        viewBox='0 0 4 13'
                                        >
                                        <path d='M0 11.0633C0 11.5798 0.186992 12.0317 0.560976 12.419C0.95122 12.8063 1.43089 13 2 13C2.58537 13 3.06504 12.8063 3.43903 12.419C3.81301 12.0317 4 11.5798 4 11.0633C4 10.5146 3.81301 10.0546 3.43903 9.68343C3.06504 9.29609 2.58537 9.10242 2 9.10242C1.43089 9.10242 0.95122 9.29609 0.560976 9.68343C0.186992 10.0546 0 10.5146 0 11.0633ZM0 1.96089C0 2.49348 0.186992 2.95345 0.560976 3.34078C0.95122 3.72812 1.43089 3.92179 2 3.92179C2.58537 3.92179 3.06504 3.72812 3.43903 3.34078C3.81301 2.95345 4 2.49348 4 1.96089C4 1.42831 3.81301 0.968343 3.43903 0.581006C3.06504 0.193669 2.58537 0 2 0C1.43089 0 0.95122 0.193669 0.560976 0.581006C0.186992 0.968343 0 1.42831 0 1.96089Z'></path>
                                        </svg>
                                    </li>
                                    <li data-seconds='0'>
                                        {auctionDuration.seconds} <span>Sec</span>{' '}
                                        <span>Seconds</span>
                                    </li>
                                </ul>
                            </div>
                            <span>
                                <strong>Ending On:</strong> {endDate}
                            </span>
                        </div>
                    )}

                    {status === 'Pending' && (
                        <div className='coundown-area'>
                            <h6>Auction Will Be Start:</h6>
                            <div className='countdown-timer'>
                                <ul data-countdown='2024-08-24 12:00:00'>
                                <li data-days='0'>
                                    {remainingTime.days} <span>Days</span> <span>Days</span>
                                </li>
                                <li className='clone'>
                                    <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='4'
                                    height='13'
                                    viewBox='0 0 4 13'
                                    >
                                    <path d='M0 11.0633C0 11.5798 0.186992 12.0317 0.560976 12.419C0.95122 12.8063 1.43089 13 2 13C2.58537 13 3.06504 12.8063 3.43903 12.419C3.81301 12.0317 4 11.5798 4 11.0633C4 10.5146 3.81301 10.0546 3.43903 9.68343C3.06504 9.29609 2.58537 9.10242 2 9.10242C1.43089 9.10242 0.95122 9.29609 0.560976 9.68343C0.186992 10.0546 0 10.5146 0 11.0633ZM0 1.96089C0 2.49348 0.186992 2.95345 0.560976 3.34078C0.95122 3.72812 1.43089 3.92179 2 3.92179C2.58537 3.92179 3.06504 3.72812 3.43903 3.34078C3.81301 2.95345 4 2.49348 4 1.96089C4 1.42831 3.81301 0.968343 3.43903 0.581006C3.06504 0.193669 2.58537 0 2 0C1.43089 0 0.95122 0.193669 0.560976 0.581006C0.186992 0.968343 0 1.42831 0 1.96089Z'></path>
                                    </svg>
                                </li>
                                <li data-hours='0'>
                                    {remainingTime.hours} <span>Hours</span>{' '}
                                    <span>Hours</span>
                                </li>
                                <li className='clone'>
                                    <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='4'
                                    height='13'
                                    viewBox='0 0 4 13'
                                    >
                                    <path d='M0 11.0633C0 11.5798 0.186992 12.0317 0.560976 12.419C0.95122 12.8063 1.43089 13 2 13C2.58537 13 3.06504 12.8063 3.43903 12.419C3.81301 12.0317 4 11.5798 4 11.0633C4 10.5146 3.81301 10.0546 3.43903 9.68343C3.06504 9.29609 2.58537 9.10242 2 9.10242C1.43089 9.10242 0.95122 9.29609 0.560976 9.68343C0.186992 10.0546 0 10.5146 0 11.0633ZM0 1.96089C0 2.49348 0.186992 2.95345 0.560976 3.34078C0.95122 3.72812 1.43089 3.92179 2 3.92179C2.58537 3.92179 3.06504 3.72812 3.43903 3.34078C3.81301 2.95345 4 2.49348 4 1.96089C4 1.42831 3.81301 0.968343 3.43903 0.581006C3.06504 0.193669 2.58537 0 2 0C1.43089 0 0.95122 0.193669 0.560976 0.581006C0.186992 0.968343 0 1.42831 0 1.96089Z'></path>
                                    </svg>
                                </li>
                                <li data-minutes='0'>
                                    {remainingTime.minutes} <span>Mint</span>{' '}
                                    <span>Minutes</span>
                                </li>
                                <li className='clone'>
                                    <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='4'
                                    height='13'
                                    viewBox='0 0 4 13'
                                    >
                                    <path d='M0 11.0633C0 11.5798 0.186992 12.0317 0.560976 12.419C0.95122 12.8063 1.43089 13 2 13C2.58537 13 3.06504 12.8063 3.43903 12.419C3.81301 12.0317 4 11.5798 4 11.0633C4 10.5146 3.81301 10.0546 3.43903 9.68343C3.06504 9.29609 2.58537 9.10242 2 9.10242C1.43089 9.10242 0.95122 9.29609 0.560976 9.68343C0.186992 10.0546 0 10.5146 0 11.0633ZM0 1.96089C0 2.49348 0.186992 2.95345 0.560976 3.34078C0.95122 3.72812 1.43089 3.92179 2 3.92179C2.58537 3.92179 3.06504 3.72812 3.43903 3.34078C3.81301 2.95345 4 2.49348 4 1.96089C4 1.42831 3.81301 0.968343 3.43903 0.581006C3.06504 0.193669 2.58537 0 2 0C1.43089 0 0.95122 0.193669 0.560976 0.581006C0.186992 0.968343 0 1.42831 0 1.96089Z'></path>
                                    </svg>
                                </li>
                                <li data-seconds='0'>
                                    {remainingTime.seconds} <span>Sec</span>{' '}
                                    <span>Seconds</span>
                                </li>
                                </ul>
                            </div>
                            <span>
                                <strong>Sarting On:</strong> {startDate}
                            </span>
                        </div>
                    )}

                    {status === 'Active' && (
                        <div className='quantity-area'>
                            <h6>Your Max Bid:</h6>
                            <div className='quantity-counter-and-btn-area'>
                                <div className='quantity-counter'>
                                    <button
                                       className='quantity__minus'
                                       onClick={(e) => decreaseValue(e)}
                                    >
                                        <RiSubtractLine />
                                    </button>
                                    <Input
                                        type='text'
                                        id='quantity'
                                        name='quantity'
                                        value={bidValue.toString()}
                                        onChange={handleInputChange}
                                    />
                                    <button
                                        className='quantity__plus'
                                        onClick={(e) => increaseValue(e)}
                                    >
                                        <RiAddLine />
                                    </button>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <PrimaryButton
                                        text='Place Bid'
                                        variant='white'
                                        type='submit'
                                    />
                                </form>
                            </div>
                        </div>
                    )}

                    <div className='payment-method'>
                        <h6>Guaranted Safe Checkout</h6>
                        <ul className='payment-card-list'>
                            <li>
                                <img
                                  src='/assets/img/inner-pages/payment-img1.svg'
                                  alt=''
                                />
                            </li>
                            <li>
                                <img
                                src='/assets/img/inner-pages/payment-img2.svg'
                                alt=''
                                />
                            </li>
                            <li>
                                <img
                                src='/assets/img/inner-pages/payment-img3.svg'
                                alt=''
                                />
                            </li>
                            <li>
                                <img
                                src='/assets/img/inner-pages/payment-img4.svg'
                                alt=''
                                />
                            </li>
                            <li>
                                <img
                                src='/assets/img/inner-pages/payment-img5.svg'
                                alt=''
                                />
                            </li>
                            <li>
                                <img
                                src='/assets/img/inner-pages/payment-img6.svg'
                                alt=''
                                />
                            </li>
                            <li>
                                <img
                                src='/assets/img/inner-pages/payment-img7.svg'
                                alt=''
                                />
                            </li>
                        </ul>
                    </div>

                    <ul className='question-and-wishlist-area'>
                        <li>
                            <a href='/art?-auction/contact'>
                                <span>
                                    <svg
                                        width='11'
                                        height='11'
                                        viewBox='0 0 11 11'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <g>
                                        <path d='M5.5 0C2.46015 0 0 2.45988 0 5.5C0 8.5398 2.45988 11 5.5 11C8.53985 11 11 8.54012 11 5.5C11 2.46015 8.54012 0 5.5 0ZM5.5 10.2326C2.89046 10.2326 0.767443 8.10956 0.767443 5.5C0.767443 2.89044 2.89046 0.767443 5.5 0.767443C8.10956 0.767443 10.2326 2.89044 10.2326 5.5C10.2326 8.10956 8.10956 10.2326 5.5 10.2326Z'></path>
                                        <path d='M5.337 6.95948C5.03293 6.95948 4.78679 7.21287 4.78679 7.51692C4.78679 7.81377 5.02569 8.07439 5.337 8.07439C5.64831 8.07439 5.89443 7.81377 5.89443 7.51692C5.89443 7.21287 5.64105 6.95948 5.337 6.95948ZM5.4311 2.73877C4.45373 2.73877 4.00488 3.31797 4.00488 3.7089C4.00488 3.99124 4.24379 4.12157 4.43925 4.12157C4.83021 4.12157 4.67094 3.56409 5.40938 3.56409C5.77135 3.56409 6.06096 3.72338 6.06096 4.05641C6.06096 4.44734 5.65553 4.67176 5.41662 4.87447C5.20665 5.05543 4.93157 5.35228 4.93157 5.9749C4.93157 6.35135 5.03293 6.45995 5.32974 6.45995C5.68447 6.45995 5.75687 6.30069 5.75687 6.1631C5.75687 5.78665 5.76411 5.56947 6.1623 5.25816C6.35777 5.10613 6.97312 4.61382 6.97312 3.9333C6.97312 3.25278 6.35777 2.73877 5.4311 2.73877Z'></path>
                                        </g>
                                    </svg>
                                </span>
                                Ask a question
                            </a>
                        </li>
                        <li>
                            <a href='#'>
                                <span>
                                <svg
                                    width='11'
                                    height='11'
                                    viewBox='0 0 18 18'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <g clip-path='url(#clip0_168_378)'>
                                    <path d='M16.528 2.20919C16.0674 1.71411 15.5099 1.31906 14.8902 1.04859C14.2704 0.778112 13.6017 0.637996 12.9255 0.636946C12.2487 0.637725 11.5794 0.777639 10.959 1.048C10.3386 1.31835 9.78042 1.71338 9.31911 2.20854L9.00132 2.54436L8.68352 2.20854C6.83326 0.217151 3.71893 0.102789 1.72758 1.95306C1.63932 2.03507 1.5541 2.12029 1.47209 2.20854C-0.490696 4.32565 -0.490696 7.59753 1.47209 9.71463L8.5343 17.1622C8.77862 17.4201 9.18579 17.4312 9.44373 17.1868C9.45217 17.1788 9.46039 17.1706 9.46838 17.1622L16.528 9.71463C18.4907 7.59776 18.4907 4.32606 16.528 2.20919ZM15.5971 8.82879H15.5965L9.00132 15.7849L2.40553 8.82879C0.90608 7.21113 0.90608 4.7114 2.40553 3.09374C3.76722 1.61789 6.06755 1.52535 7.5434 2.88703C7.61505 2.95314 7.68401 3.0221 7.75012 3.09374L8.5343 3.92104C8.79272 4.17781 9.20995 4.17781 9.46838 3.92104L10.2526 3.09438C11.6142 1.61853 13.9146 1.52599 15.3904 2.88767C15.4621 2.95378 15.531 3.02274 15.5971 3.09438C17.1096 4.71461 17.1207 7.2189 15.5971 8.82879Z'></path>
                                    </g>
                                </svg>
                                </span>
                                Add to wishlist
                            </a>
                        </li>
                    </ul>
                </div>
            </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AuctionDetailsWrapper;
