import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import postBoardNotice from '@/api/postBoardNotice';
import { toastError, toastInfo } from '@/components/common/ToastMessage';
import useGetBoardDetail from '@/api/useGetBoardDetail';
import StudyWriteTemplate from '@/components/Board/StudyWriteTemplate';

interface originFile {
  fileId: number;
  fileName: string;
  fileUrl: string;
}

const PartEdit = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const url = new URL(window.location.href);
  const pathArray = url.pathname.split('/');
  const path = pathArray[1];
  const category = pathArray[2];
  const part = pathArray[3];

  const [selectedCardinal, setSelectedCardinal] = useState<number | null>(null);
  const [selectedStudy, setSelectedStudy] = useState<string | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
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
      navigate(`/board/${category}/${part}`);
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
    <StudyWriteTemplate
      category={category}
      headerTitle={`${part} 스터디`}
      selectedCardinal={selectedCardinal}
      setSelectedCardinal={setSelectedCardinal}
      selectedWeek={selectedWeek}
      setSelectedWeek={setSelectedWeek}
      selectedStudy={selectedStudy}
      setSelectedStudy={setSelectedStudy}
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

export default PartEdit;
