import Image from "next/image";
import { Member } from "@/types/band";

type MemberListProps = {
  members: Member[];
};

export default function MemberList({ members }: MemberListProps) {
  return (
    <ul className="member-list">
      {members.map((member) => (
        <li key={member.id} className="member-item">
          <Image
            src={member.photoUrl}
            alt={member.name}
            width={64}
            height={64}
            className="member-photo"
          />
          <span className="member-text">
            {member.name} — {member.role}
          </span>
        </li>
      ))}
    </ul>
  );
}