\# \[cite\_start]Exercise 23: Lazy Components \[cite: 1]



\## Objectives and Outcomes

\[cite\_start]This exercise is a demo that showcases how to use lazy components\[cite: 2, 3]. \[cite\_start]In this example, you can create lazy loading components for a user and post feature that fetches data from an API, using React 18 and React Suspense\[cite: 4].



\---



\## Exercises

\[cite\_start]An example of lazy loading components for a user and post feature that fetches data from an API, using React 18 and React Suspense\[cite: 5, 6].



\### 1. Create Child Components

\[cite\_start]Create two components, `User` and `Post`, in separate files\[cite: 7]:



\#### `User.js`

```javascript

// User.js

import React from 'react';



const User = ({ user }) => {

&#x20; return (

&#x20;   <div>

&#x20;     <h2>{user.name}</h2>

&#x20;     <p>{user.email}</p>

&#x20;   </div>

&#x20; );

};



export default User;
// Post.js

import React from 'react';



const Post = ({ post }) => {

&#x20; return (

&#x20;   <div>

&#x20;     <h2>{post.title}</h2>

&#x20;     <p>{post.body}</p>

&#x20;   </div>

&#x20; );

};



export default Post;
// api.js

export const fetchUser = async (userId) => {

&#x20; const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

&#x20; const user = await response.json();

&#x20; return user;

};



export const fetchPost = async (postId) => {

&#x20; const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);

&#x20; const post = await response.json();

&#x20; return post;

};
// App.js

import React, { Suspense } from 'react';

import { fetchUser, fetchPost } from './api';



const User = React.lazy(() => import('./User'));

const Post = React.lazy(() => import('./Post'));



const App = () => {

&#x20; return (

&#x20;   <div>

&#x20;     <h1>Lazy Loading Demo</h1>

&#x20;     <Suspense fallback={<div>Loading...</div>}>

&#x20;       <User user={fetchUser(1)} />

&#x20;       <Post post={fetchPost(1)} />

&#x20;     </Suspense>

&#x20;   </div>

&#x20; );

};



export default App;

