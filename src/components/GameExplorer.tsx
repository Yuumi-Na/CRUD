"use client";

import { useState, type ChangeEvent } from "react";
import type { Game, GameDraft, GameStatus } from "@/types/game";
import { STATUS_LABELS, STATUS_OPTIONS } from "@/types/game";
import GameCard from "./GameCard";
import GameForm from "./GameForm";

type GameExplorerProps = {
  initialGames: Game[];
};

type StatusFilter = "all" | GameStatus;

export default function GameExplorer({ initialGames }: GameExplorerProps) {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handleStatusFilterChange(event: ChangeEvent<HTMLSelectElement>) {
    setStatusFilter(event.target.value as StatusFilter);
  }

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


  function handleChangeStatus(id: string, status: GameStatus) {
    setGames((prevGames) =>
      prevGames.map((game) => (game.id === id ? { ...game, status } : game))
    );
  }


  function handleRequestDelete(id: string) {
    setPendingDeleteId(id);
  }

  function handleConfirmDelete(id: string) {
    setGames((prevGames) => prevGames.filter((game) => game.id !== id));
    setPendingDeleteId(null);
  }

  function handleCancelDelete() {
    setPendingDeleteId(null);
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

  // ข้อ 3: ตัวกรองสถานะ ทำงานร่วมกับคำค้นหาพร้อมกัน
  const searchText = keyword.trim().toLowerCase();
  const visibleGames = games.filter((game) => {
    const matchSearch = game.title.toLowerCase().includes(searchText);
    const matchStatus = statusFilter === "all" || game.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <div className="toolbar">
        <input
          className="search-input"
          type="search"
          aria-label="ค้นหาชื่อเกม"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="ค้นหาชื่อเกม"
        />

        <select
          className="sort-select"
          aria-label="กรองตามสถานะ"
          value={statusFilter}
          onChange={handleStatusFilterChange}
        >
          <option value="all">ทุกสถานะ</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>{STATUS_LABELS[status]}</option>
          ))}
        </select>

        <button type="button" className="add-button" onClick={handleOpenCreateForm}>
          + เพิ่มเกมใหม่
        </button>
      </div>

      <section className="game-grid">
        {visibleGames.length === 0 ? (
          <p className="empty-state">ไม่พบเกมที่ตรงกับเงื่อนไข</p>
        ) : (
          visibleGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onEdit={() => handleOpenEditForm(game.id)}
              onDelete={
                pendingDeleteId === game.id
                  ? () => handleConfirmDelete(game.id)
                  : () => handleRequestDelete(game.id)
              }
              onChangeStatus={handleChangeStatus}
              isPendingDelete={pendingDeleteId === game.id}
              onCancelDelete={handleCancelDelete}
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