# PRACTICAL EXAM — Cinema Management App
## FER202 ReactJS | Duration: 90 minutes

---

## Application Overview

**Cinema Management App** is a cinema management system that allows an Admin to log in and manage a list of movies and genres.

**Tech stack:** React 18 + Vite + React-Bootstrap 2.x + axios + json-server

**Entities:**
- **Movie**: id, title, director, studio, genreId, ticketPrice (VND), vipPrice (VND), releaseDate (dd/MM/yyyy)
- **Genre**: id, name

**Sample data (db.json):**
- 3 users (1 Admin, 2 User)
- 5 genres (Action, Sci-Fi, Drama, Animation, Comedy)
- 10 movies — **2 movies per genre**

```json
"genres": [
  { "id": "1", "name": "Action" },
  { "id": "2", "name": "Sci-Fi" },
  { "id": "3", "name": "Drama" },
  { "id": "4", "name": "Animation" },
  { "id": "5", "name": "Comedy" }
],
"movies": [
  { "id": "1",  "title": "Mad Max: Fury Road",       "director": "George Miller",    "studio": "Warner Bros",         "genreId": 1, "ticketPrice": 5000,  "vipPrice": 50000,  "releaseDate": "15/05/2015" },
  { "id": "2",  "title": "Die Hard",                 "director": "John McTiernan",   "studio": "20th Century Fox",    "genreId": 1, "ticketPrice": 5000,  "vipPrice": 50000,  "releaseDate": "15/07/1988" },

  { "id": "3",  "title": "Inception",                "director": "Christopher Nolan","studio": "Legendary Pictures",  "genreId": 2, "ticketPrice": 8000,  "vipPrice": 80000,  "releaseDate": "16/07/2010" },
  { "id": "4",  "title": "Interstellar",             "director": "Ridley Scott",     "studio": "Scott Free",          "genreId": 2, "ticketPrice": 7500,  "vipPrice": 75000,  "releaseDate": "01/10/2015" },

  { "id": "5",  "title": "The Shawshank Redemption", "director": "Frank Darabont",   "studio": "Castle Rock",         "genreId": 3, "ticketPrice": 7000,  "vipPrice": 70000,  "releaseDate": "23/09/1994" },
  { "id": "6",  "title": "Forrest Gump",             "director": "Robert Zemeckis",  "studio": "Paramount Pictures",  "genreId": 3, "ticketPrice": 8000,  "vipPrice": 80000,  "releaseDate": "06/07/1994" },

  { "id": "7",  "title": "Spirited Away",            "director": "Hayao Miyazaki",   "studio": "Studio Ghibli",       "genreId": 4, "ticketPrice": 10000, "vipPrice": 100000, "releaseDate": "20/07/2001" },
  { "id": "8",  "title": "Toy Story",                "director": "John Lasseter",    "studio": "Pixar",               "genreId": 4, "ticketPrice": 9000,  "vipPrice": 90000,  "releaseDate": "22/11/1995" },

  { "id": "9",  "title": "The Grand Budapest Hotel", "director": "Wes Anderson",     "studio": "Fox Searchlight",     "genreId": 5, "ticketPrice": 6000,  "vipPrice": 60000,  "releaseDate": "28/03/2014" },
  { "id": "10", "title": "Home Alone",               "director": "Chris Columbus",   "studio": "Hughes Entertainment","genreId": 5, "ticketPrice": 6500,  "vipPrice": 65000,  "releaseDate": "16/11/1990" }
]
```

---

## Running the Application

```bash
cd template/          # or solution/
npm install
npm start             # runs json-server (port 3001) + Vite (port 5173) concurrently
npm test              # run visible tests
```

Login credentials:
- Admin: `admin / admin123`
- User (not allowed to log in): `user1 / user123`

> **Session persistence:** After logging in, the session is saved to `localStorage` — refreshing the page keeps you logged in. Clicking Logout clears the session from `localStorage`.

---

## Files to Complete

```
src/
├── components/
│   ├── AppNavbar.jsx     ← TODO-02, TODO-03
│   ├── AppFooter.jsx     ← TODO-04
│   └── MovieRow.jsx       ← TODO-06
├── pages/
│   ├── Login.jsx         ← TODO-01
│   ├── MovieDetail.jsx    ← TODO-05
│   ├── MovieList.jsx      ← TODO-07
│   ├── ManageGenres.jsx  ← TODO-10
│   ├── GenreDetail.jsx   ← TODO-09
│   └── NotFound.jsx      ← TODO-08
└── routes/
    └── AppRoutes.jsx     ← TODO-08
```

---

## Grading

