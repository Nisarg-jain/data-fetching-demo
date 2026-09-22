type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
};

export default async function UsersServerPage() {
  // Artificial 2-second delay to observe loading.tsx skeleton
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    throw new Error(`Failed to fetch users: HTTP ${response.status}`);
  }

  const users: User[] = await response.json();

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Users (Server)</h1>
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