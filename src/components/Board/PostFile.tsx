import FolderImage from '@/assets/images/ic_folder.svg';
import DownloadImage from '@/assets/images/ic_download.svg';
import CloseImage from '@/assets/images/ic_red_close.svg';
import * as S from '@/styles/board/PostFile.styled';

const sliceUnicode = (text: string, limit: number) =>
  Array.from(text).slice(0, limit).join('');

// isDownload가 true이면 다운로드 버튼 보이고 false이면 x 버튼 보여요!
// 파일 이름은 필수로 보내주셔야 합니다.
const PostFile = ({
  fileName = '',
  isDownload = true,
  onClick,
  isComment,
}: {
  fileName: string;
  isDownload?: boolean;
  onClick: () => void;
  isComment?: boolean;
}) => {
  const limit = isComment ? 27 : 40;

  const cuttedFileName =
    Array.from(fileName).length > limit
      ? `${sliceUnicode(fileName, limit)}...`
      : fileName;

  return (
    <S.Container>
      <S.FileContainer>
        <S.FolderIcon src={FolderImage} alt="파일 폴더 아이콘" />
        <S.FileName>{cuttedFileName}</S.FileName>
      </S.FileContainer>
      {isDownload ? (
        <S.RightIcon
          src={DownloadImage}
          alt="다운로드 아이콘"
          onClick={onClick}
        />
      ) : (
        <S.RightIcon src={CloseImage} alt="닫기 아이콘" onClick={onClick} />
      )}
    </S.Container>
  );
};

export default PostFile;
