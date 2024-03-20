import { TQuestion } from "../../../components/Question/types/types";

type TForm = {
  title: string | undefined;
  description: string | undefined;
  questions: TQuestion[];
  fields: TQuestion[];
};

export type { TForm };
