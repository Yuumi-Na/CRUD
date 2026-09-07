import Image from "next/image";
import { Band } from "@/types/band";
import MemberList from "@/components/MemberList";

type BandCardProps = {
  band: Band;
  isFollowing: boolean;
  onToggleFollow: (id: number) => void;
  likeCount: number;
  onLike: (id: number) => void;
};

export default function BandCard({
  band,
  isFollowing,
  onToggleFollow,
  likeCount,
  onLike,
}: BandCardProps) {
  return (
    <article className="band-card">
      <Image
        src={band.imageUrl}
        alt={band.name}
        width={900}
        height={600}
        sizes="(max-width: 720px) 100vw, 56vw"
      />
      <div className="band-content">
        <h2>{band.name}</h2>
        <div className="band-meta">
          <p>Genre: {band.genre}</p>
          <p>Formed Year: {band.formedYear}</p>
        </div>
        {band.description && <p>{band.description}</p>}

        <div className="band-actions">
          <button
            type="button"
            className={`follow-button ${isFollowing ? "active" : ""}`}
            aria-pressed={isFollowing}
            onClick={() => onToggleFollow(band.id)}
          >
            {isFollowing ? "กำลังติดตาม" : "ติดตาม"}
          </button>

          <button
            type="button"
            className="like-button"
            onClick={() => onLike(band.id)}
          >
            ♥ ถูกใจ ({likeCount})
          </button>
        </div>

        <h3>Members</h3>
        <MemberList members={band.members} />
      </div>
    </article>
  );
}