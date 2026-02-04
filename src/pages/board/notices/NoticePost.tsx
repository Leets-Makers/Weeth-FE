import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import usePostBoard from '@/hooks/mutation/usePostBoard';
import { toastError, toastInfo } from '@/components/common/ToastMessage';
import NoticeWrite from '@/components/Board/NoticeWrite';
import Breadcrumb from '@/components/common/Breadcrumb';
import EditGNB from '@/components/Navigation/EditGNB';
import { PostContainerWrapper } from '@/styles/board/BoardPost.styled';

const NoticePost = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const url = new URL(window.location.href);
  const pathArray = url.pathname.split('/');
  const path = pathArray[2];

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const isTitleEmpty = title.trim() === '';
  const isContentEmpty = content.trim() === '';
  const numericPostId = postId ? parseInt(postId, 10) : 0;

  const postBoardMutation = usePostBoard({
    onSuccess: () => {
      navigate('/board/notices');
    },
    onError: (message) => {
      toastError(
        message ??
          (path === 'board'
            ? '게시글 작성 중 문제가 발생했습니다.'
            : '공지사항 작성 중 문제가 발생했습니다.'),
      );
    },
  });

  const handleClickButton = () => {
    if (isTitleEmpty) {
      toastInfo('제목을 입력해주세요.');
      return;
    }
    if (isContentEmpty) {
      toastInfo('내용을 입력해주세요.');
      return;
    }

    const postType = path === 'board' ? 'postBoard' : 'postNotice';

    if (title.length > 255) {
      toastError('제목을 255자 이내로 작성해주세요.');
      return;
    }

    if (content.length > 65000) {
      toastError('내용을 65,000자 이내로 작성해주세요.');
      return;
    }

    postBoardMutation.mutate({
      files,
      postData: {
        title,
        content,
        files: [],
      },
      postType,
      id: numericPostId,
    });
  };

  return (
    <>
      <EditGNB onClickButton={handleClickButton} />
      <PostContainerWrapper>
        <Breadcrumb
          items={[
            { label: '게시판', path: '/board' },
            { label: '공지사항', path: '/board/notices' },
            { label: '글쓰기' },
          ]}
        />
        <NoticeWrite
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          files={files}
          setFiles={setFiles}
        />
      </PostContainerWrapper>
    </>
  );
};

export default NoticePost;
