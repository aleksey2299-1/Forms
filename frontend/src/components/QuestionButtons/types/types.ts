import { UseFieldArrayInsert } from 'react-hook-form';
import { TForm } from 'src/components/EditForm/types/types';

type TQuestionButtonsProps = {
  index: number;
  onDelete: React.MouseEventHandler<HTMLElement>;
  onCopy: UseFieldArrayInsert<TForm, 'questions'>;
};

export type { TQuestionButtonsProps };
