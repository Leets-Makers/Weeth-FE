import { useState } from 'react';
import useGetBoardDetail from '@/api/useGetBoardDetail';
import CommentInput from '@/components/Board/CommentInput';
import PostCommentList from '@/components/Board/PostCommentList';
import PostDetailMain from '@/components/Board/PostDetailMain';
import Header from '@/components/Header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import useGetUserName from '@/hooks/useGetUserName';
import MenuModal from '@/components/common/MenuModal';
import deletePost from '@/api/deletePost';
import { toastError, toastInfo } from '@/components/common/ToastMessage';
import SelectModal from '@/components/Modal/SelectModal';
import Loading from '@/components/common/Loading';
import useCustomBack from '@/hooks/useCustomBack';
import getHeaderTitle from '@/utils/getHeaderTitle';
import * as S from '@/styles/board/BoardDetail.styled';

const PartDetail = () => {
  const { category, part, postId } = useParams<{
    category: string;
    part: string;
    postId: string;
  }>();
  const url = new URL(window.location.href);
  const pathArray = url.pathname.split('/');
  const path = pathArray[1];

  useCustomBack(`/board/${category}/${part}`);

  const type = path === 'notices' ? 'notices' : 'board';
  const commentType = 'board';

  const numericPostId = postId ? parseInt(postId, 10) : null;

  if (!numericPostId) {
    return <div>잘못된 게시물 ID입니다.</div>;
  }

  const [refreshKey, setRefreshKey] = useState(0);
  const [parentCommentId, setParentCommentId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);

  const [files, setFiles] = useState<File[]>([]);

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

  if (!category || !part || !postId) {
    return <div>잘못된 경로입니다.</div>;
  }

  return (
    <>
      {isModalOpen && (
        <MenuModal
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
          <S.TextButton
            onClick={() =>
              navigate(`/board/${category}/${part}/${postId}/edit`)
            }
          >
            수정
          </S.TextButton>
          <S.TextButton $isLast onClick={openSelectModal}>
            삭제
          </S.TextButton>
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

      <S.Container>
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
              path={commentType}
              onCommentDelete={handleRefresh}
              onReply={handleReply}
              selectedComment={selectedComment}
            />
          </>
        )}
      </S.Container>
      <S.CommentInputContainer>
        {boardDetailInfo && (
          <CommentInput
            postId={boardDetailInfo.id}
            initialParentCommentId={parentCommentId}
            onCommentSuccess={handleCommentSuccess}
            files={files}
            setFiles={setFiles}
          />
        )}
      </S.CommentInputContainer>
    </>
  );
};

export default PartDetail;
