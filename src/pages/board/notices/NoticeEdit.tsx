import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import postBoardNotice from '@/api/postBoardNotice';
import { toastError, toastInfo } from '@/components/common/ToastMessage';
import NoticeWrite from '@/components/Board/NoticeWrite';
import useGetBoardDetail from '@/api/useGetBoardDetail';

interface originFile {
  fileId: number;
  fileName: string;
  fileUrl: string;
}

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

  //   const handleDeleteFile = (fileName: string) => {
  //     setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  //   };

  //   const handleDeleteOriginFile = (fileName: string) => {
  //     setOriginFiles((prevFiles) =>
  //       prevFiles.filter((file) => file.fileName !== fileName),
  //     );
  //   };

  const { boardDetailInfo } = useGetBoardDetail(path, numericPostId);

  useEffect(() => {
    setTitle(boardDetailInfo?.title ?? '');
    setContent(boardDetailInfo?.content ?? '');
    setOriginFiles(boardDetailInfo?.fileUrls ?? []);
  }, [boardDetailInfo]);

  const onSave = async () => {
    if (isTitleEmpty) {
      toastInfo('제목을 입력해주세요.');
      return;
    }
    if (isContentEmpty) {
      toastInfo('내용을 입력해주세요.');
      return;
    }

    try {
      // 요청 타입 결정
      const postType = path === 'board' ? 'editBoard' : 'editNotice';

      if (title.length > 255) {
        toastError('제목을 255자 이내로 작성해주세요.');
        return;
      }

      if (content.length > 65000) {
        toastError('내용을 65,000자 이내로 작성해주세요.');
        return;
      }

      // 서버 요청
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

      // 게시글 수정 후 이동
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

  return (
    <NoticeWrite
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
      files={files}
      setFiles={setFiles}
      onSave={onSave}
    />
  );
};

export default NoticeEdit;
