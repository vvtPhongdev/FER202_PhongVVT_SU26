export const fetchUser = async (userId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );
  const user = await response.json();
  return user;
};

export const fetchPost = async (postId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
  );
  const post = await response.json();
  return post;
};

export const fetchUsers = async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users`
  );
  const users = await response.json();
  return users;
};

export const fetchPosts = async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts`
  );
  const posts = await response.json();
  return posts;
};

