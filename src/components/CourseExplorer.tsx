"use client";

import { useState, type ChangeEvent } from "react";
import type { Course } from "@/types/course";
import CourseCard from "./CourseCard";

type CourseExplorerProps = {
  courses: Course[];
};

export default function CourseExplorer({ courses }: CourseExplorerProps) {
  const [keyword, setKeyword] = useState("");
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [onlyFavorite, setOnlyFavorite] = useState(false);

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handleToggleFavorite(id: number) {
    setFavoriteIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((favoriteId) => favoriteId !== id)
        : [...prevIds, id]
    );
  }

  function handleToggleOnlyFavorite() {
    setOnlyFavorite((prev) => !prev);
  }

  const searchText = keyword.trim().toLowerCase();

  const visibleCourses = courses.filter((course) => {
    const matchSearch =
      course.title.toLowerCase().includes(searchText) ||
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
      />
    ))
  )}
</section>
  </div>
);
}