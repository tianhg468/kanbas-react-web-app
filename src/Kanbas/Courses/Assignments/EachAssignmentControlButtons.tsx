import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";

export default function LessonControlButtons({
  assignmentId,
  confirmDelete,
}: {
  assignmentId: string;
  confirmDelete: (assignmentId: string) => void;
}) {
  return (
    <div className="d-flex float-end">
      <FaTrash
        className="text-danger me-3 mb-1"
        onClick={() => confirmDelete(assignmentId)}
      />
      <GreenCheckmark /> <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
