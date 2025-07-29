import { useEffect, useRef, useState } from "react"
import type { CategoryGet } from '../../../models/Category';
import { Swiper, type SwiperClass, SwiperSlide } from "swiper/react";
import { getCategories } from "../../../utils/categories";
import { Col, Container, Row } from "react-bootstrap";
import PrimaryButton from "../../ui/Buttons/PrimaryButton/PrimaryButton";
import { RiArrowLeftLine, RiArrowRightLine, RiCircleFill } from "@remixicon/react";
import { Navigation } from "swiper/modules";
import CategoryCard from "../../ui/Cards/CategoryCard/CategoryCard";
//import 'swiper/css';
import './categories.css';

const Categories = () => {
  const [categories, setCategories] = useState<
    CategoryGet[] | null | undefined
  >(null);
  const swiperRef = useRef<SwiperClass | null>(null);
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getCategories(setCategories);
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
        const swiper = swiperRef.current;

        const updateNavigation = () => {
            if (prevRef.current && nextRef.current) {
                if (swiper.isBeginning) {
                    prevRef.current.classList.add('disable');
                } else {
                    prevRef.current.classList.remove('disable');
                }

                if (swiper.isEnd) {
                    nextRef.current.classList.add('disable');
                } else {
                    nextRef.current.classList.remove('disable');
                }
            }
        };

        swiper.on('slideChange', updateNavigation);
        swiper.on('reachBeginning', updateNavigation);
        swiper.on('reachEnd', updateNavigation);

        updateNavigation();

        return () => {
            swiper.off('slideChange', updateNavigation);
            swiper.off('reachBeginning', updateNavigation);
            swiper.off('reachEnd', updateNavigation);
        };
    }
  }, []);

  return (
    <div className="home4-category-section mb-120">
      <Container>
        <Row className="mb-50">
            <div className="col-lg-12 d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div className="section-title3 text-white">
                    <h2 className="text-white">Auction Category.</h2>
                    <p>
                      Feel free adapt this based on the specific managed services,
                      features  
                    </p>
                </div>

                <PrimaryButton
                  variant='full-white'
                  text='view all categories'
                  link='/categories'
                  icon={<RiCircleFill size={16} />}
                />
            </div>
        </Row>

        <div className="category-slider-wrapper">
            <Row>
                <Col lg={12}>
                    <Swiper
                     slidesPerView={5}
                     spaceBetween={30}
                     pagination={{
                        clickable: true,
                     }}
                     modules={[Navigation]}
                     onSwiper={(swiper) => {
                        setTimeout(() => {
                            swiperRef.current = swiper;

                            swiper.navigation.destroy();
                            swiper.navigation.init();
                            swiper.navigation.update();
                        });
                     }}
                     className="mySwiper"
                    >
                        {categories?.map((category) => (
                            <SwiperSlide>
                                <CategoryCard category={category} key={category.id} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Col>
            </Row>

            <div className="slider-btn-grp">
                <div 
                  className="slider-btn category-slider-prev"
                  ref={prevRef}
                  onClick={() => swiperRef.current?.slidePrev()}
                >
                    <RiArrowLeftLine size={16} />
                </div>
                <div
                  className='slider-btn category-slider-next'
                  ref={nextRef}
                  onClick={() => swiperRef.current?.slideNext()}
                >
                  <RiArrowRightLine size={16} />
                </div>
            </div>
        </div>
      </Container>
    </div>
  );
};

export default Categories;
