import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import { courses } from "@/data/courses";
import CourseExplorer from "@/components/CourseExplorer";

export const metadata: Metadata = {
  title: "รายวิชาทั้งหมด",
};

export default function CoursesPage() {
  return (
    <main>
      <SectionTitle />
      <CourseExplorer courses={courses} />
    </main>
  );
}