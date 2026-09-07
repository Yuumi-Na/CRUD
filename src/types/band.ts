export type Member = {
  id: number;
  name: string;
  role: string;
  photoUrl: string;
};

export type Band = {
  id: number;
  name: string;
  genre: string;
  formedYear: number;
  imageUrl: string;
  description?: string;
  members: Member[];
};