import { TQuestion } from "../../Question/types/types";

type TForm = {
  title: string | undefined;
  description: string | undefined;
  questions: TQuestion[];
};

export type { TForm };
