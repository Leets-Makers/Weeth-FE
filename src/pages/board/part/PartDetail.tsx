import { useState } from 'react';
import useBoardDetail from '@/hooks/queries/board/useBoardDetail';
import CommentInput from '@/components/Board/CommentInput';
import PostCommentList from '@/components/Board/PostCommentList';
import PostDetailMain from '@/components/Board/PostDetailMain';
import { useParams } from 'react-router-dom';
import Loading from '@/components/common/Loading';
import * as S from '@/styles/board/BoardDetail.styled';
import useSmartLoading from '@/hooks/useSmartLoading';
import Breadcrumb from '@/components/common/Breadcrumb';
import { BreadcrumbPadding } from '@/styles/breadCrum';

const PartDetail = () => {
  const { category, part, postId } = useParams<{
    category: string;
    part: string;
    postId: string;
  }>();
  const url = new URL(window.location.href);
  const pathArray = url.pathname.split('/');
  const path = pathArray[1];

  const type = path === 'notices' ? 'notices' : 'board';
  const commentType = 'board';

  const numericPostId = postId ? parseInt(postId, 10) : null;

  if (!numericPostId) {
    return <div>잘못된 게시물 ID입니다.</div>;
  }

  const [parentCommentId, setParentCommentId] = useState<number | null>(null);

  const [files, setFiles] = useState<File[]>([]);

  const {
    data: boardDetailInfo,
    error,
    isLoading: loading,
  } = useBoardDetail(type, numericPostId);

  const [selectedComment, setSelectedComment] = useState<
    Record<number, boolean>
  >({});

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

  const { loading: smartLoading } = useSmartLoading(
    new Promise<void>((resolve) => {
      if (!loading) resolve();
    }),
  );

  if (error) return <div>오류: {error.message}</div>;
  if (smartLoading) return <Loading />;

  if (!category || !part || !postId) {
    return <div>잘못된 경로입니다.</div>;
  }

  return (
    <>
      <S.Container>
        <BreadcrumbPadding>
          <Breadcrumb
            items={[
              { label: '게시판', path: '/board' },
              {
                label: `${part} 파트게시판`,
                path: `/board/${category}/${part}`,
              },
              { label: '게시판상세' },
            ]}
            hasTitle
          />
        </BreadcrumbPadding>
        {boardDetailInfo && (
          <>
            <PostDetailMain info={boardDetailInfo} />
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

export default PartDetail;
