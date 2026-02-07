import { styled } from 'styled-components';
import theme from '@/styles/theme';
import positionMapper from '@/utils/admin/positionMapper';
import { units } from '@/theme/designTokens';
import typography from '@/theme/typography';

export const DropdownContainer = styled.div`
  position: absolute;
  top: 90%;
  left: 2%;
  width: 100%;
  max-height: 324px;
  overflow-y: auto;
  z-index: 1000;
  border-radius: ${units.radius.lg}px;
  box-shadow: 0px 10px 30px 0px rgba(17, 33, 49, 0.3);
`;

const NoResult = styled.span`
  ${typography.admin.Body1}
  color: ${theme.color.gray[65]};
  text-align: center;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
`;

const DropdownItem = styled.div<{ noResult?: boolean }>`
  background-color: ${({ theme }) => theme.semantic.container.neutral};
  padding: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr 70px 0.5fr;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.semantic.line};
  ${({ noResult, theme }) =>
    noResult
      ? `
    cursor: default;
    &:hover {
      background-color: ${theme.semantic.container['neutral-interaction']};
    }
  `
      : `
  cursor: pointer;
  &:hover {
    background-color: ${theme.semantic.container['neutral-interaction']};
  }
`}
`;

const DropdownText = styled.span`
  ${typography.admin.Body1}
  min-width: 100px;
`;

interface Member {
  id: number;
  name: string;
  cardinals: number[];
  position: string;
  department: string;
}

interface DropdownProps {
  members: Member[];
  onSelect: (name: string) => void;
}

const PenaltyMemberDropdown: React.FC<DropdownProps> = ({
  members,
  onSelect,
}) => {
  return (
    <DropdownContainer onMouseDown={(e) => e.preventDefault()}>
      {members.length === 0 ? (
        <DropdownItem noResult>
          <NoResult>검색된 멤버가 없습니다.</NoResult>
        </DropdownItem>
      ) : (
        members.map((member) => (
          <DropdownItem key={member.id} onClick={() => onSelect(member.name)}>
            <DropdownText>{member.name}</DropdownText>
            <DropdownText>{positionMapper(member.position)}</DropdownText>
            <DropdownText>{member.department}</DropdownText>
          </DropdownItem>
        ))
      )}
    </DropdownContainer>
  );
};

export default PenaltyMemberDropdown;
