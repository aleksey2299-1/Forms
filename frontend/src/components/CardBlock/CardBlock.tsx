import { Card, Input } from "antd";
import styles from "./CardBlock.module.scss";
import Question from "../Question/Question";
import { Controller, useFormContext } from "react-hook-form";
import { useEffect, useRef } from "react";
import { DragOutlined } from "@ant-design/icons";
import DragAndDrop from "../../utils/DragAndDrop";

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

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!watch(`questions[${index}].id`)) {
      setValue(`questions[${index}].id`, id);
    }
  }, [watch]);

  let dragAndDropFunctions = null;

  if (isEditable) {
    dragAndDropFunctions = DragAndDrop(watch, id, index, onMove, ref);
    dragAndDropFunctions.drop(ref);
  }

  return (
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
                  className={styles.underline}
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
                  className={styles.underline}
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
  );
};

export default CardBlock;
