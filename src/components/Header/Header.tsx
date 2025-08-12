/* eslint-disable react/require-default-props */
/*

<        헤더       완료
left    title     right

필수 props는 RightButtonType 하나입니다.
그 외 props는 필요에 따라 전달하여 사용하시면 됩니다.

헤더 컴포넌트의 부모컴포넌트에 width: 370px 설정이 있어야 정렬이 됩니다.
헤더에 작성될 내용은 children으로 전달해주시면 됩니다
ex) <Header>공지사항</Header>

onClickRightButton: right 버튼이 클릭되었을 때 사용할 함수
                    🚨right버튼이 있는 경우에는 필수로 전달해야하는 값입니다.
                      해당 값이 없을 경우 버튼이 렌더링되지 않습니다.

                    🚨right버튼이 없는 경우도 있기 때문에 필수 props가 아닙니다
                      값이 필요한 경우에도 전달되지 않았을 때 에러가 발생하지 않으므로
                      ⚠️right버튼 사용시 전달여부를 꼭 확인해주세요⚠️
isComplete: right 버튼이 페이지 내의 입력 여부에 대한 boolean 타입의 state값으로 전달해주시면 됩니다.
            모든 값이 입력되었을 때 텍스트 색상을 mainColor를 바꾸기 위한 값입니다.
isAccessible: 접근 가능 여부에 대한 값을 전달해주시면 됩니다. ex) 어드민, 게시글/댓글 작성자
              🚨 특별한 권한 확인이 필요 없는 상황에도 true값을 전달해주시길 바랍니다.
isCalendar: 캘린더에서 사용되는 헤더이면 true, 그 외의 페이지에서는 모두 false
            default값이 false이므로, false인 경우엔 값을 전달하지 않아도 됩니다.

RightButton이 사용되지 않을 경우, 'none'으로 지정해주시면 됩니다.

RightButtonType
TEXT : 텍스트타입의 버튼입니다. 현재(2024.11.22)는 '완료'로만 사용되고 있습니다.
MENU : 점 세개(⋮) 버튼입니다.
PLUS : 캘린더에서 사용되는 +버튼입니다.
EDIT : 마이페이지에서 사용되는 연필버튼입니다.
WRITING: 게시판에서 글 작성 시 시용되는 글쓰기 버튼입니다.

*/

import theme from '@/styles/theme';
import styled from 'styled-components';
import TextButton from '@/components/Header/TextButton';
import LeftButton from '@/components/Header/LeftButton';
import MenuButton from '@/components/Header/MenuButton';
import PlusButton from '@/components/Header/PlusButton';
import SearchButton from '@/components/Header/SearchButton';
import WritingButton from '@/components/Header/WritingButton';
import PostButton from '@/components/Header/PostButton';
import useGetUserInfo from '@/api/useGetGlobaluserInfo';
// import EditButton from '@/components/Header/EditButton';

interface HeaderProps {
  children?: React.ReactNode;
  onClickRightButton?: () => void;
  RightButtonType:
    | 'TEXT'
    | 'MENU'
    | 'PLUS'
    | 'EDIT'
    | 'SEARCH'
    | 'WRITING'
    | 'POST'
    | 'ADMINWRITING'
    | 'none';
  isComplete?: boolean;
  isAccessible: boolean;
  isWaiting?: boolean;
}

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 370px;
  padding: 25px 25px 10px 20px;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: 18px;
  font-family: ${theme.font.semiBold};
`;

const None = styled.div`
  width: 24px;
`;

const Header = ({
  children,
  onClickRightButton,
  RightButtonType,
  isComplete = true,
  isAccessible = false,
  isWaiting = false,
}: HeaderProps) => {
  const { isAdmin } = useGetUserInfo();

  return (
    <HeaderWrapper>
      <LeftButton isWaiting={isWaiting} />
      <Title>{children}</Title>

      {RightButtonType === 'TEXT' && onClickRightButton && (
        <TextButton
          onClick={onClickRightButton}
          text="완료"
          isComplete={isComplete}
        />
      )}

      {RightButtonType === 'WRITING' && onClickRightButton && (
        <WritingButton onClick={onClickRightButton} text="글쓰기" />
      )}

      {isAdmin &&
        RightButtonType === 'ADMINWRITING' &&
        onClickRightButton &&
        isAccessible && (
          <PostButton onClick={onClickRightButton} text="게시하기" />
        )}

      {RightButtonType === 'POST' && onClickRightButton && isAccessible && (
        <PostButton onClick={onClickRightButton} text="게시하기" />
      )}

      {RightButtonType === 'MENU' && onClickRightButton && isAccessible && (
        <MenuButton onClick={onClickRightButton} />
      )}

      {RightButtonType === 'PLUS' && isAccessible && <PlusButton />}

      {/* {RightButtonType === 'EDIT' && onClickRightButton && (
        <EditButton onClick={onClickRightButton} />
      )} */}

      {RightButtonType === 'SEARCH' && onClickRightButton && isAccessible && (
        <SearchButton onClick={onClickRightButton} />
      )}

      {RightButtonType !== 'none' && !isAccessible && <None />}
      {RightButtonType === 'none' && <None />}
    </HeaderWrapper>
  );
};

export default Header;
