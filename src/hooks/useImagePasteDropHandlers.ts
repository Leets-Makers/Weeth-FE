import { ClipboardEvent, DragEvent } from 'react';
import { isImageUrlPath } from './useImageUpload';

export default function useImagePasteDropHandlers(opts: {
  onFiles: (files: File[]) => Promise<void> | void;
  onImageUrl: (url: string) => Promise<void> | void;
  onNonImage?: () => void;
}) {
  const onPaste = async (e: ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.items;
    const html = e.clipboardData?.getData('text/html') || '';
    const text = e.clipboardData?.getData('text/plain') || '';

    if (items?.length) {
      const files = Array.from(items)
        .filter((it) => it.kind === 'file')
        .map((it) => it.getAsFile())
        .filter(Boolean) as File[];
      if (files.length) {
        const images = files.filter((f) => f.type.startsWith('image/'));
        if (images.length) {
          e.preventDefault();
          await opts.onFiles(images);
          return;
        }
        opts.onNonImage?.();
        e.preventDefault();
        return;
      }
    }

    if (html) {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const img = doc.querySelector('img');
      const src = img?.getAttribute('src');
      if (src) {
        if (isImageUrlPath(src)) {
          e.preventDefault();
          await opts.onImageUrl(src);
          return;
        }
        opts.onNonImage?.();
        e.preventDefault();
        return;
      }
    }

    if (text && isImageUrlPath(text.trim())) {
      e.preventDefault();
      await opts.onImageUrl(text.trim());
    }
  };

  const onDrop = async (e: DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    if (e.dataTransfer?.files?.length) {
      const files = Array.from(e.dataTransfer.files);
      const images = files.filter((f) => f.type.startsWith('image/'));
      if (images.length) {
        await opts.onFiles(images);
      } else {
        opts.onNonImage?.();
      }
      return;
    }

    const uri =
      e.dataTransfer.getData('text/uri-list') ||
      e.dataTransfer.getData('text/plain');

    if (uri && isImageUrlPath(uri.trim())) {
      await opts.onImageUrl(uri.trim());
    } else if (uri) {
      opts.onNonImage?.();
    }
  };

  const onDragOver = (e: DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
  };

  return { onPaste, onDrop, onDragOver };
}
