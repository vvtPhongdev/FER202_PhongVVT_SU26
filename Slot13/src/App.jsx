import React, { Suspense, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { fetchUsers, fetchPosts } from "./api.js";

// Lazy-loaded components with artificial delay to demonstrate React Suspense visually
const User = React.lazy(() =>
  Promise.all([
    import("./User.jsx"),
    new Promise((resolve) => setTimeout(resolve, 800)),
  ]).then(([module]) => module)
);

const Post = React.lazy(() =>
  Promise.all([
    import("./Post.jsx"),
    new Promise((resolve) => setTimeout(resolve, 800)),
  ]).then(([module]) => module)
);

const LoadingState = () => (
  <div className="status-panel" role="status">
    <ClipLoader color="#110038" size={32} speedMultiplier={0.85} />
  </div>
);

const App = () => {
  const [currentView, setCurrentView] = useState("home"); // "home" displays Users, "posts" displays Posts
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [usersData, postsData] = await Promise.all([
          fetchUsers(),
          fetchPosts(),
        ]);
        setUsers(usersData);
        setPosts(postsData);
      } catch (fetchError) {
        setError(fetchError);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-logo">Logo</div>
        <div className="navbar-links">
          <a
            href="#"
            className={currentView === "home" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setCurrentView("home");
            }}
          >
            Home
          </a>
          <a
            href="#"
            className={currentView === "posts" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setCurrentView("posts");
            }}
          >
            Posts
          </a>
        </div>
      </nav>

      {/* Purple Header Banner */}
      <header className="banner">
        {currentView === "home" ? (
          <div className="banner-content">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="banner-icon"
            >
              <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 3.734-1.104 7.125 7.125 0 0 0-3.5-3.5.75.75 0 0 1-.002-1.498 8.625 8.625 0 0 1 4.5 4.5l.002.126a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-4.137 1.237Z" />
            </svg>
            <h1>Users</h1>
          </div>
        ) : (
          <div className="banner-content">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="banner-icon"
            >
              <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM3.75 13.5A1.5 1.5 0 0 1 5.25 12h13.5a1.5 1.5 0 0 1 1.5 1.5V18a1.5 1.5 0 0 1-1.5 1.5H5.25A1.5 1.5 0 0 1 3.75 18v-4.5ZM19.5 9a3 3 0 0 0 3-3V4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V6a3 3 0 0 0 3 3h15ZM3.75 4.5A1.5 1.5 0 0 1 5.25 3h13.5A1.5 1.5 0 0 1 20.25 4.5V6a1.5 1.5 0 0 1-1.5 1.5H5.25A1.5 1.5 0 0 1 3.75 6V4.5Z" />
            </svg>
            <h1>Posts</h1>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="content-container">
        {loading ? (
          <LoadingState />
        ) : error ? (
          <div className="status-panel error">
            Unable to load data: {error.message}
          </div>
        ) : (
          <Suspense fallback={<LoadingState />}>
            {currentView === "home" ? (
              <div className="list-view">
                {users.map((user) => (
                  <User key={user.id} user={user} />
                ))}
              </div>
            ) : (
              <div className="list-view">
                {posts.map((post) => (
                  <Post key={post.id} post={post} />
                ))}
              </div>
            )}
          </Suspense>
        )}
      </main>
    </div>
  );
};

export default App;



