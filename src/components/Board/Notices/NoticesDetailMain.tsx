import { useCallback, useState } from 'react';
import CommentImage from '@/assets/images/ic_comment_count.svg?react';
import * as S from '@/styles/board/PostDetail.styled';
import PostFile from '@/components/Board/PostFile';
import formatDateTime from '@/hooks/formatDateTime';
import setPositionIcon from '@/hooks/setPositionIcon';
import {
  toastSuccess,
  toastError,
  toastInfo,
} from '@/components/common/ToastMessage';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { MarkdownLink, CustomCheckbox } from '@/components/Board/MarkdownLink';
import deletePost from '@/api/deletePost';
import { useNavigate, useParams } from 'react-router-dom';
import useGetUserName from '@/hooks/useGetUserName';
import useGetBoardDetail from '@/api/useGetBoardDetail';
import MenuModal from '@/components/common/MenuModal';
import SelectModal from '@/components/Modal/SelectModal';

interface Comment {
  id: number;
  name: string;
  content: string;
  time: string;
  position: string;
  role: string;
}

interface FileUrl {
  fileId: number;
  fileName: string;
  fileUrl: string;
}

interface BoardDetail {
  id: number;
  name: string;
  title: string;
  time: string;
  content: string;
  position: string;
  role: string;
  commentCount: number;
  comments: Comment[];
  fileUrls: FileUrl[];
}

interface PostDetailMainProps {
  info: BoardDetail | null;
}

const NoticesDetailMain = ({ info }: PostDetailMainProps) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const { postId } = useParams();

  const url = new URL(window.location.href);
  const pathArray = url.pathname.split('/');
  const path = pathArray[2];
  const type = path === 'notices' ? 'notices' : 'board';

  const numericPostId = postId ? parseInt(postId, 10) : null;
  const { boardDetailInfo } = useGetBoardDetail(type, numericPostId ?? 0);
  const userName = useGetUserName();
  const isMyPost = boardDetailInfo?.name === userName;
  const formattedDate = formatDateTime(info?.time ?? '');

  const onClickDownload = useCallback((fileUrl: string, fileName: string) => {
    fetch(fileUrl, { method: 'GET' })
      .then((res) => res.blob())
      .then((blob) => {
        const url2 = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url2;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(url2);
          a.remove();
        }, 1000);
        toastSuccess('저장되었습니다');
      })
      .catch((err) => {
        toastError('저장에 실패했습니다');
        console.error('err', err);
      });
  }, []);

  if (!numericPostId) {
    return <div>잘못된 게시물 ID입니다.</div>;
  }

  const openSelectModal = () => {
    setIsSelectModalOpen(true);
  };

  const closeSelectModal = () => {
    setIsSelectModalOpen(false);
  };

  const confirmDelete = async () => {
    try {
      await deletePost(numericPostId, type);
      navigate('/board/notices', { replace: true });
      setTimeout(() => {
        toastInfo('게시물이 삭제되었습니다');
      }, 500);
    } catch (err) {
      toastError();
      console.error(err);
    }
    closeSelectModal();
  };

  if (!info) return <div>Loading...</div>;

  return (
    <>
      {isModalOpen && (
        <MenuModal
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
          <S.TextButton
            onClick={() => navigate(`/board/notices/${postId}/edit`)}
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

      <S.PostMainContainer>
        <S.PostContentContainer>
          <S.PostMainTitle>
            <S.TitleContainer>
              <S.PostMainTitleText>{info.title}</S.PostMainTitleText>
              {isMyPost && <S.KebabIcon onClick={() => setIsModalOpen(true)} />}
            </S.TitleContainer>
            <S.SmallText>
              <S.PositionIcon
                src={setPositionIcon(info.role, info.position)}
                alt="포지션 아이콘"
              />
              <div>{info.name}</div>
              <S.DateText>{formattedDate}</S.DateText>
            </S.SmallText>
          </S.PostMainTitle>
          <S.PostingContianer>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkBreaks, remarkGfm]}
              components={{
                a: MarkdownLink,
                input: CustomCheckbox,
              }}
            >
              {info.content || ''}
            </ReactMarkdown>
          </S.PostingContianer>
        </S.PostContentContainer>
        <S.PostBottomContent>
          <S.PostFileList>
            {info.fileUrls.map((file) => (
              <PostFile
                key={file.fileId}
                fileName={file.fileName}
                isDownload
                onClick={() => onClickDownload(file.fileUrl, file.fileName)}
              />
            ))}
          </S.PostFileList>
          <S.CommentText>
            <CommentImage />
            <div>{info.commentCount}</div>
          </S.CommentText>
        </S.PostBottomContent>
      </S.PostMainContainer>
    </>
  );
};

export default NoticesDetailMain;
