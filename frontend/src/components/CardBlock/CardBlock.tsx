import { Card, Input } from "antd";
import styles from "./CardBlock.module.scss";
import Question from "../Question/Question";
import { Controller, useFormContext } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { DragOutlined } from "@ant-design/icons";
import DragAndDrop from "../../utils/DragAndDrop";
import { TQuestion } from "../Question/types/types";
import { useLocation } from "react-router-dom";

const CardBlock: React.FC<any> = ({
  isTitle,
  onDelete,
  index,
  onCopy,
  onMove,
  id,
  isEditable = false,
  onClick,
}) => {
  const { control, watch, setValue } = useFormContext();
  const [dependsOnQuestionId, setDependsOnQuestionId] = useState();
  const location = useLocation();
  const depends = watch(`questions.${index}.depends`);
  const showCard =
    watch(`questions.${dependsOnQuestionId}.answers`)?.find(
      (item: any) => item == depends.option
    ) != undefined;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!watch(`questions.${index}.id`)) {
      setValue(`questions.${index}.id`, id);
    }
    if (depends) {
      const questionId = watch(`questions`).findIndex(
        (question: TQuestion) => question.id === depends.question
      );
      setDependsOnQuestionId(questionId);

      // Обнуляем все ответы при смене корневой зависимости
      if (!showCard && !location.pathname.includes("forms")) {
        setValue(`questions.${index}.answers`, undefined);
      }
    }
  }, [showCard]);

  let dragAndDropFunctions = null;

  if (isEditable) {
    dragAndDropFunctions = DragAndDrop(watch, id, index, onMove, ref);
    dragAndDropFunctions.drop(ref);
  }

  return (
    <>
      {(isEditable || (!isEditable && ((depends && showCard) || !depends))) && (
        <div
          ref={isEditable ? ref : undefined}
          style={{ paddingTop: 10, paddingBottom: 10 }}
        >
          <Card
            onPointerDown={onClick}
            className={`${styles.cardBlock}`}
            id={id}
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
                isShow={(depends && showCard) || !depends}
              />
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export default CardBlock;
