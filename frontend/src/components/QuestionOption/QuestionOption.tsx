import { DatePicker, Input, TimePicker } from "antd";
import DropDown from "../DropDown/DropDown";
import Checkboxes from "../Checkboxes/Checkboxes";
import MultipleChoice from "../MultipleChoice/MultipleChoice";
import { Controller, useFormContext } from "react-hook-form";

const QuestionOption: React.FC<any> = ({ currentOption, index }) => {
  const { control } = useFormContext();

  const option = () => {
    switch (currentOption) {
      case "Short answer":
        return (
          <Controller
            name={`questions[${index}].answer`}
            control={control}
            render={({ field }) => (
              <Input placeholder="Short answer" disabled {...field} />
            )}
          />
        );
      case "Paragraph":
        return (
          <Controller
            name={`questions[${index}].answer`}
            control={control}
            render={({ field }) => (
              <Input.TextArea
                placeholder="Long answer"
                autoSize
                disabled
                {...field}
              />
            )}
          />
        );
      case "Multiple choice":
        return <MultipleChoice index={index} />;
      case "Checkboxes":
        return <Checkboxes index={index} />;
      case "Drop-down":
        return <DropDown index={index} />;
      case "Date":
        return (
          <Controller
            name={`questions[${index}].answer`}
            control={control}
            render={({ field }) => (
              <DatePicker
                style={{ display: "flex", width: 150 }}
                disabled
                {...field}
              />
            )}
          />
        );
      case "Time":
        return (
          <Controller
            name={`questions[${index}].answer`}
            control={control}
            render={({ field }) => (
              <TimePicker
                style={{ display: "flex", width: 150 }}
                disabled
                {...field}
              />
            )}
          />
        );
      case "File upload":
        return null;
    }
  };

  return <>{option()}</>;
};

export default QuestionOption;
