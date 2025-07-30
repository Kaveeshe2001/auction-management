import type { IconType } from 'react-icons';
import './navpills.css';
import BidButton from '../Buttons/BidButton/BidButton';

type NavPills= {
    text: string;
    icon?: IconType;
};

type Props = {
    navpills: NavPills[];
    active?: number;
    onPillClick?: (index: number) => void;
};

const NavPills = ({ navpills, active, onPillClick }: Props) => {
  return (
    <ul className='nav nav-pills'>
        {navpills.map((navpill, index) => (
            <li className='nav-item' key={index}>
                <BidButton
                  type='button'
                  text={navpill.text}
                  variant={active === index ? 'active' : 'nonActive'}
                  size='lg'
                  onClick={() => onPillClick && onPillClick(index)}
                />
            </li>
        ))}
    </ul>
  );
};

export default NavPills;
