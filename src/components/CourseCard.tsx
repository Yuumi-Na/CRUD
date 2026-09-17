import type { Course } from "@/types/course";
import Link from "next/link";

type CourseCardProps = {
  course: Course;
  onEdit: () => void;
  onDelete: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
};

export default function CourseCard({
  course,
  onEdit,
  onDelete,
  isFavorite,
  onToggleFavorite,
}: CourseCardProps) {
  return (
    <article className="course-card">
      <p>รหัสวิชา: {course.code}</p>
      <h2>
        <Link href={`/courses/${course.id}`}>{course.name}</Link>
      </h2>
      <p>{course.credit} หน่วยกิต</p>

    <div className="card-actions">
      <button
        type="button"
        className={`favorite-button ${isFavorite ? "active" : ""}`}
        aria-pressed={isFavorite}
        onClick={() => onToggleFavorite(course.id)}
      >
        {isFavorite ? "★ อยู่ในรายการโปรด" : "☆ เพิ่มเป็นรายการโปรด"}
      </button>

      <div className="crud-actions">
        <button type="button" className="edit-button" onClick={onEdit}>แก้ไข</button>
        <button type="button" className="delete-button" onClick={onDelete}>ลบ</button>
      </div>
    </div>
    </article>
  );
}