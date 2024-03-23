import { DatePicker, Input, TimePicker } from "antd";
import DropDown from "../DropDown/DropDown";
import Checkboxes from "../Checkboxes/Checkboxes";
import MultipleChoice from "../MultipleChoice/MultipleChoice";
import { Controller, useFormContext } from "react-hook-form";
import styles from "./QuestionOption.module.scss";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const QuestionOption: React.FC<any> = ({
  currentOption,
  index,
  isEditable,
}) => {
  const { control } = useFormContext();
  const [isFilled, setIsFilled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const formIsFilled = location.pathname.includes("filled-forms");
    setIsFilled(formIsFilled);
  }, [location]);

  const option = () => {
    switch (currentOption) {
      case "Short answer":
        return (
          <Controller
            name={`questions[${index}].answer`}
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Short answer"
                disabled={isEditable || isFilled}
                {...field}
                className={styles.underline}
                variant="borderless"
              />
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
                disabled={isEditable || isFilled}
                {...field}
                className={styles.underline}
                variant="borderless"
              />
            )}
          />
        );
      case "Multiple choice":
        return (
          <MultipleChoice index={index} isEditable={isEditable || isFilled} />
        );
      case "Checkboxes":
        return <Checkboxes index={index} isEditable={isEditable || isFilled} />;
      case "Drop-down":
        return <DropDown index={index} isEditable={isEditable || isFilled} />;
      case "Date":
        return (
          <Controller
            name={`questions[${index}].answer`}
            control={control}
            render={({ field }) => (
              <DatePicker
                style={{ display: "flex", width: 150 }}
                disabled={isEditable || isFilled}
                {...field}
                value={
                  typeof field.value === "string"
                    ? dayjs(field.value)
                    : field.value
                }
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
                disabled={isEditable || isFilled}
                {...field}
                value={
                  typeof field.value === "string"
                    ? dayjs(field.value)
                    : field.value
                }
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
