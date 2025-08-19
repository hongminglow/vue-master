interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export const fetchPosts = async (userId: number): Promise<Post[]> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};
