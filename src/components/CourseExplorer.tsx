"use client";

import { useState, type ChangeEvent } from "react";
import type { Course, CourseDraft } from "@/types/course";
import CourseCard from "./CourseCard";
import CourseForm from "./CourseForm";

type CourseExplorerProps = {
  initialCourses: Course[];
};

export default function CourseExplorer({ initialCourses }: CourseExplorerProps) {
  const [keyword, setKeyword] = useState("");
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [onlyFavorite, setOnlyFavorite] = useState(false);

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handleToggleFavorite(id: string) {
    setFavoriteIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((favoriteId) => favoriteId !== id)
        : [...prevIds, id]
    );
  }

  function handleToggleOnlyFavorite() {
    setOnlyFavorite((prev) => !prev);
  }

  function handleCreate(draft: CourseDraft) {
    const newCourse: Course = {
      id: crypto.randomUUID(),
      code: draft.code.trim(),
      name: draft.name.trim(),
      credit: Number(draft.credit),
      instructor: draft.instructor.trim(),
    };
    setCourses((prevCourses) => [...prevCourses, newCourse]);
  }

  function handleDelete(id: string) {
    setCourses(courses.filter((course) => course.id !== id));
  }

  function handleUpdate(id: string, draft: CourseDraft) {
    setCourses(
      courses.map((course) =>
        course.id === id
          ? {
              ...course,
              code: draft.code.trim(),
              name: draft.name.trim(),
              credit: Number(draft.credit),
              instructor: draft.instructor.trim(),
            }
          : course
      )
    );
  }

  function handleSave(draft: CourseDraft) {
    if (editingId) {
      handleUpdate(editingId, draft);
    } else {
      handleCreate(draft);
    }
    setIsFormOpen(false);
    setEditingId(null);
  }

  function handleOpenCreateForm() {
    setEditingId(null);
    setIsFormOpen(true);
  }

  function handleOpenEditForm(id: string) {
    setEditingId(id);
    setIsFormOpen(true);
  }

  function handleCloseForm() {
    setIsFormOpen(false);
    setEditingId(null);
  }

  const editingCourse = courses.find((course) => course.id === editingId);

  const searchText = keyword.trim().toLowerCase();

  const visibleCourses = courses.filter((course) => {
    const matchSearch =
      course.name.toLowerCase().includes(searchText) ||
      course.code.includes(searchText);
    const matchFavorite = !onlyFavorite || favoriteIds.includes(course.id);
    return matchSearch && matchFavorite;
  });

  const favoriteCount = favoriteIds.length;

  return (
    <div>
      <div className="toolbar">
        <input
          className="search-input"
          type="search"
          aria-label="ค้นหารายวิชา"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="ค้นหาชื่อวิชาหรือรหัสวิชา"
        />

        <div className="favorite-toolbar">
          <span className="favorite-count">รายการโปรด {favoriteCount} รายการ</span>
          <button
            type="button"
            className={`filter-button ${onlyFavorite ? "active" : ""}`}
            onClick={handleToggleOnlyFavorite}
          >
            {onlyFavorite ? "แสดงทั้งหมด" : "แสดงเฉพาะรายการโปรด"}
          </button>
          <button type="button" className="add-button" onClick={handleOpenCreateForm}>
            + เพิ่มรายวิชาใหม่
          </button>
        </div>
      </div>

      <section className="course-grid">
        {visibleCourses.length === 0 ? (
          <p className="empty-state">ไม่พบรายวิชาที่ตรงกับเงื่อนไข</p>
        ) : (
          visibleCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isFavorite={favoriteIds.includes(course.id)}
              onToggleFavorite={handleToggleFavorite}
              onEdit={() => handleOpenEditForm(course.id)}
              onDelete={() => handleDelete(course.id)}
            />
          ))
        )}
      </section>

      {isFormOpen ? (
        <div className="modal-overlay" onClick={handleCloseForm}>
          <div className="modal-content" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingCourse ? "แก้ไขรายวิชา" : "เพิ่มรายวิชาใหม่"}</h2>
              <button type="button" className="modal-close" onClick={handleCloseForm} aria-label="ปิด">
                ✕
              </button>
            </div>
            <CourseForm
              key={editingId ?? "new"}
              initialCourse={editingCourse}
              onSave={handleSave}
              onCancel={handleCloseForm}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}