import { toastError, toastSuccess } from '@/components/common/ToastMessage';

type GetFileUrlFn = (
  names: string[],
  files: File[],
) => Promise<Array<{ fileName: string; putUrl: string }>>;

const toSafeName = (f: File) => `${Date.now()}-${f.name}`.replace(/\s+/g, '-');
const toViewUrlFromPut = (putUrl: string) => putUrl.split('?')[0];
const isHttpUrl = (t: string) => /^https?:\/\//i.test(t);
export const isImageUrlPath = (t: string) =>
  /\.(png|jpe?g|gif|webp|bmp|svg)(\?.*)?$/i.test(t);

export async function urlToFile(url: string) {
  const res = await fetch(url, { mode: 'cors' });
  if (!res.ok) throw new Error('이미지 URL fetch 실패');
  const blob = await res.blob();
  const ct = blob.type || 'image/png';
  const ext = (ct.split('/')[1] || 'png').replace('+xml', '');
  const name = `${Date.now()}.${ext}`;
  return new File([blob], name, { type: ct });
}

export default function useImageUpload(
  getFileUrl: GetFileUrlFn,
  insertAtCursor: (md: string) => void,
) {
  const uploadFilesAndInsert = async (files: File[]) => {
    if (!files.length) {
      toastError('이미지 파일만 업로드 가능합니다.');
      return;
    }
    const images = files.filter((f) => f.type.startsWith('image/'));
    if (!images.length) {
      toastError('이미지 파일만 업로드 가능합니다.');
      return;
    }

    try {
      const names = images.map(toSafeName);
      const presigned = await getFileUrl(names, images);
      const urls = presigned
        .map((p) => p?.putUrl)
        .filter(Boolean)
        .map(toViewUrlFromPut);

      if (urls.length !== images.length) {
        toastError('이미지 URL 생성에 실패했어요.');
        return;
      }

      const md = urls.map((u, i) => `\n![${images[i].name}](${u})\n`).join('');
      insertAtCursor(md);
      toastSuccess('이미지 업로드 완료');
    } catch (e) {
      console.error(e);
      toastError('이미지 업로드 실패');
    }
  };

  const uploadImageUrlAndInsert = async (url: string) => {
    if (!isHttpUrl(url) || !isImageUrlPath(url)) {
      toastError('지원하지 않는 이미지 URL입니다.');
      return;
    }
    try {
      const f = await urlToFile(url);
      await uploadFilesAndInsert([f]);
    } catch (e) {
      console.error(e);
      toastError('이미지 URL을 불러오지 못했어요.');
    }
  };

  return { uploadFilesAndInsert, uploadImageUrlAndInsert };
}
