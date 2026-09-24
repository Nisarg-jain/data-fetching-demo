type Author = {
  id: number;
  name: string;
  email: string;
  website: string;
};

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export default async function SequentialDataFetchingPage() {
  const startTime = Date.now();

  // Step 1: Fetch Author
  const authorRes = await fetch(
    "https://jsonplaceholder.typicode.com/users/1"
  );
  if (!authorRes.ok) {
    throw new Error(`Failed to fetch author: ${authorRes.status}`);
  }
  const author: Author = await authorRes.json();

  // Step 2: Fetch Posts belonging strictly to this Author (Dependent Fetch)
  const postsRes = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${author.id}`
  );
  if (!postsRes.ok) {
    throw new Error(`Failed to fetch posts: ${postsRes.status}`);
  }
  const posts: Post[] = await postsRes.json();

  const totalTime = Date.now() - startTime;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* Header & Timing Metadata */}
      <div className="space-y-2 border-b border-neutral-800 pb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-100">
            Sequential Data Fetching
          </h1>
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-950/60 border border-amber-800/60 text-amber-300 font-mono">
            Server Execution: ~{totalTime}ms
          </span>
        </div>
        <p className="text-sm text-neutral-400">
          Request 2 (Posts) waited for Request 1 (Author ID: {author.id}) to resolve.
        </p>
      </div>

      {/* Author Card (Request 1 Result) */}
      <div className="p-5 rounded-lg border border-neutral-800 bg-neutral-900/60 space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Primary Request
        </span>
        <h2 className="text-xl font-semibold text-neutral-100">{author.name}</h2>
        <div className="text-sm text-neutral-400 flex flex-wrap gap-4">
          <span>Email: {author.email}</span>
          <span>Website: {author.website}</span>
        </div>
      </div>

      {/* Dependent Posts Grid (Request 2 Result) */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-200">
          Authored Posts ({posts.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 rounded-lg border border-neutral-800 bg-neutral-900/40 space-y-2 flex flex-col justify-between"
            >
              <div>
                <h4 className="text-base font-medium text-neutral-100 capitalize">
                  {post.title}
                </h4>
                <p className="text-sm text-neutral-400 mt-1 line-clamp-3">
                  {post.body}
                </p>
              </div>
              <span className="text-xs text-neutral-500 font-mono">
                Post #{post.id} · Author #{post.userId}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}