| TODO    | Description                                                  | Points |
|---------|--------------------------------------------------------------|--------|
| TODO-01 | Login — show Alert on failed login                           | 1.0    |
| TODO-02 | Navbar — display fullName + role Badge                       | 0.5    |
| TODO-03 | Navbar — Logout                                              | 0.5    |
| TODO-04 | AppFooter — logo + info from about.js                        | 1.0    |
| TODO-05 | MovieDetail — fetch + Spinner + UI                            | 1.0    |
| TODO-06 | MovieRow — Delete with ModalConfirm                           | 1.0    |
| TODO-07 | MovieList — Search by title + Filter by Genre                 | 2.0    |
| TODO-08 | NotFound page + catch-all route configuration in AppRoutes   | 1.0    |
| TODO-09 | GenreDetail — Promise.all + navigate to /not-found           | 1.0    |
| TODO-10 | ManageGenres — Delete genre (check if genre is in use)       | 1.0    |
| **Total** |                                                            | **10.0** |

---

## TODO Details

---

### TODO-01 — Login: Show Alert on Failed Login (1.0pt)

**File:** `src/pages/Login.jsx`

**Requirements:**
In `handleSubmit`, the `catch(err)` block is currently empty. You must dispatch a `SET_ERROR` action with `err.message` so that `serverError` is updated and the Alert is shown.

**Technical requirements:**
- Use `dispatch({ type: 'SET_ERROR', payload: err.message })`
- `serverError` is rendered inside `<Alert variant="danger">` — already present in the JSX
- The Alert must appear when: (1) wrong username/password, (2) user has role !== `'Admin'`

**Checklist:**
- ✅ Fill in `dispatch({ type: 'SET_ERROR', payload: err.message })` in the catch block
- ✅ Run the app: log in with `user1/user123` → see a red Alert
- ✅ Run the app: log in with a wrong password → see a red Alert
- ✅ `npm test Login` → 3/3 tests pass

**Related test:** `Login.test.jsx`

---

### TODO-02 — Navbar: Display fullName and Role (0.5pt)

**File:** `src/components/AppNavbar.jsx`

**Requirements:**
Inside the `{user && (...)}` block, display `user.fullName` (bold, white) and `user.role` inside a `<Badge>`.

**Technical requirements:**
- `user.fullName` must appear in the DOM (text node or span containing the text)
- `user.role` must appear inside a `<Badge>` component
- Use `className="fw-bold"` or `<strong>` to bold the fullName

**Checklist:**
- ✅ After login, see "Cinema Admin" in the navbar
- ✅ See a Badge with text "Admin"
- ✅ `npm test AppNavbar` → TODO-02 tests pass

---

### TODO-03 — Navbar: Logout (0.5pt)

**File:** `src/components/AppNavbar.jsx`

**Requirements:**
Complete the `handleLogout` function:
1. Call `logoutUser()` from AuthContext
2. Call `navigate('/login')`

The Logout button is already present in the JSX (`onClick={handleLogout}`).

**Technical requirements:**
- `logoutUser` must be called BEFORE `navigate`
- Navigate to exactly `'/login'` (not `/` or `/logout`)
- When `user` is `null`, the Logout button must not be visible (handled by `{user && (...)}`)

**Checklist:**
- ✅ Click Logout → page redirects to `/login`
- ✅ After logout, accessing `/` redirects back to `/login`
- ✅ `npm test AppNavbar` → TODO-03 tests pass

---

### TODO-04 — AppFooter: Info from about.js (1.0pt)

**File:** `src/components/AppFooter.jsx`

**Requirements:**
Import `about` from `'../data/about'` and display:
- `<img src={about.logo} alt="logo" height={28}>` — logo image from `public/images/logo.jpg`
- `about.appName` — app name (bold, next to the logo)
- `about.copyright` — copyright text

**Structure of `about.js`:**
```js
const about = {
  appName: 'Cinema Management App',
  logo: '/images/logo.jpg',
  year: 2026,
  copyright: '© 2026 Cinema Management App',
}
```

**Technical requirements:**
- The root element MUST be a `<footer>` HTML tag (not a div)
- Must have an `<img>` with `src={about.logo}` — path taken from `about.logo`, not hardcoded
- `about.appName` visible in the DOM (text node or span)
- `about.copyright` visible in the DOM

**Checklist:**
- ✅ Footer appears at the bottom of the page after login
- ✅ See logo + "Cinema Management App" + "© 2026..."
- ✅ `npm test AppFooter` → 3/3 tests pass

---

### TODO-05 — MovieDetail: Fetch + Spinner + UI (1.0pt)

**File:** `src/pages/MovieDetail.jsx`

