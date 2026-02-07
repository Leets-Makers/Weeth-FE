import { useState } from 'react';
import styled from 'styled-components';
import SortIcon from '@/assets/images/ic_admin_change.svg';
import { useMemberContext } from '@/components/Admin/context/MemberContext';
import { units } from '@/theme/designTokens';
import typography from '@/theme/typography';

const SortButtonWrapper = styled.div`
  ${typography.admin.Button2};
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.semantic.button.neutral};
  gap: 10px;
  padding: 7px;
  border-radius: ${units.radius.sm}px;
  cursor: pointer;
`;
const SortButton: React.FC = () => {
  const [isAscending, setIsAscending] = useState(false);
  const { sortingOrder, setSortingOrder } = useMemberContext();

  const onClickSort = () => {
    setIsAscending(!isAscending);
    setSortingOrder(isAscending ? 'CARDINAL_DESCENDING' : 'NAME_ASCENDING');
  };
  return (
    <SortButtonWrapper onClick={onClickSort}>
      {sortingOrder === 'NAME_ASCENDING' ? '이름순' : '기수순'}
      <img src={SortIcon} alt="sorting" />
    </SortButtonWrapper>
  );
};

export default SortButton;
