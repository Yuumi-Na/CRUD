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

      <button
        type="button"
        className={`favorite-button ${isFavorite ? "active" : ""}`}
        aria-pressed={isFavorite}
        onClick={() => onToggleFavorite(course.id)}
      >
        {isFavorite ? "★ อยู่ในรายการโปรด" : "☆ เพิ่มเป็นรายการโปรด"}
      </button>

      <button type="button" onClick={onEdit}>แก้ไข</button>
      <button type="button" onClick={onDelete}>ลบ</button>
    </article>
  );
}