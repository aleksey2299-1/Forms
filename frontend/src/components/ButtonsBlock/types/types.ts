import { UseFieldArrayInsert } from 'react-hook-form';
import { TForm } from 'src/components/EditForm/types/types';

type TButtonsBlockProps = {
  onAdd: UseFieldArrayInsert<TForm, 'questions'>;
};

export type { TButtonsBlockProps };
