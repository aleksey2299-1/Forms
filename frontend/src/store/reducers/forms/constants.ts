const initialQuestion = {
  depends: undefined,
  name: undefined,
  type: "Short answer",
  options: undefined,
  required: false,
  id: 0,
};

export const initialForm = {
  id: 0,
  title: undefined,
  description: undefined,
  questions: [initialQuestion],
  active: false,
};
