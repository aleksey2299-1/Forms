type TQuestionOptionProps = {
  currentOption: string;
  index: number;
  isEditable: boolean;
  isRequired: boolean;
};

type TOptionsProps = {
  index: number;
  isEditable?: boolean;
  isRequired: boolean;
};

type TOption = {
  option: string;
  checked: boolean;
};

type TOptionFromBack = {
  option: string;
  checked: boolean;
  id: number;
};

export type { TOption, TOptionFromBack, TOptionsProps, TQuestionOptionProps };
