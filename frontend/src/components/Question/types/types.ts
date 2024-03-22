import { TDependence } from "../../Dependence/types/types";
import { TOption } from "../../QuestionOption/types/types";

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

export type { TQuestion, TDragQuestion };
