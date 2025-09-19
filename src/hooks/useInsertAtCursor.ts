import { RefObject } from 'react';

export default function useInsertAtCursor(
  textareaRef: RefObject<HTMLTextAreaElement>,
  value: string,
  onChange: (v: string) => void,
) {
  const insertAtCursor = (text: string) => {
    const el = textareaRef.current;
    if (!el) {
      onChange(value + text);
      return;
    }
    const start = el.selectionStart ?? value.length;
    const end = el.selectionEnd ?? value.length;
    const next = value.slice(0, start) + text + value.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      requestAnimationFrame(() => {
        const pos = start + text.length;
        el.setSelectionRange(pos, pos);
      });
    });
  };

  return { insertAtCursor };
}
