import { useState } from 'react';
import useBoardDetail from '@/hooks/queries/board/useBoardDetail';
import CommentInput from '@/components/Board/CommentInput';
import PostCommentList from '@/components/Board/PostCommentList';
import { useParams } from 'react-router-dom';
import Loading from '@/components/common/Loading';
import * as S from '@/styles/board/BoardDetail.styled';
import useSmartLoading from '@/hooks/useSmartLoading';
import Breadcrumb from '@/components/common/Breadcrumb';
import NoticesDetailMain from '@/components/Board/Notices/NoticesDetailMain';
import { BreadcrumbPadding } from '@/styles/breadCrum';

const NoticePostDetail = () => {
  const { postId } = useParams();
  const url = new URL(window.location.href);
  const pathArray = url.pathname.split('/');
  const path = pathArray[2];
  const type = path === 'notices' ? 'notices' : 'board';
  const commentType = 'notices';

  const numericPostId = postId ? parseInt(postId, 10) : null;

  const [parentCommentId, setParentCommentId] = useState<number | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const {
    data: boardDetailInfo,
    error,
    isLoading: loading,
  } = useBoardDetail(type, numericPostId ?? 0);

  const [selectedComment, setSelectedComment] = useState<
    Record<number, boolean>
  >({});

  const { loading: smartLoading } = useSmartLoading(
    new Promise<void>((resolve) => {
      if (!loading) resolve();
    }),
  );

  if (!numericPostId) {
    return <div>잘못된 게시물 ID입니다.</div>;
  }

  const handleCommentDelete = () => {
    setParentCommentId(null);
  };

  const handleCommentSuccess = () => {
    setParentCommentId(null);
    setSelectedComment({});
  };

  const handleReply = (commentId: number) => {
    setParentCommentId(commentId);
    setSelectedComment((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  if (error) return <div>오류: {error.message}</div>;
  if (smartLoading) return <Loading />;

  return (
    <>
      <S.Container>
        <BreadcrumbPadding>
          <Breadcrumb
            items={[
              { label: '게시판', path: '/board' },
              { label: '공지사항', path: '/board/notices' },
              { label: '공지상세' },
            ]}
            hasTitle
          />
        </BreadcrumbPadding>
        {boardDetailInfo && (
          <>
            <NoticesDetailMain info={boardDetailInfo} />
            <PostCommentList
              comments={boardDetailInfo.comments}
              postId={boardDetailInfo.id}
              path={commentType}
              onCommentDelete={handleCommentDelete}
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
            boardPath={commentType as 'board' | 'notices'}
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
