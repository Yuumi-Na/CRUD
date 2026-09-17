"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Course, CourseDraft } from "@/types/course";

const emptyDraft: CourseDraft = {
  code: "",
  name: "",
  credit: "",
  instructor: "",
};

type CourseFormProps = {
  initialCourse?: Course;
  onSave: (draft: CourseDraft) => void;
  onCancel: () => void;
};

type FormErrors = Partial<Record<keyof CourseDraft, string>>;

function toDraft(course?: Course): CourseDraft {
  if (!course) {
    return emptyDraft;
  }
  return {
    code: course.code,
    name: course.name,
    credit: String(course.credit),
    instructor: course.instructor,
  };
}

function validate(value: CourseDraft): FormErrors {
  const nextErrors: FormErrors = {};

  if (value.code.trim() === "") {
    nextErrors.code = "กรุณาระบุรหัสวิชา";
  }
  if (value.name.trim() === "") {
    nextErrors.name = "กรุณาระบุชื่อวิชา";
  }
  if (value.instructor.trim() === "") {
    nextErrors.instructor = "กรุณาระบุชื่อผู้สอน";
  }

  const credit = Number(value.credit);
  if (!Number.isInteger(credit) || credit < 1 || credit > 6) {
    nextErrors.credit = "หน่วยกิตต้องเป็นจำนวนเต็มตั้งแต่ 1 ถึง 6";
  }

  return nextErrors;
}

export default function CourseForm({ initialCourse, onSave, onCancel }: CourseFormProps) {
  const [draft, setDraft] = useState<CourseDraft>(toDraft(initialCourse));
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(draft);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSave(draft);
    setDraft(emptyDraft);
    setErrors({});
  }

  return (
    <form className="course-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="code">รหัสวิชา</label>
      <input className="form-input" id="code" name="code" type="text" value={draft.code} onChange={handleChange} aria-invalid={!!errors.code} aria-describedby={errors.code ? "code-error" : undefined} />
      {errors.code ? <p className="field-error" id="code-error">{errors.code}</p> : null}

      <label htmlFor="name">ชื่อวิชา</label>
      <input className="form-input" id="name" name="name" type="text" value={draft.name} onChange={handleChange} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
      {errors.name ? <p className="field-error" id="name-error">{errors.name}</p> : null}

      <label htmlFor="credit">หน่วยกิต</label>
      <input className="form-input" id="credit" name="credit" type="text" value={draft.credit} onChange={handleChange} aria-invalid={!!errors.credit} aria-describedby={errors.credit ? "credit-error" : undefined} />
      {errors.credit ? <p className="field-error" id="credit-error">{errors.credit}</p> : null}

      <label htmlFor="instructor">ผู้สอน</label>
      <input className="form-input" id="instructor" name="instructor" type="text" value={draft.instructor} onChange={handleChange} aria-invalid={!!errors.instructor} aria-describedby={errors.instructor ? "instructor-error" : undefined} />
      {errors.instructor ? <p className="field-error" id="instructor-error">{errors.instructor}</p> : null}

      <div className="form-actions">
        <button type="submit" className="submit-button">บันทึก</button>
        {initialCourse ? (
          <button type="button" className="cancel-button" onClick={onCancel}>ยกเลิก</button>
        ) : null}
      </div>
    </form>
  );
}