import Link from "next/link";
import type { Game } from "@/types/game";
import { STATUS_LABELS } from "@/types/game";

type GameCardProps = {
  game: Game;
  onEdit: () => void;
  onDelete: () => void;
};

export default function GameCard({ game, onEdit, onDelete }: GameCardProps) {
  return (
    <article className="game-card">
      <p className="game-platform">{game.platform}</p>
      <h2>
        <Link href={`/games/${game.id}`}>{game.title}</Link>
      </h2>
      <p className="game-hours">{game.hoursExpected} ชั่วโมง (คาดการณ์)</p>
      <p className={`game-status status-${game.status}`}>
        {STATUS_LABELS[game.status]}
      </p>

      <div className="card-actions">
        <div className="crud-actions">
          <button type="button" className="edit-button" onClick={onEdit}>แก้ไข</button>
          <button type="button" className="delete-button" onClick={onDelete}>ลบ</button>
        </div>
      </div>
    </article>
  );
}