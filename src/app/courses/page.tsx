"use client"; 

import SectionTitle from "@/components/SectionTitle";
import CourseCard from "@/components/CourseCard";
import { courses } from "@/data/courses";
import CourseExplorer from "@/components/CourseExplorer";


export default function CoursesPage() {
  return (
    <main>
      <SectionTitle />
      <CourseExplorer courses={courses} />
    </main>
  );
}