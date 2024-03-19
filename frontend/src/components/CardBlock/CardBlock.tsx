import { Card, Input } from "antd";
import styles from "./CardBlock.module.scss";
import Question from "../Question/Question";
import { Controller, useFormContext } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { DragOutlined } from "@ant-design/icons";
import DragAndDrop from "../../utils/DragAndDrop";
import { TQuestion } from "../Question/types/types";
import { TOptionFromBack } from "../QuestionOption/types/types";

const CardBlock: React.FC<any> = ({
  isTitle,
  onDelete,
  index,
  onCopy,
  onMove,
  id,
  isEditable = false,
}) => {
  const { control, watch, setValue } = useFormContext();
  const [dependsOnQuestionId, setDependsOnQuestionId] = useState();
  const [dependsOnOptionId, setDependsOnOptionId] = useState();

  const depends = watch(`questions[${index}].depends`);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!watch(`questions[${index}].id`)) {
      setValue(`questions[${index}].id`, id);
    }
    if (depends) {
      const questionId = watch(`questions`).findIndex(
        (question: TQuestion) => question.id === depends.question
      );
      setDependsOnQuestionId(questionId);

      const optionId = watch(`questions[${questionId}].options`).findIndex(
        (option: TOptionFromBack) => option.id === depends.option
      );
      setDependsOnOptionId(optionId);

      const isShow = watch(
        `questions[${questionId}].options[${optionId}].checked`
      );
      if (!isShow) {
        watch(`questions[${index}].options`)?.forEach(
          (_: any, optIndex: number) => {
            setValue(`questions[${index}].options[${optIndex}].checked`, false);
          }
        );
      }
    }
  }, [
    watch(
      `questions[${dependsOnQuestionId}].options[${dependsOnOptionId}].checked`
    ),
  ]);

  let dragAndDropFunctions = null;

  if (isEditable) {
    dragAndDropFunctions = DragAndDrop(watch, id, index, onMove, ref);
    dragAndDropFunctions.drop(ref);
  }

  return (
    <>
      {(isEditable ||
        (!isEditable &&
          depends &&
          watch(
            `questions[${dependsOnQuestionId}].options[${dependsOnOptionId}].checked`
          )) ||
        (!isEditable && !depends)) && (
        <div
          ref={isEditable ? ref : undefined}
          style={{ paddingTop: 10, paddingBottom: 10 }}
        >
          <Card
            className={`${styles.cardBlock}`}
            style={{ opacity: dragAndDropFunctions?.isDragging ? 0.2 : 1 }}
            cover={
              !isTitle &&
              isEditable && (
                <DragOutlined
                  ref={dragAndDropFunctions?.drag}
                  style={{ marginTop: 10, cursor: "grab" }}
                />
              )
            }
          >
            {isTitle && (
              <>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <Input
                      className={isEditable && styles.underline}
                      placeholder="Title"
                      variant="borderless"
                      style={{ fontSize: "x-large" }}
                      disabled={!isEditable}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Input.TextArea
                      className={isEditable && styles.underline}
                      placeholder="Description"
                      variant="borderless"
                      disabled={!isEditable}
                      autoSize
                      {...field}
                    />
                  )}
                />
              </>
            )}
            {!isTitle && (
              <Question
                onDelete={onDelete}
                index={index}
                onCopy={onCopy}
                isEditable={isEditable}
              />
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export default CardBlock;
