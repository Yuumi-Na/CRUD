"use client";

import { useState, type ChangeEvent } from "react";
import type { Band } from "@/types/band";
import BandCard from "./BandCard";

type BandExplorerProps = {
  bands: Band[];
};

type SortOption = "name" | "year";

export default function BandExplorer({ bands }: BandExplorerProps) {
  const [keyword, setKeyword] = useState("");
  const [followingIds, setFollowingIds] = useState<number[]>([]);
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});
  const [sortBy, setSortBy] = useState<SortOption>("name");

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handleToggleFollow(id: number) {
    setFollowingIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((followId) => followId !== id)
        : [...prevIds, id]
    );
  }

  function handleLike(id: number) {
    setLikeCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] ?? 0) + 1,
    }));
  }

  function handleSortChange(event: ChangeEvent<HTMLSelectElement>) {
    setSortBy(event.target.value as SortOption);
  }

  function handleClearFilters() {
    setKeyword("");
    setSortBy("name");
  }

  const searchText = keyword.trim().toLowerCase();

  const visibleBands = bands.filter((band) =>
    band.name.toLowerCase().includes(searchText)
  );

  // Derived Data
  const sortedBands = [...visibleBands].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return a.formedYear - b.formedYear;
  });

  const followingCount = followingIds.length;
  const hasActiveFilters = keyword.trim() !== "" || sortBy !== "name";

  return (
    <div>
      <div className="toolbar">
        <input
          className="search-input"
          type="search"
          aria-label="ค้นหาวงดนตรี"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="ค้นหาชื่อวงดนตรี"
        />

        <select
          className="sort-select"
          aria-label="เรียงลำดับตาม"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="name">เรียงตามชื่อวง</option>
          <option value="year">เรียงตามปีที่ก่อตั้ง</option>
        </select>

        <button
          type="button"
          className="clear-button"
          onClick={handleClearFilters}
          disabled={!hasActiveFilters}
        >
          ล้างเงื่อนไข
        </button>

        <span className="following-count">กำลังติดตาม {followingCount} วง</span>
      </div>

    <section className="band-grid">
    {sortedBands.length === 0 ? (
        <p className="empty-state">ไม่พบวงดนตรีที่ตรงกับเงื่อนไข</p>
    ) : (
        sortedBands.map((band) => (
        <BandCard
            key={band.id}
            band={band}
            isFollowing={followingIds.includes(band.id)}
            onToggleFollow={handleToggleFollow}
            likeCount={likeCounts[band.id] ?? 0}
            onLike={handleLike}
        />
        ))
    )}
    </section>
    </div>
  );
}