"use client";

import { createPost, fetcher } from "@/lib/api";
import { useState } from "react";
import useSWR, { mutate } from "swr";

export default function PostSWR() {
  const { data: posts, error, isLoading } = useSWR("/posts", fetcher);
  const [title, setTitle] = useState<string>("");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load: {error.message}</div>;

  async function handleAddPost() {
    if (!title.trim()) return;

    //
    // optimistic update (update cache before server response)
    const newPost = {
      id: Date.now(),
      title,
      body: "Temp body!",
    };

    mutate("/posts", [...posts, newPost], false);
    const created = await createPost({ title, body: "This is a new post" });
    console.log("Created post", created);

    //
    // revalidate from server
    mutate("/posts");
    setTitle("");
  }

  async function handleDelete(id: number) {
    //
    // optimistic update
    mutate(
      "/posts",
      posts.filter((p: any) => p.id !== id),
      false
    );
  }

  return (
    <div className="p-4">
      <div className="bg-gray-500 p-3 rounded-sm mb-6">
        <h1 className="text-xl font-bold mb-2">Posts (Axios + SWR)</h1>
      </div>
      <div className="flex gap-2 mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New post title"
          className="border p-2 rounded"
        />
        <button onClick={handleAddPost} className="bg-blue-500 p-2 rounded">
          Add
        </button>
      </div>
      <ul className="space-y-1">
        {posts.slice(0, 10).map((post: any) => (
          <li
            key={post.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <strong>{post.title}</strong>
            <button
              onClick={() => handleDelete(post.id)}
              className="bg-red-500 p-2 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
