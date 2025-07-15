import './footer.css';
import logo from '../../../assets/logo-white.png';
import visa from '../../../assets/visa.svg';
import masterCard from '../../../assets/master-card.svg';
import americanExpress from '../../../assets/american-express.svg';
import maestro from '../../../assets/maestro.svg';
import { useEffect, useState } from 'react';
import type { CategoryGet } from '../../../models/Category';
import { getCategories } from '../../../utils/categories';
import { Col, Container, Row } from 'react-bootstrap';
import { RiArrowRightLine, RiFacebookCircleFill, RiInstagramLine, RiLinkedinBoxFill, RiTwitterXLine } from '@remixicon/react';

const Footer = () => {
  const [categories, setCategories] = useState<
    CategoryGet[] | null | undefined
  >(null);

  useEffect(() => {
    getCategories(setCategories);
  }, []);

  return (
    <footer>
        <div className='footer-wrapper'>
            <Container>
                <div className='footer-menu-wrap'>
                    <Row className='g-lg-4 gy-5'>
                        <Col lg={2} sm={6}>
                          <div className='footer-widget'>
                            <div className='widget-title'>
                                <h4>Category</h4>
                            </div>

                            <div className='menu-container'>
                                <ul className='widget-list'>
                                    {categories?.map((category) => (
                                        <li key={category.id}>
                                            <a href=''>{category.categoryName}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                          </div>
                        </Col>

                        <Col lg={2} sm={6}>
                          <div className='footer-widget'>
                            <div className='widget-title'>
                                <h4>Company</h4>
                            </div>

                            <div className='menu-container'>
                                <ul className='widget-list'>
                                    <li>
                                        <a href=''>How to bid with us</a>
                                    </li>
                                    <li>
                                      <a href=''>How to sell with us</a>
                                    </li>
                                    <li>
                                      <a href=''>About us</a>
                                    </li>
                                </ul>
                            </div>
                          </div>
                        </Col>

                        <Col lg={4} sm={6}
                          className='d-flex justify-content-lg-center align-item-center'
                        >
                            <div className='footer-logo-area'>
                                <div className='footer-logo'>
                                    <img src={logo} alt='' />
                                </div>

                                <div className='social-list'>
                                    <li>
                                      <a href=''>
                                        {' '}
                                        <RiLinkedinBoxFill color='#fff' size={18} />
                                        <span>LinkedIn</span>
                                      </a>
                                    </li>
                                    <li>
                                      <a href=''>
                                        <RiFacebookCircleFill color='#fff' size={18} />
                                        <span>Facebook</span>
                                      </a>
                                    </li>
                                    <li>
                                      <a href=''>
                                        <RiTwitterXLine color='#fff' size={18} />
                                        <span>Twitter</span>
                                      </a>
                                    </li>
                                    <li>
                                      <a href=''>
                                        <RiInstagramLine color='#fff' size={18} />
                                        <span>Twitter</span>
                                      </a>
                                    </li>
                                </div>
                            </div>
                        </Col>

                        <Col
                          lg={4} sm={6}
                          className='d-flex justify-content-lg-center align-items-center'
                        >
                            <div className='newletter-and-payment-wrap'>
                                <div className='newletter-area'>
                                    <h4>Join Our Newsletter &amp; More information.</h4>

                                    <form>
                                        <div className='form-inner'>
                                            <input type='email' placeholder='Email Address' />
                                            <button type='submit'>
                                              <RiArrowRightLine color='#fff' size={18} />
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                <div className='payment-area'>
                                    <h6>Secured Payment Gateways</h6>

                                    <ul className='payment-option'>
                                        <li>
                                          <img src={visa} alt='visa' />
                                        </li>
                                        <li>
                                          <img src={masterCard} alt='master card' />
                                        </li>
                                        <li>
                                          <img src={americanExpress} alt='american express' />
                                        </li>
                                        <li>
                                          <img src={maestro} alt='maestro' />
                                        </li>                  
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    </footer>
  );
};

export default Footer;
