import type { Game } from "@/types/game";

export const games: Game[] = [
  { id: "1", title: "Elden Ring", platform: "PC", hoursExpected: 60, status: "playing" },
  { id: "2", title: "Zelda: Tears of the Kingdom", platform: "Nintendo Switch", hoursExpected: 80, status: "not_started" },
  { id: "3", title: "Hades", platform: "PC", hoursExpected: 25, status: "completed" },
  { id: "4", title: "God of War Ragnarök", platform: "PlayStation", hoursExpected: 40, status: "not_started" },
  { id: "5", title: "Stardew Valley", platform: "Mobile", hoursExpected: 100, status: "playing" },
];