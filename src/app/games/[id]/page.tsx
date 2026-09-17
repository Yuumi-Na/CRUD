import { games } from "@/data/games";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { STATUS_LABELS } from "@/types/game";

type GamePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: GamePageProps
): Promise<Metadata> {
  const { id } = await params;
  const game = games.find((item) => item.id === id);

  return {
    title: game ? game.title : "ไม่พบเกม",
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { id } = await params;
  const game = games.find((item) => item.id === id);

  if (!game) {
    notFound();
  }

  return (
    <main className="course-detail-page">
      <article className="course-detail">
        <h1>{game.title}</h1>
        <p className="detail-code">{game.platform}</p>
        <p>ชั่วโมงที่คาดว่าจะใช้เล่น {game.hoursExpected} ชั่วโมง</p>
        <p className={`game-status status-${game.status}`}>
          {STATUS_LABELS[game.status]}
        </p>
      </article>
    </main>
  );
}