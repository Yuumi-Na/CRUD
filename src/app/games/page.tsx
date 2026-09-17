import type { Metadata } from "next";
import { games } from "@/data/games";
import GameExplorer from "@/components/GameExplorer";

export const metadata: Metadata = {
  title: "รายการเกมที่ตั้งใจจะเล่น",
};

export default function GamesPage() {
  return (
    <main>
      <h1>Game Backlog</h1>
      <GameExplorer initialGames={games} />
    </main>
  );
}