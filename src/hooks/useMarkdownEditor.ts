import { useRef } from 'react';

const useMarkdownEditor = (value: string, setValue: (v: string) => void) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertText = (before: string, after = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { selectionStart, selectionEnd } = textarea;
    const selectedText = value.slice(selectionStart, selectionEnd);

    const newText =
      value.slice(0, selectionStart) +
      before +
      selectedText +
      after +
      value.slice(selectionEnd);

    setValue(newText);

    setTimeout(() => {
      if (!textarea) return;
      let cursorPos;

      if (selectedText.length === 0) {
        cursorPos = selectionStart + before.length;
      } else {
        cursorPos =
          selectionStart + before.length + selectedText.length + after.length;
      }

      textarea.focus();
      textarea.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  };

  return {
    textareaRef,
    insertText,
  };
};

export default useMarkdownEditor;
