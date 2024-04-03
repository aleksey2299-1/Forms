import { UseFieldArrayInsert, UseFieldArrayMove } from 'react-hook-form';
import { TForm } from 'src/components/EditForm/types/types';

type TCardBlockProps = {
  isTitle?: boolean;
  onDelete?: React.MouseEventHandler<HTMLElement>;
  index?: number;
  onCopy?: UseFieldArrayInsert<TForm, 'questions'>;
  onMove?: UseFieldArrayMove;
  id?: string;
  isEditable?: boolean;
  onClick?: React.PointerEventHandler<HTMLDivElement>;
};

export type { TCardBlockProps };
