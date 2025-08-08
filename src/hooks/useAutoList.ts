import { RefObject, useLayoutEffect, useRef } from 'react';

const useAutoList = (
  textareaRef: RefObject<HTMLTextAreaElement>,
  value: string,
  onChange: (newValue: string) => void,
) => {
  const nextCursorPos = useRef<number | null>(null);
  const isComposingRef = useRef(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isComposingRef.current) return;

    if (e.key === 'Enter') {
      const textarea = e.currentTarget;
      const { selectionStart, value: currentValue } = textarea;

      const lines = currentValue.split('\n');
      let charCount = 0;
      let currentLineIndex = 0;

      for (let i = 0; i < lines.length; i += 1) {
        charCount += lines[i].length + 1;
        if (selectionStart <= charCount) {
          currentLineIndex = i;
          break;
        }
      }

      const currentLine = lines[currentLineIndex];
      const lineStart = charCount - lines[currentLineIndex].length - 1;
      const isCursorAtLineEnd =
        selectionStart === lineStart + currentLine.length;

      const orderedMatch = currentLine.match(/^(\s*)(\d+)\.\s(.*)?$/);
      const unorderedMatch = currentLine.match(/^(\s*)-\s(.*)?$/);
      const taskMatch = currentLine.match(/^(\s*)-\s\[\s\]\s(.*)?$/);

      let insert = '\n';
      let newValue = currentValue;
      let handled = false;

      if (isCursorAtLineEnd) {
        if (orderedMatch) {
          const indent = orderedMatch[1] || '';
          const currentNumber = parseInt(orderedMatch[2], 10);
          const restText = orderedMatch[3] ?? '';

          if (restText.trim() !== '') {
            insert += `${indent}${currentNumber + 1}. `;
            handled = true;
          }
        } else if (taskMatch) {
          const indent = taskMatch[1] || '';
          const restText = taskMatch[2] ?? '';

          if (restText.trim() !== '') {
            insert += `${indent}- [ ] `;
            handled = true;
          }
        } else if (unorderedMatch) {
          const indent = unorderedMatch[1] || '';
          const restText = unorderedMatch[2] ?? '';

          if (restText.trim() !== '') {
            insert += `${indent}- `;
            handled = true;
          }
        }
      }

      if (handled) {
        e.preventDefault();
        newValue =
          currentValue.slice(0, selectionStart) +
          insert +
          currentValue.slice(selectionStart);

        nextCursorPos.current = selectionStart + insert.length;
        onChange(newValue);
      }
    }
  };

  useLayoutEffect(() => {
    const pos = nextCursorPos.current;
    const el = textareaRef.current;

    if (pos !== null && el) {
      el.selectionStart = pos;
      el.selectionEnd = pos;
      el.focus();
      nextCursorPos.current = null;

      requestAnimationFrame(() => {
        const beforeCursorText = el.value.slice(0, pos);
        const lineNumber = beforeCursorText.split('\n').length;
        const lineHeight = 24;
        el.scrollTop = (lineNumber - 1) * lineHeight;
      });
    }
  }, [value]);

  return {
    handleKeyDown,
    isComposingRef,
  };
};

export default useAutoList;
