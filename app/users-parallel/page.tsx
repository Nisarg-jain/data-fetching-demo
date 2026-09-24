type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type Album = {
  id: number;
  userId: number;
  title: string;
};

async function getPosts(userId: string): Promise<Post[]> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`);
  }
  return res.json();
}

async function getAlbums(userId: string): Promise<Album[]> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch albums: ${res.status}`);
  }
  return res.json();
}

export default async function ParallelDataFetchingPage() {
  const startTime = Date.now();

  // Initiate both requests concurrently (without awaiting immediately)
  const postsPromise = getPosts("1");
  const albumsPromise = getAlbums("1");

  // Wait for both promises to resolve in parallel
  const [posts, albums] = await Promise.all([postsPromise, albumsPromise]);

  const totalTime = Date.now() - startTime;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Header & Timing Metadata */}
      <div className="space-y-2 border-b border-neutral-800 pb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-100">
            Parallel Data Fetching
          </h1>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 font-mono">
            Server Execution: ~{totalTime}ms (Promise.all)
          </span>
        </div>
        <p className="text-sm text-neutral-400">
          Posts ({posts.length}) and Albums ({albums.length}) were requested at the same instant.
        </p>
      </div>

      {/* Dual Column Layout: Posts & Albums */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Column 1: Posts */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-200">
            User Posts ({posts.length})
          </h2>
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-4 rounded-lg border border-neutral-800 bg-neutral-900/40 space-y-2"
              >
                <h3 className="text-sm font-semibold text-neutral-100 capitalize">
                  {post.title}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-2">
                  {post.body}
                </p>
                <span className="text-[10px] text-neutral-500 font-mono">
                  Post ID #{post.id}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Albums */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-200">
            User Albums ({albums.length})
          </h2>
          <div className="space-y-3">
            {albums.map((album) => (
              <div
                key={album.id}
                className="p-4 rounded-lg border border-neutral-800 bg-neutral-900/40 space-y-2"
              >
                <h3 className="text-sm font-semibold text-neutral-100 capitalize">
                  {album.title}
                </h3>
                <span className="text-[10px] text-neutral-500 font-mono">
                  Album ID #{album.id}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}