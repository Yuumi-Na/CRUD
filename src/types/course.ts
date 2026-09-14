export type Course = {
  id: string;
  code: string;
  name: string;
  credit: number;
  instructor: string;
};

export type CourseDraft = {
  code: string;
  name: string;
  credit: string;
  instructor: string;
};