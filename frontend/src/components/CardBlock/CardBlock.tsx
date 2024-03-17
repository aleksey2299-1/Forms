import { Card, Input } from "antd";
import styles from "./CardBlock.module.scss";
import Question from "../Question/Question";
import { Controller, useFormContext } from "react-hook-form";
import { XYCoord, useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { TDragQuestion, TFieldsQuestion } from "../Question/types/types";
import { DragOutlined } from "@ant-design/icons";

const CardBlock: React.FC<any> = ({
  isTitle,
  onDelete,
  index,
  onCopy,
  onMove,
  id,
}) => {
  const { control, watch } = useFormContext();

  const ref = useRef<HTMLDivElement>(null);

  const type = "question";

  const [{ isDragging }, drag] = useDrag(() => ({
    type: type,
    item: {
      type: "item",
      item: watch(`questions[${index}]`),
      id: id,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    options: {
      dropEffect: "move",
    },
  }));

  const [, drop] = useDrop(() => ({
    accept: type,
    hover(item: TDragQuestion, monitor) {
      const questions: TFieldsQuestion[] = watch("fields");
      if (!ref.current) {
        return;
      }

      const dragIndex = questions.findIndex((e) => e.id === item.id);
      const hoverIndex = questions.findIndex((e) => e.id === id);

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Dragging downwards
      if (
        dragIndex < hoverIndex &&
        (clientOffset as XYCoord).y > hoverBoundingRect.bottom - 10
      ) {
        hoverIndex !== -1 && onMove(dragIndex, hoverIndex);
        return;
      }

      // Dragging upwards
      if (
        dragIndex > hoverIndex &&
        (clientOffset as XYCoord).y < hoverBoundingRect.top + 10
      ) {
        hoverIndex !== -1 && onMove(dragIndex, hoverIndex);
        return;
      }

      return;
    },
  }));

  drop(ref);

  return (
    <div ref={ref} style={{ paddingTop: 10, paddingBottom: 10 }}>
      <Card
        className={`${styles.cardBlock}`}
        style={{ opacity: isDragging ? 0.2 : 1 }}
        cover={
          !isTitle && (
            <DragOutlined
              ref={drag}
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
                  autoSize
                  {...field}
                />
              )}
            />
          </>
        )}
        {!isTitle && (
          <Question onDelete={onDelete} index={index} onCopy={onCopy} />
        )}
      </Card>
    </div>
  );
};

export default CardBlock;
