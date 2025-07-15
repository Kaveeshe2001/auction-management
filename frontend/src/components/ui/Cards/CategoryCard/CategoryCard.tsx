import './categorycard.css';

type Category = {
  id: number;
  categoryName: string;
  image: string;
  icon: string;
};
type Props = {
  category: Category;
};

const CategoryCard = ({ category }: Props) => {
    const { categoryName, image, icon } = category;

    return (
        <div className='category-card4 two'>
            <div className='icon'>
                <img src={icon} alt={categoryName} />
            </div>
            <div className='content'>
                <h5>
                    <a href='/art-auction/auction-sidebar'>{categoryName}</a>
                </h5>
                <span>45, 533 Item</span>
            </div>
            <div className='category-img'>
                <img src={image} alt={categoryName} />
            </div>
        </div>
    );
};

export default CategoryCard;