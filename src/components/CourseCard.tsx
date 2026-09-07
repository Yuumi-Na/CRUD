import type { Course } from "@/types/course";

type CourseCardProps = {
  course: Course;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
};

export default function CourseCard({ course, isFavorite, onToggleFavorite }: CourseCardProps) {
  return (
    <article className="course-card">
      <p>รหัสวิชา: {course.code}</p>
      <h2>{course.title}</h2>
      <p>{course.credits} หน่วยกิต</p>
      <p className={course.isOpen ? "status-open" : "status-closed"}>
        {course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}
      </p>

      <button
        type="button"
        className={`favorite-button ${isFavorite ? "active" : ""}`}
        aria-pressed={isFavorite}
        onClick={() => onToggleFavorite(course.id)}
      >
        {isFavorite ? "★ อยู่ในรายการโปรด" : "☆ เพิ่มเป็นรายการโปรด"}
      </button>
    </article>
  );
}