export type GorestPost = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

const BASE_URL = "https://gorest.co.in/public/v2";

export async function getPosts(): Promise<GorestPost[]> {
  const response = await fetch(`${BASE_URL}/posts?page=1&per_page=10`);

  if (!response.ok) {
    throw new Error("Could not load posts from GoREST.");
  }

  const posts: GorestPost[] = await response.json();

  return posts;
}
export async function getPostById(id: string): Promise<GorestPost> {
  const response = await fetch(`${BASE_URL}/posts/${id}`);

  if (!response.ok) {
    throw new Error("Could not load this post from GoREST.");
  }

  const post: GorestPost = await response.json();

  return post;
}

export type GorestComment = {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
};

export async function getCommentsByPostId(
  postId: string,
): Promise<GorestComment[]> {
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);

  if (!response.ok) {
    throw new Error("Could not load comments from GoREST.");
  }

  const comments: GorestComment[] = await response.json();

  return comments;
}
export type GorestUser = {
  id: number;
  name: string;
};

export async function getUserById(userId: number): Promise<GorestUser> {
  const response = await fetch(`${BASE_URL}/users/${userId}`);

  if (!response.ok) {
    throw new Error("Could not load this user from GoREST.");
  }

  const user: GorestUser = await response.json();

  return user;
}
