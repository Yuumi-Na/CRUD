import Link from "next/link";
import type { Game, GameStatus } from "@/types/game";
import { STATUS_LABELS, STATUS_OPTIONS } from "@/types/game";

type GameCardProps = {
  game: Game;
  onEdit: () => void;
  onDelete: () => void;
  onChangeStatus: (id: string, status: GameStatus) => void;
  isPendingDelete: boolean;
  onCancelDelete: () => void;
};

export default function GameCard({
  game,
  onEdit,
  onDelete,
  onChangeStatus,
  isPendingDelete,
  onCancelDelete,
}: GameCardProps) {
  return (
    <article className="game-card">
      <p className="game-platform">{game.platform}</p>

      <select
        className="status-select"
        value={game.status}
        onChange={(event) => onChangeStatus(game.id, event.target.value as GameStatus)}
        aria-label={`เปลี่ยนสถานะของ ${game.title}`}
      >
        {STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>{STATUS_LABELS[status]}</option>
        ))}
      </select>

      <h2>
        <Link href={`/games/${game.id}`}>{game.title}</Link>
      </h2>
      <p className="game-hours">{game.hoursExpected} ชั่วโมง (คาดการณ์)</p>

      <div className="card-actions">
        {isPendingDelete ? (
          <div className="confirm-delete">
            <span>ยืนยันการลบ?</span>
            <div className="crud-actions">
              <button type="button" className="delete-button" onClick={onDelete}>ยืนยัน</button>
              <button type="button" className="edit-button" onClick={onCancelDelete}>ยกเลิก</button>
            </div>
          </div>
        ) : (
          <div className="crud-actions">
            <button type="button" className="edit-button" onClick={onEdit}>แก้ไข</button>
            <button type="button" className="delete-button" onClick={onDelete}>ลบ</button>
          </div>
        )}
      </div>
    </article>
  );
}