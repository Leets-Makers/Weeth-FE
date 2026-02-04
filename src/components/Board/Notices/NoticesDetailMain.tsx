import { useCallback } from 'react';
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
import useDeletePost from '@/hooks/mutation/board/useDeletePost';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useCloseSelectModal,
  useOpenSelectModal,
} from '@/stores/selectModalStore';
import { useCloseMenuModal, useOpenMenuModal } from '@/stores/menuModalStore';
import useUserData from '@/hooks/queries/useUserData';

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
  const { data: userInfo } = useUserData();

  const { postId } = useParams();

  const url = new URL(window.location.href);
  const pathArray = url.pathname.split('/');
  const path = pathArray[2];
  const type = path === 'notices' ? 'notices' : 'board';

  const numericPostId = postId ? parseInt(postId, 10) : null;
  const isMyPost = info?.name === userInfo?.name;
  const formattedDate = formatDateTime(info?.time ?? '');

  const openSelectModal = useOpenSelectModal();
  const closeSelectModal = useCloseSelectModal();

  const openMenuModal = useOpenMenuModal();
  const closeMenuModal = useCloseMenuModal();

  const deletePostMutation = useDeletePost({
    onSuccess: () => {
      navigate('/board/notices', { replace: true });
      setTimeout(() => {
        toastInfo('게시물이 삭제되었습니다');
      }, 500);
      closeSelectModal();
    },
    onError: (message) => {
      toastError(message ?? '게시글 삭제에 실패했습니다.');
    },
  });

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

  const confirmDelete = () => {
    if (!numericPostId) return;
    deletePostMutation.mutate({ postId: numericPostId, path: type });
  };

  const handleSelectModal = () => {
    closeMenuModal();
    openSelectModal({
      title: '게시물 삭제',
      content: '이 게시물을 정말 삭제하시겠습니까?',
      onDelete: confirmDelete,
    });
  };

  if (!info) return <div>Loading...</div>;

  const handleMenu = () => {
    openMenuModal({
      topPadding: true,
      children: (
        <>
          <S.TextButton
            onClick={() => {
              navigate(`/board/notices/${postId}/edit`);
              closeMenuModal();
            }}
          >
            수정
          </S.TextButton>
          <S.TextButton $isLast onClick={handleSelectModal}>
            삭제
          </S.TextButton>
        </>
      ),
    });
  };

  return (
    <S.PostMainContainer>
      <S.PostContentContainer>
        <S.PostMainTitle>
          <S.TitleContainer>
            <S.PostMainTitleText>{info.title}</S.PostMainTitleText>
            {isMyPost && <S.KebabIcon onClick={handleMenu} />}
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
  );
};

export default NoticesDetailMain;
