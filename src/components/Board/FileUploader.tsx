import React, { useRef } from 'react';
import styled from 'styled-components';
import AddFile from '@/assets/images/ic_add_folder.svg?react';
import CommentFile from '@/assets/images/ic_comment_file.svg?react';

export const FileButton = styled.img`
  cursor: pointer;
  margin-bottom: 1.25rem;
`;

const FileUploader = ({
  files,
  setFiles,
  isComment,
}: {
  files: File[];
  setFiles: (value: File[]) => void;
  isComment?: boolean;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      setFiles([...files, ...Array.from(selectedFiles)]);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      {isComment ? (
        <CommentFile onClick={handleClick} />
      ) : (
        <AddFile onClick={handleClick} />
      )}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        multiple
      />
    </>
  );
};

export default FileUploader;
