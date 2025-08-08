import Heading from '@/assets/images/ic_markdown_heading.svg?react';
import Bold from '@/assets/images/ic_markdown_bold.svg?react';
import Italic from '@/assets/images/ic_markdown_italic.svg?react';
import Align from '@/assets/images/ic_markdown_align.svg?react';
import Code from '@/assets/images/ic_markdown_code.svg?react';
import LinkIcon from '@/assets/images/ic_markdown_link.svg?react';
import OrderedList from '@/assets/images/ic_markdown_orderedList.svg?react';
import UnorderedList from '@/assets/images/ic_markdown_unorderedList.svg?react';
import TaskList from '@/assets/images/ic_markdown_taskList.svg?react';

type MarkdownAction =
  | {
      icon: React.FC<React.SVGProps<SVGSVGElement>>;
      label: string;
      insert: [string, string?];
    }
  | 'divider';

const markdownActions: MarkdownAction[] = [
  { icon: Heading, label: '헤딩', insert: ['## '] },
  { icon: Bold, label: '굵게', insert: ['**', '**'] },
  { icon: Italic, label: '기울임', insert: ['_', '_'] },
  {
    icon: Align,
    label: '가운데 정렬',
    insert: ['<div align="center">', '</div>'],
  },
  { icon: Code, label: '코드', insert: ['`', '`'] },
  { icon: LinkIcon, label: '링크', insert: ['[링크텍스트](', ')'] },
  'divider',
  { icon: OrderedList, label: '번호 목록', insert: ['1. '] },
  { icon: UnorderedList, label: '글머리 기호', insert: ['- '] },
  { icon: TaskList, label: '체크리스트', insert: ['- [ ] '] },
];

export default markdownActions;
