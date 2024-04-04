import { TQuestion } from '@components/Question/types/types';

type TFormFill = {
  title: string | undefined;
  description: string | undefined;
  questions: TQuestion[];
  from_form: number;
  id: number;
};

export type { TFormFill };
