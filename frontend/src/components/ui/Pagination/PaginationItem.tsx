import './pagination.css';

type Props = {
    children: React.ReactNode;
    active: number;
    handleClick: React.MouseEventHandler<HTMLButtonElement>;
};

const PaginationItem = ({ active, handleClick, children }: Props) => {
  return (
    <li className={`page-item ${active && 'active'}`}>
        <button onClick={handleClick}>{children}</button>
    </li>
  );
};

export default PaginationItem;