**Requirements:**
1. In `useEffect`: call `fetchMovieById(id)`, `.then(data => setMovie(data))`, `.catch(err => setError(err.message))`, `.finally(() => setLoading(false))`
2. Replace `if (loading) return null` → return a Container with `<Spinner animation="border" role="status" />`
3. Replace `if (error) return null` → return a Container with `<Alert variant="danger">{error}</Alert>`
4. In Card.Body: display the full movie information

**Technical requirements:**
- Spinner must have `role="status"` and class `.spinner-border`
- Alert must have `variant="danger"` and `role="alert"` (automatic from React-Bootstrap)
- Back button: `onClick={() => navigate('/')}`, text contains "Back"
- Display: title, director, studio, genre name (from MovieContext genres), ticketPrice (formatVND), vipPrice (formatVND), releaseDate (formatDateDisplay)
- Genre displayed inside `<Badge bg="secondary">`

**Checklist:**
- ✅ Go to `/movies/1` → see Spinner briefly, then movie info appears
- ✅ Go to `/movies/999` → see a red Alert
- ✅ See a Back to List button
- ✅ `npm test MovieDetail` → 5/5 tests pass

---

### TODO-06 — MovieRow: Delete with ModalConfirm (1.0pt)

**File:** `src/components/MovieRow.jsx`

**Requirements:**
1. Add `const [showModal, setShowModal] = useState(false)`
2. Delete button: `onClick={() => setShowModal(true)}`
3. `handleDeleteConfirm`: call `onDelete(movie.id)` then `setShowModal(false)`
4. Add `<ModalConfirm>` with props: `show={showModal}`, `title="Delete Movie"`, `message={\`Are you sure you want to delete "${movie.title}"?\`}`, `onConfirm={handleDeleteConfirm}`, `onCancel={() => setShowModal(false)}`

**Note:** `formatPriceRange` is already imported and used in the Ticket Price Range column — you do not need to touch this column.

**Technical requirements:**
- Import `ModalConfirm` from `'./ModalConfirm'`
- Modal message must include `movie.title` (not hardcoded)
- `onDelete` must receive `movie.id`
- Cancelling the modal → `onDelete` must NOT be called
- The Confirm button inside the modal has text **"Confirm"** (not "Delete")

**Checklist:**
- ✅ Click Delete → see Modal with the movie title
- ✅ Click Confirm in the modal → movie is removed from the list
- ✅ Click Cancel in the modal → nothing happens
- ✅ `npm test MovieRow` → TODO-06 tests pass

---

### TODO-07 — MovieList: Search by Title + Filter by Genre (2.0pt)

**File:** `src/pages/MovieList.jsx`

**Requirements — Search (1.0pt):**
1. Add state: `const [searchQuery, setSearchQuery] = useState('')`
2. Add `<Form.Control>` with `placeholder="Search by title..."`, `value={searchQuery}`, `onChange={e => setSearchQuery(e.target.value)}`
3. Compute `filteredMovies`: filter movies whose title contains `searchQuery` (case-insensitive)
4. Render `filteredMovies` instead of `movies`
5. When `filteredMovies.length === 0`: show text `"No movies found."`

**Requirements — Filter by Genre (1.0pt):**
1. Add state: `const [selectedGenreId, setSelectedGenreId] = useState('')`
2. Add `<Form.Select>` with first option `<option value="">All Genres</option>` + map from `genres`
3. Update `filteredMovies` to apply **both** search and genre filter simultaneously (AND logic)

**Technical requirements:**
- Search is case-insensitive
- `"All Genres"` option must have `value=""`
- Genre filter: `String(movie.genreId) === selectedGenreId`
- Changing the genre filter does not reset `searchQuery` and vice versa
- `filteredMovies.length === 0` → show "No movies found."
- Pagination is already implemented (PROVIDED) — no need to add it

**Checklist:**
- ✅ Type "Die Hard" → only 1 result shown
- ✅ Type "xyz" → see "No movies found."
- ✅ Select "Sci-Fi" → only 2 Sci-Fi movies shown
- ✅ Select "Sci-Fi" + type "interstellar" → only "Interstellar" remains
- ✅ `npm test MovieList` → 6/6 tests pass

---

### TODO-08 — NotFound Page + AppRoutes (1.0pt)

**Files:** `src/pages/NotFound.jsx` and `src/routes/AppRoutes.jsx`

**Part 1 — NotFound.jsx:**
Create a 404 page with:
- Import `useNavigate` from `react-router-dom`
- Display **"404"** prominently (use a heading element)
- Display **"Page Not Found"**
- A button that navigates to `'/'` when clicked
- Wrap everything in `<Container className="mt-5 text-center">`

**Part 2 — AppRoutes.jsx:**
Add the catch-all route at the end of `<Routes>`:
```jsx
<Route path="*" element={<NotFound />} />
```

