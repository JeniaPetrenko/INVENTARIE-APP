//components/UserCard

import Link from "next/link";

export default function UserCard({ user }) {
  const { user } = props;
  return (
    <Link href={`/users/${user.id}`}>
      <div className="user-card">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    </Link>
  );
}
