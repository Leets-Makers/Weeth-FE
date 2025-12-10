import { useState } from 'react';
import useGetBoardDetail from '@/api/useGetBoardDetail';
import CommentInput from '@/components/Board/CommentInput';
import PostCommentList from '@/components/Board/PostCommentList';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '@/components/common/Loading';
import * as S from '@/styles/board/BoardDetail.styled';
import useSmartLoading from '@/hooks/useSmartLoading';
import { BreadCrumContainer, CrumbButton } from '@/styles/breadCrum';
import BreadcrumHomeIcon from '@/assets/images/ic_breadcrum_home.svg?react';
import BreadcrumArrowRightIcon from '@/assets/images/ic_breadcrum_arrow_right.svg?react';
import NoticesDetailMain from '@/components/Board/Notices/NoticesDetailMain';

const NoticePostDetail = () => {
  const { postId } = useParams();
  const url = new URL(window.location.href);
  const pathArray = url.pathname.split('/');
  const path = pathArray[2];
  const type = path === 'notices' ? 'notices' : 'board';
  const commentType = 'notices';

  const numericPostId = postId ? parseInt(postId, 10) : null;

  const [refreshKey, setRefreshKey] = useState(0);
  const [parentCommentId, setParentCommentId] = useState<number | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const { boardDetailInfo, error, loading } = useGetBoardDetail(
    type,
    numericPostId!,
    refreshKey,
  );

  const [selectedComment, setSelectedComment] = useState<
    Record<number, boolean>
  >({});

  const navigate = useNavigate();

  const { loading: smartLoading } = useSmartLoading(
    new Promise<void>((resolve) => {
      if (!loading) resolve();
    }),
  );

  if (!numericPostId) {
    return <div>잘못된 게시물 ID입니다.</div>;
  }

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    setParentCommentId(null);
  };

  const handleCommentSuccess = () => {
    setParentCommentId(null);
    setSelectedComment({});
    handleRefresh();
  };

  const handleReply = (commentId: number) => {
    setParentCommentId(commentId);
    setSelectedComment((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  if (error) return <div>오류: {error}</div>;
  if (smartLoading) return <Loading />;

  const handleClickHome = () => {
    navigate('/home');
  };
  const handleClickBoard = () => {
    navigate('/board');
  };
  const handleClickPart = () => {
    navigate(`/board/notices`);
  };

  return (
    <>
      <S.Container>
        <BreadCrumContainer>
          <BreadcrumHomeIcon onClick={handleClickHome} />
          <BreadcrumArrowRightIcon />
          <CrumbButton onClick={handleClickBoard}>게시판</CrumbButton>
          <BreadcrumArrowRightIcon />
          <CrumbButton onClick={handleClickPart}>공지사항</CrumbButton>
          <BreadcrumArrowRightIcon />
          공지상세
        </BreadCrumContainer>
        {boardDetailInfo && (
          <>
            <NoticesDetailMain info={boardDetailInfo} />
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

export default NoticePostDetail;
