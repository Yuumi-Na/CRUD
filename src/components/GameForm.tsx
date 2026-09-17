"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Game, GameDraft, GameStatus } from "@/types/game";
import { PLATFORM_OPTIONS, STATUS_LABELS } from "@/types/game";

const emptyDraft: GameDraft = {
  title: "",
  platform: "",
  hoursExpected: "",
  status: "not_started",
};

type GameFormProps = {
  initialGame?: Game;
  onSave: (draft: GameDraft) => void;
  onCancel: () => void;
};

type FormErrors = Partial<Record<keyof GameDraft, string>>;

function toDraft(game?: Game): GameDraft {
  if (!game) {
    return emptyDraft;
  }
  return {
    title: game.title,
    platform: game.platform,
    hoursExpected: String(game.hoursExpected),
    status: game.status,
  };
}

function validate(value: GameDraft): FormErrors {
  const nextErrors: FormErrors = {};

  if (value.title.trim() === "") {
    nextErrors.title = "กรุณาระบุชื่อเกม";
  }

  if (value.platform.trim() === "") {
    nextErrors.platform = "กรุณาเลือกแพลตฟอร์ม";
  }

  const hours = Number(value.hoursExpected);
  if (!Number.isInteger(hours) || hours <= 0) {
    nextErrors.hoursExpected = "จำนวนชั่วโมงต้องเป็นจำนวนเต็มบวก";
  }

  return nextErrors;
}

export default function GameForm({ initialGame, onSave, onCancel }: GameFormProps) {
  const [draft, setDraft] = useState<GameDraft>(toDraft(initialGame));
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(draft);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSave(draft);
    setDraft(emptyDraft);
    setErrors({});
  }

  return (
    <form className="game-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="title">ชื่อเกม</label>
      <input
        className="form-input"
        id="title"
        name="title"
        type="text"
        value={draft.title}
        onChange={handleChange}
        aria-invalid={!!errors.title}
        aria-describedby={errors.title ? "title-error" : undefined}
      />
      {errors.title ? <p className="field-error" id="title-error">{errors.title}</p> : null}

      <label htmlFor="platform">แพลตฟอร์ม</label>
      <select
        className="form-input"
        id="platform"
        name="platform"
        value={draft.platform}
        onChange={handleChange}
        aria-invalid={!!errors.platform}
        aria-describedby={errors.platform ? "platform-error" : undefined}
      >
        <option value="">-- เลือกแพลตฟอร์ม --</option>
        {PLATFORM_OPTIONS.map((platform) => (
          <option key={platform} value={platform}>{platform}</option>
        ))}
      </select>
      {errors.platform ? <p className="field-error" id="platform-error">{errors.platform}</p> : null}

      <label htmlFor="hoursExpected">จำนวนชั่วโมงที่คาดว่าจะใช้เล่น</label>
      <input
        className="form-input"
        id="hoursExpected"
        name="hoursExpected"
        type="text"
        value={draft.hoursExpected}
        onChange={handleChange}
        aria-invalid={!!errors.hoursExpected}
        aria-describedby={errors.hoursExpected ? "hours-error" : undefined}
      />
      {errors.hoursExpected ? <p className="field-error" id="hours-error">{errors.hoursExpected}</p> : null}

      <label htmlFor="status">สถานะ</label>
      <select
        className="form-input"
        id="status"
        name="status"
        value={draft.status}
        onChange={handleChange}
      >
        {(Object.keys(STATUS_LABELS) as GameStatus[]).map((status) => (
          <option key={status} value={status}>{STATUS_LABELS[status]}</option>
        ))}
      </select>

      <div className="form-actions">
        <button type="submit" className="submit-button">บันทึก</button>
        {initialGame ? (
          <button type="button" className="cancel-button" onClick={onCancel}>ยกเลิก</button>
        ) : null}
      </div>
    </form>
  );
}