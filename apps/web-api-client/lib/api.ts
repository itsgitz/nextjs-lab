import api from "./axios";

export const fetcher = (url: string) => api.get(url).then((res) => res.data);

type CreatePost = {
  title: string;
  body: string;
};

export const createPost = async (data: CreatePost) => {
  const response = await api.post("/posts", data);
  return response.data;
};

export const updatePost = async (id: number, data: any) => {
  const response = await api.put(`/posts/${id}`, data);
  return response.data;
};

export const deletePost = async (id: number) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};
