import { useState } from 'react';
import useGetBoardDetail from '@/api/useGetBoardDetail';
import CommentInput from '@/components/Board/CommentInput';
import PostCommentList from '@/components/Board/PostCommentList';
import PostDetailMain from '@/components/Board/PostDetailMain';
import Header from '@/components/Header/Header';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import useGetUserName from '@/hooks/useGetUserName';
import MenuModal from '@/components/common/MenuModal';
import theme from '@/styles/theme';
import deletePost from '@/api/deletePost';
import { toastError, toastInfo } from '@/components/common/ToastMessage';
import SelectModal from '@/components/Modal/SelectModal';
import Loading from '@/components/common/Loading';
import useCustomBack from '@/hooks/useCustomBack';
import getHeaderTitle from '@/utils/getHeaderTitle';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 370px;
  margin: 0 auto;
  padding-bottom: 60px;
`;

const CommentInputContainer = styled.div`
  position: fixed;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 370px;
  z-index: 10;
  padding: 10px;
  display: flex;
  justify-content: center;
`;

const TextButton = styled.div<{ $isLast?: boolean }>`
  width: calc(100% - 8px);
  box-sizing: border-box;
  padding: 12px 0 12px 16px;
  margin: 0 4px;
  border-bottom: ${(props) =>
    props.$isLast ? 'none' : `1px solid ${theme.color.gray[30]}`};
  color: ${(props) => (props.$isLast ? theme.color.negative : 'white')};
`;

const PartDetail = () => {
  const { postId } = useParams();
  const url = new URL(window.location.href);
  const pathArray = url.pathname.split('/');
  const path = pathArray[1];
  const category = pathArray[2];
  const part = pathArray[3];

  useCustomBack(`/board/${category}/${part}`);

  const type = path === 'notices' ? 'notices' : 'board';

  const numericPostId = postId ? parseInt(postId, 10) : null;

  if (!numericPostId) {
    return <div>잘못된 게시물 ID입니다.</div>;
  }

  const [refreshKey, setRefreshKey] = useState(0);
  const [parentCommentId, setParentCommentId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);

  const { boardDetailInfo, error, loading } = useGetBoardDetail(
    type,
    numericPostId,
    refreshKey,
  );

  const [selectedComment, setSelectedComment] = useState<
    Record<number, boolean>
  >({});

  const navigate = useNavigate();

  const openSelectModal = () => {
    setIsSelectModalOpen(true);
  };

  const closeSelectModal = () => {
    setIsSelectModalOpen(false);
  };

  const confirmDelete = async () => {
    try {
      await deletePost(numericPostId, type);
      navigate(`/board/${category}/${part}`, { replace: true });
      setTimeout(() => {
        toastInfo('게시물이 삭제되었습니다');
      }, 500);
    } catch (err) {
      toastError();
      console.error(err);
    }
    closeSelectModal();
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    setParentCommentId(null);
  };

  const handleCommentSuccess = () => {
    setTimeout(() => {
      setParentCommentId(null);
      setSelectedComment({});
    }, 200);
    handleRefresh();
  };

  const handleReply = (commentId: number) => {
    setParentCommentId(commentId);
    setSelectedComment((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const isMyPost = boardDetailInfo?.name === useGetUserName();

  if (error) return <div>오류: {error}</div>;
  if (loading) return <Loading />;

  return (
    <>
      {isModalOpen && (
        <MenuModal
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
          <TextButton
            onClick={() =>
              navigate(`/board/${category}/${part}/${postId}/edit`)
            }
          >
            수정
          </TextButton>
          <TextButton $isLast onClick={openSelectModal}>
            삭제
          </TextButton>
        </MenuModal>
      )}
      {isSelectModalOpen && (
        <SelectModal
          title="게시물 삭제"
          content="이 게시물을 정말 삭제하시겠습니까?"
          onClose={closeSelectModal}
          onDelete={confirmDelete}
        />
      )}

      <Container>
        <Header
          RightButtonType="MENU"
          isAccessible={isMyPost}
          onClickRightButton={() => {
            setIsModalOpen(true);
          }}
        >
          {getHeaderTitle(category, part)}
        </Header>

        {boardDetailInfo && (
          <>
            <PostDetailMain info={boardDetailInfo} />
            <PostCommentList
              comments={boardDetailInfo.comments}
              postId={boardDetailInfo.id}
              path={type}
              onCommentDelete={handleRefresh}
              onReply={handleReply}
              selectedComment={selectedComment}
            />
          </>
        )}
      </Container>
      <CommentInputContainer>
        {boardDetailInfo && (
          <CommentInput
            postId={boardDetailInfo.id}
            initialParentCommentId={parentCommentId}
            onCommentSuccess={handleCommentSuccess}
          />
        )}
      </CommentInputContainer>
    </>
  );
};

export default PartDetail;
