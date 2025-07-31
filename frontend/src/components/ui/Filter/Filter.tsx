import { useSnapshot } from 'valtio';
import './filter.css';
import state from '../../../store';
import { RiEqualizerLine } from '@remixicon/react';

type Props = {
  items: number;
};

const Filter = ({ items }: Props) => {
  const snap = useSnapshot(state);

  return (
    <div className='auction-grid-title-section mb-40'>
      <h6>Showing 1-10 of {items} results</h6>

      <div className='filter-selector'>
        <div
          className='filter'
          onClick={() => (state.filterSidebar = !snap.filterSidebar)}
        >
            <div className='filter-icon'>
                <RiEqualizerLine size={24} />
            </div>
            <span>Filters</span>
        </div>

        <div className='selector'>
            <div className='nice-select'>
                <span className='current'>Sort by price</span>
                <ul className='list'>
                    <li className='option' data-value='0'>
                        Default Sorting
                    </li>
                </ul>
            </div>
        </div>

        <ul className='grid-view'>
            <li className='column-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='12'
                  height='20'
                  viewBox='0 0 12 20'
                >
                    <g>
                        <rect width='4.88136' height='5.10638' rx='2.44068'></rect>
                        <rect
                          y='7.44678'
                          width='4.88136'
                          height='5.10638'
                          rx='2.44068'
                        ></rect>
                        <rect
                          y='14.8937'
                          width='4.88136'
                          height='5.10638'
                          rx='2.44068'
                        ></rect>
                        <rect
                          x='7.11865'
                          width='4.88136'
                          height='5.10638'
                          rx='2.44068'
                        ></rect>
                        <rect
                          x='7.11865'
                          y='7.44678'
                          width='4.88136'
                          height='5.10638'
                          rx='2.44068'
                        ></rect>
                        <rect
                          x='7.11865'
                          y='14.8937'
                          width='4.88136'
                          height='5.10638'
                          rx='2.44068'
                        ></rect>
                    </g>
                </svg>
            </li>
            <li className='column-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                >
                    <g clip-path='url(#clip0_1610_1442)'>
                        <rect width='5.10638' height='5.10638' rx='2.55319'></rect>
                        <rect
                          y='7.44678'
                          width='5.10638'
                          height='5.10638'
                          rx='2.55319'
                        ></rect>
                        <rect
                          y='14.8937'
                          width='5.10638'
                          height='5.10638'
                          rx='2.55319'
                        ></rect>
                        <rect
                          x='7.44678'
                          width='5.10638'
                          height='5.10638'
                          rx='2.55319'
                        ></rect>
                        <rect
                          x='7.44678'
                          y='7.44678'
                          width='5.10638'
                          height='5.10638'
                          rx='2.55319'
                        ></rect>
                        <rect
                          x='7.44678'
                          y='14.8937'
                          width='5.10638'
                          height='5.10638'
                          rx='2.55319'
                        ></rect>
                        <rect
                          x='14.8936'
                          width='5.10638'
                          height='5.10638'
                          rx='2.55319'
                        ></rect>
                        <rect
                          x='14.8936'
                          y='7.44678'
                          width='5.10638'
                          height='5.10638'
                          rx='2.55319'
                        ></rect>
                        <rect
                          x='14.8936'
                          y='14.8937'
                          width='5.10638'
                          height='5.10638'
                          rx='2.55319'
                        ></rect>
                    </g>
                </svg>
            </li>
            <li className='column-4 active'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                >
                    <g clip-path='url(#clip0_1610_1453)'>
                        <rect width='3.64741' height='3.64741' rx='1.8237'></rect>
                        <rect
                          y='8.17627'
                          width='3.64741'
                          height='3.64741'
                          rx='1.8237'
                        ></rect>
                        <rect
                          y='16'
                          width='3.64741'
                          height='3.64741'
                          rx='1.8237'
                        ></rect>
                        <rect
                          x='5.31909'
                          width='3.64741'
                          height='3.64741'
                          rx='1.8237'
                        ></rect>
                        <rect
                          x='5.31909'
                          y='8.17627'
                          width='3.64741'
                          height='3.64741'
                          rx='1.8237'
                        ></rect>
                        <rect
                          x='5.31909'
                          y='16'
                          width='3.64741'
                          height='3.64741'
                          rx='1.8237'
                        ></rect>
                        <rect
                          x='10.6382'
                          width='3.64741'
                          height='3.64741'
                          rx='1.8237'
                        ></rect>
                        <rect
                          x='16.3525'
                          width='3.64741'
                          height='3.64741'
                          rx='1.8237'
                        ></rect>
                        <rect
                          x='10.6384'
                          y='8.17627'
                          width='3.64741'
                          height='3.64741'
                          rx='1.8237'
                        ></rect>
                        <rect
                          x='16.3525'
                          y='8.17627'
                          width='3.64741'
                          height='3.64741'
                          rx='1.8237'
                        ></rect>
                        <rect
                          x='10.6382'
                          y='16'
                          width='3.64741'
                          height='3.64741'
                          rx='1.8237'
                        ></rect>
                        <rect
                          x='16.3525'
                          y='16'
                          width='3.64741'
                          height='3.64741'
                          rx='1.8237'
                        ></rect>
                    </g>
                </svg>
            </li>
        </ul>
      </div>
    </div>
  );
};

export default Filter;
