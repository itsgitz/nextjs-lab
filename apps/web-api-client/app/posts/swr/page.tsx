"use client";

import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export default function PostSWR() {
  const { data, error, isLoading } = useSWR("/posts", fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Posts (Axios + SWR)</h1>
      <ul className="space-y-1">
        {data.slice(0, 10).map((post: any) => (
          <li key={post.id} className="border p-2 rounded-md">
            <strong>{post.title}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
