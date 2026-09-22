"use client";

import { useState, useEffect } from "react";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
};

export default function UsersClientPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <p className="text-neutral-400">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Users (Client)</h1>
      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="p-4 rounded-lg border border-neutral-800 bg-neutral-900/50 shadow-sm space-y-1"
          >
            <h2 className="text-lg font-semibold text-neutral-100">
              {user.name}
            </h2>
            <p className="text-sm text-neutral-400">@{user.username}</p>
            <p className="text-sm text-neutral-400">{user.email}</p>
            <p className="text-sm text-neutral-500">{user.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}