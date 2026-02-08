import styled from 'styled-components';
import CheckBox from '@/assets/images/ic_admin_checkbox.svg';
import UnCheckBox from '@/assets/images/ic_admin_uncheckbox.svg';
import MeatBallSvg from '@/assets/images/ic_admin_meatball.svg';
import { useState } from 'react';
import { getStatusColor } from '@/components/Admin/StatusIndicator';
import {
  MemberData,
  useMemberContext,
} from '@/components/Admin/context/MemberContext';
import { Column } from '@/components/Admin/MemberListTable';
import MemberDetailModal from '@/components/Admin/Modal/MemberDetailModal';
import typography from '@/theme/typography';

const Row = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.semantic.line};
`;

const Cell = styled.td`
  ${typography.admin.Body1};
  padding: 15px 20px;
  text-align: left;
  white-space: nowrap;
  border-bottom: 1px solid ${({ theme }) => theme.semantic.line};
  vertical-align: middle;
`;

export const StatusCell = styled.td<{ $statusColor: any }>`
  width: 2px;
  min-width: 2px;
  background-color: ${(props) => props.$statusColor(props)};
`;

export const SvgWrapper = styled.td`
  padding: 10px;
  text-align: center;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.semantic.line};

  img {
    height: auto;
    display: block;
  }
`;

interface TableRowProps {
  data: MemberData;
  columns: Column[];
}

const MemberListTableRow: React.FC<TableRowProps> = ({ data, columns }) => {
  const { selectedMembers, setSelectedMembers } = useMemberContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isChecked = selectedMembers.includes(data.id.toString());

  const onClickToCheckBox = () => {
    setSelectedMembers((prevSelected) => {
      const updatedSelected = isChecked
        ? prevSelected.filter((id) => id !== String(data.id))
        : [...prevSelected, String(data.id)];

      return updatedSelected;
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Row>
        <StatusCell $statusColor={getStatusColor(data.status)} />

        <SvgWrapper onClick={onClickToCheckBox}>
          <img
            src={isChecked ? CheckBox : UnCheckBox}
            alt={isChecked ? 'checked' : 'unchecked'}
          />
        </SvgWrapper>
        {columns.map((column) => (
          <Cell key={column.key}>{data[column.key]}</Cell>
        ))}

        <SvgWrapper onClick={openModal}>
          <img src={MeatBallSvg} alt="미트볼 메뉴" />
        </SvgWrapper>
      </Row>

      {isModalOpen && <MemberDetailModal data={data} onClose={closeModal} />}
    </>
  );
};

export default MemberListTableRow;
