import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import usePostBoard from '@/hooks/mutation/usePostBoard';
import useBoardDetail from '@/hooks/queries/board/useBoardDetail';
import {
  toastError,
  toastInfo,
  toastSuccess,
} from '@/components/common/ToastMessage';
import Breadcrumb from '@/components/common/Breadcrumb';
import NoticeWrite from '@/components/Board/NoticeWrite';
import { originFile } from '@/pages/board/part/PartEdit';
import EditGNB from '@/components/Navigation/EditGNB';
import * as S from '@/styles/board/BoardDetail.styled';
import { PostContainerWrapper } from '@/styles/board/BoardPost.styled';

const NoticeEdit = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const url = new URL(window.location.href);
  const pathArray = url.pathname.split('/');
  const path = pathArray[2];

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [originFiles, setOriginFiles] = useState<originFile[]>([]);

  const isTitleEmpty = title.trim() === '';
  const isContentEmpty = content.trim() === '';
  const numericPostId = postId ? parseInt(postId, 10) : 0;

  const { data: boardDetailInfo } = useBoardDetail(path, numericPostId);

  useEffect(() => {
    setTitle(boardDetailInfo?.title ?? '');
    setContent(boardDetailInfo?.content ?? '');
    setOriginFiles(boardDetailInfo?.fileUrls ?? []);
  }, [boardDetailInfo]);

  const postBoardMutation = usePostBoard({
    onSuccess: () => {
      toastSuccess('게시글이 수정되었습니다.');
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

    const postType = path === 'board' ? 'editBoard' : 'editNotice';

    if (title.length > 255) {
      toastError('제목을 255자 이내로 작성해주세요.');
      return;
    }

    if (content.length > 65000) {
      toastError('내용을 65,000자 이내로 작성해주세요.');
      return;
    }

    postBoardMutation.mutate({
      originFiles,
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
    <S.Container>
      <EditGNB onClickButton={handleClickButton} save />
      <PostContainerWrapper>
        <Breadcrumb
          items={[
            { label: '게시판', path: '/board' },
            { label: '공지사항', path: '/board/notices' },
            { label: '글쓰기 수정' },
          ]}
        />
        <NoticeWrite
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          files={files}
          setFiles={setFiles}
          originFiles={originFiles}
          setOriginFiles={setOriginFiles}
        />
      </PostContainerWrapper>
    </S.Container>
  );
};

export default NoticeEdit;
