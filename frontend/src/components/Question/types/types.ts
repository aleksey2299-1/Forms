import { TDependence } from "../../Dependence/types/types";
import { TOption } from "../../QuestionOption/types/types";

type TQuestion = {
  depends: TDependence | undefined;
  name: string | undefined;
  type: string;
  options: TOption[];
  required: boolean;
  id: string;
};

type TDragQuestion = {
  item: TQuestion;
  type: string;
  id: string;
};

export type { TQuestion, TDragQuestion };
