import { UseFieldArrayInsert } from 'react-hook-form';
import { TDependence } from '../../Dependence/types/types';
import { TOption } from '../../QuestionOption/types/types';
import { TForm } from 'src/components/EditForm/types/types';

type TQuestionProps = {
  index: number;
  onDelete: React.MouseEventHandler<HTMLElement>;
  onCopy: UseFieldArrayInsert<TForm, 'questions'>;
  isEditable: boolean;
  isShow: boolean;
};

type TQuestion = {
  depends: TDependence | undefined;
  name: string | undefined;
  type: string;
  options: TOption[] | undefined;
  required: boolean;
  id: string | number;
};

type TDragQuestion = {
  item: TQuestion;
  type: string;
  id: string | number;
};

export type { TQuestion, TDragQuestion, TQuestionProps };
