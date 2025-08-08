import { useState } from 'react';
import useGetBoardDetail from '@/api/useGetBoardDetail';
import CommentInput from '@/components/Board/CommentInput';
import PostCommentList from '@/components/Board/PostCommentList';
import PostDetailMain from '@/components/Board/PostDetailMain';
import Header from '@/components/Header/Header';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import useGetUserName from '@/hooks/useGetUserName';
import deletePost from '@/api/deletePost';
import MenuModal from '@/components/common/MenuModal';
import theme from '@/styles/theme';
import { toastInfo, toastError } from '@/components/common/ToastMessage';
import SelectModal from '@/components/Modal/SelectModal';
import Loading from '@/components/common/Loading';

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
  bottom: 10px;
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

const BoardDetail = () => {
  const { category, part, postId } = useParams<{
    category: string;
    part: string;
    postId: string;
  }>();

  // postId를 숫자로 변환
  const numericPostId = postId ? parseInt(postId, 10) : null;

  // postId가 유효하지 않으면 에러 처리
  if (!numericPostId) {
    return <div>잘못된 게시물 ID입니다.</div>;
  }

  const [refreshKey, setRefreshKey] = useState(0);

  // 대댓글 작성시 부모 댓글 ID 상태
  const [parentCommentId, setParentCommentId] = useState<number | null>(null);

  if (!part || !postId) {
    return <div>잘못된 경로입니다.</div>;
  }

  // refreshKey를 의존성으로 사용
  const { boardDetailInfo, error, loading } = useGetBoardDetail(
    part,
    numericPostId,
    refreshKey,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);

  // 대댓글 작성시 본댓글 하이라이팅
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
      await deletePost(numericPostId, part);
      navigate('/board', { replace: true });
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

  const getHeaderTitle = () => {
    if (category === 'study') {
      const studyMap: Record<string, string> = {
        ALL: '전체 스터디',
        PM: 'PM 스터디',
        FE: 'FE 스터디',
        BE: 'BE 스터디',
        D: 'D 스터디',
      };
      return studyMap[part] || '스터디 게시판';
    }

    if (category === 'article') {
      const articleMap: Record<string, string> = {
        ALL: '전체 아티클',
        PM: 'PM 아티클',
        FE: 'FE 아티클',
        BE: 'BE 아티클',
        D: 'D 아티클',
      };
      return articleMap[part] || '아티클 게시판';
    }

    if (category === 'education') {
      return '교육자료';
    }

    if (category === 'notices') {
      return '공지사항';
    }

    return '게시판';
  };

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
            onClick={() => {
              navigate(`/board/${postId}/edit`);
            }}
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
          {getHeaderTitle()}
        </Header>

        {boardDetailInfo && (
          <>
            <PostDetailMain info={boardDetailInfo} />
            <PostCommentList
              comments={boardDetailInfo.comments}
              postId={boardDetailInfo.id}
              path={part}
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

export default BoardDetail;
