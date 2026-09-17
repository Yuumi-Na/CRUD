"use client";

import { useState } from "react";
import type { Game, GameDraft } from "@/types/game";
import GameCard from "./GameCard";
import GameForm from "./GameForm";

type GameExplorerProps = {
  initialGames: Game[];
};

export default function GameExplorer({ initialGames }: GameExplorerProps) {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  function handleCreate(draft: GameDraft) {
    const newGame: Game = {
      id: crypto.randomUUID(),
      title: draft.title.trim(),
      platform: draft.platform,
      hoursExpected: Number(draft.hoursExpected),
      status: draft.status,
    };
    setGames((prevGames) => [...prevGames, newGame]);
  }

  function handleUpdate(id: string, draft: GameDraft) {
    setGames(
      games.map((game) =>
        game.id === id
          ? {
              ...game,
              title: draft.title.trim(),
              platform: draft.platform,
              hoursExpected: Number(draft.hoursExpected),
              status: draft.status,
            }
          : game
      )
    );
  }

  function handleDelete(id: string) {
    setGames(games.filter((game) => game.id !== id));
  }

  function handleSave(draft: GameDraft) {
    if (editingId) {
      handleUpdate(editingId, draft);
    } else {
      handleCreate(draft);
    }
    setIsFormOpen(false);
    setEditingId(null);
  }

  function handleOpenCreateForm() {
    setEditingId(null);
    setIsFormOpen(true);
  }

  function handleOpenEditForm(id: string) {
    setEditingId(id);
    setIsFormOpen(true);
  }

  function handleCloseForm() {
    setIsFormOpen(false);
    setEditingId(null);
  }

  const editingGame = games.find((game) => game.id === editingId);

  return (
    <div>
      <div className="toolbar">
        <span className="favorite-count">ทั้งหมด {games.length} เกม</span>
        <button type="button" className="add-button" onClick={handleOpenCreateForm}>
          + เพิ่มเกมใหม่
        </button>
      </div>

      <section className="game-grid">
        {games.length === 0 ? (
          <p className="empty-state">ยังไม่มีเกมในรายการ</p>
        ) : (
          games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onEdit={() => handleOpenEditForm(game.id)}
              onDelete={() => handleDelete(game.id)}
            />
          ))
        )}
      </section>

      {isFormOpen ? (
        <div className="modal-overlay" onClick={handleCloseForm}>
          <div className="modal-content" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingGame ? "แก้ไขเกม" : "เพิ่มเกมใหม่"}</h2>
              <button type="button" className="modal-close" onClick={handleCloseForm} aria-label="ปิด">
                ✕
              </button>
            </div>
            <GameForm
              key={editingId ?? "new"}
              initialGame={editingGame}
              onSave={handleSave}
              onCancel={handleCloseForm}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}