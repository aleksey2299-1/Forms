import { TQuestion } from "../../../components/Question/types/types";

type TForm = {
  id: number;
  title: string | undefined;
  description: string | undefined;
  questions: TQuestion[];
  active: boolean;
};

export type { TForm };
