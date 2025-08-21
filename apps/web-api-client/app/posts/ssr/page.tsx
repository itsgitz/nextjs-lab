import api from "@/lib/axios";

export default async function PostSSR() {
  const response = await api.get("/posts");
  const posts = response.data;

  return (
    <div className="p-4">
      <div className="bg-gray-500 p-3 rounded-sm mb-6">
        <h1 className="text-xl font-bold mb-2">Posts (Axios + SWR)</h1>
      </div>
      <ul className="space-y-2">
        {posts.slice(0, 10).map((post: any) => (
          <li
            key={post.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
