import { TOption } from "../../QuestionOption/types/types";

type TQuestion = {
  depends: string | undefined;
  name: string | undefined;
  type: string;
  options: TOption[];
  required: boolean;
  order: number;
};

type TFieldsQuestion = {
  depends: string | undefined;
  name: string | undefined;
  type: string;
  options: TOption[];
  required: boolean;
  order: number;
  id: string;
};

type TDragQuestion = {
  item: TQuestion;
  type: string;
  id: string;
};

export type { TQuestion, TDragQuestion, TFieldsQuestion };