**Technical requirements:**
- `NotFound` is already imported in AppRoutes — just add the `<Route>`
- "404" must appear inside a heading element (h1–h6)
- "Page Not Found" must appear inside a heading element
- The Back button must call `navigate('/')` (use the hook, not `window.location`)
- Accessing an unknown URL (e.g. `/abc`) → automatically shows the 404 page

**Checklist:**
- ✅ Go to `/anything-random` → see "404 — Page Not Found" page
- ✅ Click Back button → return to `/`
- ✅ GenreDetail with a non-existent genre → `navigate('/not-found')` → 404 page shown
- ✅ `npm test NotFound` → 4/4 tests pass

---

### TODO-09 — GenreDetail: Promise.all + Navigate to NotFound (1.0pt)

**File:** `src/pages/GenreDetail.jsx`

**Requirements:**
Inside `load()`:
1. Use `const [genres, allMovies] = await Promise.all([fetchGenres(), fetchMovies()])`
2. Find genre: `const found = genres.find(g => String(g.id) === String(id))`
3. If not found: `navigate('/not-found', { replace: true })` then `return`
4. Filter movies: `const filtered = allMovies.filter(b => String(b.genreId) === String(id))`
5. `setGenre(found)`, `setMovies(filtered)`
6. Handle `finally: setLoading(false)`

Replace `if (loading) return null` → return `<Container><Spinner animation="border" role="status" /></Container>`  
Add `if (!genre) return null` (safety guard)  
Complete the JSX: Back button, Card with genre info, Table with movie list

**Technical requirements:**
- Must use `Promise.all` (not two separate `await` calls)
- Non-existent ID → `navigate('/not-found', { replace: true })`
- Back button: `onClick={() => navigate('/genres')}`, text contains "Back to Genres"
- Card: display `genre.name` inside `<Badge bg="primary">` and `movies.length`
- Table columns: #, Title, Director, Studio, Release Date

**Checklist:**
- ✅ Go to `/genres/1` → see "Action" and 2 movies (Mad Max: Fury Road, Die Hard)
- ✅ Go to `/genres/999` → automatically redirected to the Not Found page
- ✅ Back to Genres button is present
- ✅ `npm test GenreDetail` → 4/4 tests pass

---

### TODO-10 — ManageGenres: Delete Genre with In-Use Check (1.0pt)

**File:** `src/pages/ManageGenres.jsx`

**Context:** The following are already provided in the page:
- `handleAdd` — add a genre (with duplicate name check)
- `handleDeleteRequest` — sets `genreToDelete` when Delete is clicked
- `<ModalConfirm>` — shows confirmation modal
- `<Alert>` to display `deleteError`
- `fetchMovies` is already called in `useEffect` → `movies` state is available

**Requirements — complete `handleDeleteConfirm`:**
1. `if (!genreToDelete) return`
2. Check if the genre is in use:
   ```js
   const inUse = movies.some(b => String(b.genreId) === String(genreToDelete.id))
   ```
3. If `inUse`:
   - `setDeleteError(\`Cannot delete "${genreToDelete.name}" — it is currently assigned to movies.\`)`
   - `setGenreToDelete(null)`
   - `return`
4. If not `inUse`:
   - `await deleteGenre(genreToDelete.id)`
   - `setGenres(prev => prev.filter(g => g.id !== genreToDelete.id))`
   - `setGenreToDelete(null)`

**Technical requirements:**
- Compare IDs using `String()` (avoid type mismatch)
- Error message must contain the genre name and the phrase "cannot delete" (case-insensitive)
- `deleteGenre` must NOT be called if the genre is in use
- After successful deletion, the genre disappears from the table
- `deleteError` is displayed in `<Alert variant="danger">` (already present in JSX)

**Checklist:**
- ✅ Click Delete on "Action" (has movies) → Confirm → see Alert "Cannot delete..."
- ✅ "Action" remains in the table afterwards
- ✅ Delete a genre with no movies → deletion succeeds, genre disappears
- ✅ `npm test ManageGenres` → TODO-10 tests pass

---

## Important Notes

1. **Do NOT modify** the following files: `AddMovie.jsx`, `MovieContext.jsx`, `AuthContext.jsx`, `movieApi.js`, `authApi.js`, `ModalConfirm.jsx`, `GenreList.jsx`, and all reducer/utils files — read them only to understand (`AuthContext` already handles localStorage persistence)
2. Run `npm start` to launch the app, `npm test` to check your progress
3. The exam also includes **hidden tests** that check edge cases and anti-hardcoding
4. The placeholder in ManageGenres must be `"e.g. Thriller"` (keep as is)
5. The Confirm button inside `<ModalConfirm>` has text **"Confirm"** (not "Delete")
