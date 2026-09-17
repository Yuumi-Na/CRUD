export type GameStatus = "not_started" | "playing" | "completed";

export type Game = {
  id: string;
  title: string;
  platform: string;
  hoursExpected: number;
  status: GameStatus;
};

export type GameDraft = {
  title: string;
  platform: string;
  hoursExpected: string;
  status: GameStatus;
};

export const STATUS_LABELS: Record<GameStatus, string> = {
  not_started: "ยังไม่เริ่ม",
  playing: "กำลังเล่น",
  completed: "เล่นจบแล้ว",
};

export const PLATFORM_OPTIONS = ["PC", "PlayStation", "Xbox", "Nintendo Switch", "Mobile"];