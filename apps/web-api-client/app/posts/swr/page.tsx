"use client";

import { createPost, deletePost, fetcher } from "@/lib/api";
import clsx from "clsx";
import { useState } from "react";
import toast from "react-hot-toast";
import useSWR, { mutate } from "swr";

export default function PostSWR() {
  const { data: posts, error, isLoading } = useSWR("/posts", fetcher);
  const [title, setTitle] = useState<string>("");
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [adding, setAdding] = useState<boolean>(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load: {error.message}</div>;

  async function handleAddPost() {
    if (!title.trim()) return;

    setAdding(true);
    //
    // optimistic update (update cache before server response)
    const newPost = {
      id: Date.now(),
      title,
      body: "Temp body!",
    };

    try {
      mutate("/posts", [...posts, newPost], false);
      const created = await createPost({ title, body: "This is a new post" });
      console.log("Created post", created);

      //
      // revalidate from server
      mutate("/posts");
      setTitle("");
      toast.success("Post added!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add post.");
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id: number) {
    setLoadingId(id);

    try {
      //
      // optimistic update
      mutate(
        "/posts",
        posts.filter((p: any) => p.id !== id),
        false
      );

      await deletePost(id);

      mutate("/posts");
      toast.success("Post deleted!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete post.");
    } finally {
      setLoadingId(null);
    }
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
        <button
          onClick={handleAddPost}
          disabled={adding}
          className={clsx(
            "px-3 py-2 rounded text-white",
            adding ? "bg-gray-400" : "bg-gray-500 hover:bg-blue-600"
          )}
        >
          {adding ? "Adding..." : "Add"}
        </button>
      </div>
      <ul className="space-y-1">
        {posts.slice(0, 10).map((post: any) => (
          <li
            key={post.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            {post.title}
            <button
              onClick={() => handleDelete(post.id)}
              disabled={loadingId === post.id}
              className={clsx(
                "px-2 py-1 rounded text-white",
                loadingId === post.id
                  ? "bg-gray-400"
                  : "bg-red-500 hover:bg-red-600"
              )}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
