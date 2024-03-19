import { XYCoord, useDrag, useDrop } from "react-dnd";
import { TDragQuestion, TQuestion } from "../components/Question/types/types";

export default function DragAndDrop(
  watch: Function,
  id: string,
  index: number,
  onMove: Function,
  ref: React.RefObject<HTMLDivElement>
) {
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
  }));

  const [, drop] = useDrop(() => ({
    accept: type,
    hover(item: TDragQuestion, monitor) {
      const questions: TQuestion[] = watch("fields");
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

  return { drop, drag, isDragging };
}
