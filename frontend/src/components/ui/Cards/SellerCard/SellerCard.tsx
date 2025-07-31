import { RiArrowRightLine, RiMapPinLine, RiPhoneLine } from '@remixicon/react';
import './sellercard.css';
import PrimaryButton from '../../Buttons/PrimaryButton/PrimaryButton';

type Store = {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  coverPhoto: string;
  profilePhoto: string;
};

type SellerCardProps = {
  store: Store;
};

const SellerCard = ({ store }: SellerCardProps) => {
  const { id, name, address, phoneNumber, coverPhoto, profilePhoto } = store;

  return (
    <div className='store-card'>
      <div className='store-card-cover-photo'>
        <img src={coverPhoto} alt='coverPhoto' />
      </div>
      <div className='store-card-content'>
        <div className='profile-area'>
            <div className='profile-img'>
                <img src={profilePhoto} alt='profilePhoto' />
            </div>
            <div className='profile-content'>
                <h5>
                    <a href={`seller-details?id=${id}`}>{name}</a>
                </h5>
                <span>45, 533 Item</span>
            </div>
        </div>
        <ul className='contact-area'>
            <li className='single-contact'>
                <div className='icon'>
                    <RiMapPinLine />
                </div>
                <div className='content'>
                    <h6>
                      <a href='https://maps.app.goo.gl/kqJUoD2Fa4GJ2aPWA'>
                        {address}
                      </a>
                    </h6>
                </div>
            </li>
            <li className='single-contact'>
                <div className='icon'>
                    <RiPhoneLine />
                </div>
                <div className='content'>
                    <h6>
                        <a href='https://maps.app.goo.gl/kqJUoD2Fa4GJ2aPWA'>
                          {phoneNumber}
                        </a>
                    </h6>
                </div>
            </li>
        </ul>

        <PrimaryButton
          text='View Store'
          variant='seller'
          link={`seller-details?id=${id}`}
          icon={
            <RiArrowRightLine
              size={12}
              style={{ fill: 'rgba(34, 34, 34, .5)' }}
            />
          }
        />
      </div>
    </div>
  );
};

export default SellerCard;
