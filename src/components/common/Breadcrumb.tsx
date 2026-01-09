import { useNavigate } from 'react-router-dom';
import BreadcrumArrowRightIcon from '@/assets/images/ic_breadcrum_arrow_right.svg?react';
import {
  BreadCrumContainer,
  CrumbButton,
  BreadcrumHomeIcon,
} from '@/styles/breadCrum';

export interface BreadcrumbItem {
  label: string;
  path?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  hasTitle?: boolean;
}

const Breadcrumb = ({ items, hasTitle = false }: BreadcrumbProps) => {
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate('/home');
  };

  const handleItemClick = (item: BreadcrumbItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <BreadCrumContainer $hasTitle={hasTitle}>
      <BreadcrumHomeIcon onClick={handleClickHome} />
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isClickable = !isLast && (item.path || item.onClick);

        return (
          <>
            <BreadcrumArrowRightIcon />
            {isClickable ? (
              <CrumbButton onClick={() => handleItemClick(item)}>
                {item.label}
              </CrumbButton>
            ) : (
              <span>{item.label}</span>
            )}
          </>
        );
      })}
    </BreadCrumContainer>
  );
};

export default Breadcrumb;
