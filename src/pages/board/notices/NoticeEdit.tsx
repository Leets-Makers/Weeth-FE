import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import postBoardNotice from '@/api/postBoardNotice';
import {
  toastError,
  toastInfo,
  toastSuccess,
} from '@/components/common/ToastMessage';
import { BreadCrumContainer, CrumbButton } from '@/styles/breadCrum';
import BreadcrumHomeIcon from '@/assets/images/ic_breadcrum_home.svg?react';
import BreadcrumArrowRightIcon from '@/assets/images/ic_breadcrum_arrow_right.svg?react';
import NoticeWrite from '@/components/Board/NoticeWrite';
import useGetBoardDetail from '@/api/useGetBoardDetail';
import { originFile } from '@/pages/board/part/PartEdit';
import EditGNB from '@/components/Navigation/EditGNB';

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

  const { boardDetailInfo } = useGetBoardDetail(path, numericPostId);

  useEffect(() => {
    setTitle(boardDetailInfo?.title ?? '');
    setContent(boardDetailInfo?.content ?? '');
    setOriginFiles(boardDetailInfo?.fileUrls ?? []);
  }, [boardDetailInfo]);

  const handleClickButton = async () => {
    if (isTitleEmpty) {
      toastInfo('제목을 입력해주세요.');
      return;
    }
    if (isContentEmpty) {
      toastInfo('내용을 입력해주세요.');
      return;
    }

    try {
      const postType = path === 'board' ? 'editBoard' : 'editNotice';

      if (title.length > 255) {
        toastError('제목을 255자 이내로 작성해주세요.');
        return;
      }

      if (content.length > 65000) {
        toastError('내용을 65,000자 이내로 작성해주세요.');
        return;
      }

      await postBoardNotice({
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
      toastSuccess('게시글이 수정되었습니다.');
      navigate('/board/notices');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      toastError(
        path === 'board'
          ? '게시글 작성 중 문제가 발생했습니다.'
          : '공지사항 작성 중 문제가 발생했습니다.',
      );
    }
  };
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
      <EditGNB onClickButton={handleClickButton} save />
      <BreadCrumContainer>
        <BreadcrumHomeIcon onClick={handleClickHome} />
        <BreadcrumArrowRightIcon />
        <CrumbButton onClick={handleClickBoard}>게시판</CrumbButton>
        <BreadcrumArrowRightIcon />
        <CrumbButton onClick={handleClickPart}>공지사항</CrumbButton>
        <BreadcrumArrowRightIcon />
        글쓰기 수정
      </BreadCrumContainer>
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
    </>
  );
};

export default NoticeEdit;
