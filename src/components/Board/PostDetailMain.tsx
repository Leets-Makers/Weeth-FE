import { useCallback } from 'react';
import CommentImage from '@/assets/images/ic_comment_count.svg?react';
import * as S from '@/styles/board/PostDetail.styled';
import PostFile from '@/components/Board/PostFile';
import formatDateTime from '@/hooks/formatDateTime';
import setPositionIcon from '@/hooks/setPositionIcon';
import { toastSuccess, toastError } from '@/components/common/ToastMessage';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { MarkdownLink, CustomCheckbox } from '@/components/Board/MarkdownLink';
import KebabButton from '@/assets/images/ic_board_detail_kebabButton.svg?react';

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

const PostDetailMain = ({ info }: PostDetailMainProps) => {
  const formattedDate = formatDateTime(info?.time ?? '');

  if (!info) return <div>Loading...</div>;

  const onClickDownload = useCallback((fileUrl: string, fileName: string) => {
    fetch(fileUrl, { method: 'GET' })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
          a.remove();
        }, 1000);
        toastSuccess('저장되었습니다');
      })
      .catch((err) => {
        toastError('저장에 실패했습니다');
        console.error('err', err);
      });
  }, []);

  return (
    <S.PostMainContainer>
      <S.PostContentContainer>
        <S.PostMainTitle>
          <S.TitleContainer>
            <S.PostMainTitleText>{info.title}</S.PostMainTitleText>
            <KebabButton />
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

export default PostDetailMain;
