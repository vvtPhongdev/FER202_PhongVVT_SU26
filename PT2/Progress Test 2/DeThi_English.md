# PRACTICAL EXAM SAMPLE — FER202 ReactJS SU26
## Restaurant Management App

> **Duration:** 90 minutes  
> **Total score:** 10 points  
> **Allowed tools:** VS Code, browser, documentation  

---

## Project Overview

You are given a **Restaurant Management App** project with a pre-built structure using:

- React 18 + Vite
- React-Bootstrap 2.x
- axios + json-server (port 3001)
- React Router v6
- Context API + useReducer

**Start the project:**

```bash
npm install
npm start        # runs json-server + Vite dev server concurrently
```

Test account: `admin / admin123` (role: Admin)

---

## Key Directory Structure

```
src/
├── api/
│   ├── authApi.js          # login() — already handles Admin role check
│   └── restaurantApi.js    # fetch/add/update/delete for restaurants & categories
├── components/
│   ├── AppNavbar.jsx       # navigation bar
│   ├── AppFooter.jsx       # footer
│   ├── CategoryList.jsx    # category table with inline edit (already implemented)
│   ├── ModalConfirm.jsx    # reusable confirmation modal
│   └── RestaurantRow.jsx   # single row in the restaurant list table
├── context/
│   ├── AuthContext.jsx     # exports AuthContext (named) + AuthProvider + useAuth
│   └── RestaurantContext.jsx # exports RestaurantContext (named) + RestaurantProvider + useRestaurant
├── data/
│   └── about.js            # { appName, logo, version, course, year, copyright, ... }
├── pages/
│   ├── Login.jsx
│   ├── RestaurantList.jsx
│   ├── RestaurantDetail.jsx
│   ├── ManageCategories.jsx
│   └── CategoryDetail.jsx
└── utils/
    ├── format.js           # formatVND(), formatPriceRange(), formatDateDisplay()
    └── validate.js         # validateCategoryName(), validateUsername(), ...
```

---

## Running Tests

Open a terminal in the project folder:

```bash
# Run all visible tests
npm test

# Run tests for a specific file
npm test -- --testPathPattern="Login"
npm test -- --testPathPattern="AppNavbar"
npm test -- --testPathPattern="AppFooter"
npm test -- --testPathPattern="RestaurantRow"
npm test -- --testPathPattern="RestaurantDetail"
npm test -- --testPathPattern="CategoryDetail"
npm test -- --testPathPattern="ManageCategories"

# Run once (no watch mode)
npm test -- --watchAll=false
```

---

## Scoring Summary

| TODO | Feature | File | Points |
|------|---------|------|--------|
| TODO-01 | Alert when login role is not Admin | `Login.jsx` | 1.0 |
| TODO-02 | Display user info on Navbar | `AppNavbar.jsx` | 1.0 |
| TODO-03 | Logout button redirects to Login | `AppNavbar.jsx` | 1.0 |
| TODO-04 | App name click navigates to Home | `AppNavbar.jsx` | 0.5 |
| TODO-05 | Restaurant detail view + Back button | `RestaurantDetail.jsx` | 1.0 |
| TODO-06 | Delete restaurant with ModalConfirm | `RestaurantRow.jsx` | 1.0 |
| TODO-07 | Price Range column in restaurant list | `RestaurantList.jsx` + `RestaurantRow.jsx` | 0.5 |
| TODO-08 | Footer data from `about.js` | `AppFooter.jsx` | 1.0 |
| TODO-09 | Category detail page + restaurant list | `CategoryDetail.jsx` | 1.0 |
| TODO-10A | Add Category (form) | `ManageCategories.jsx` | 1.0 |
| TODO-10B | Delete Category (dialog) | `ManageCategories.jsx` | 1.0 |
| **Total** | | | **10.0** |

---

## TODO Details

---

### TODO-01 — Alert when login role is not Admin
**File:** `src/pages/Login.jsx` | **Points:** 1.0  
**Run test:** `npm test -- --testPathPattern="Login" --watchAll=false`

#### Requirements

When the user submits the login form:
- If login **fails** (wrong credentials or role is not `'Admin'`): display `<Alert variant="danger">` with the server error message.
- If login **succeeds** (Admin role): call `loginUser(user)` and navigate to `/`.
- On initial page load: **no Alert** should be visible.

> **Note:** `authApi.login()` already checks the role — it throws an error if the user is not Admin. Your task is to **catch that error and display the Alert**.

#### Technical Requirements

- Use `<Alert variant="danger" dismissible onClose={...}>` — React-Bootstrap Alert automatically creates `role="alert"` and a close button with `aria-label="Close"`.
- Alert content must equal `err.message` — **do not hardcode** strings like `"Only Admin accounts are allowed."`.
- The **×** dismiss button must remove the Alert when clicked.

#### ✅ Checklist

- [ ] Logging in with a non-Admin account → Alert appears
- [ ] Logging in with wrong credentials → Alert appears
- [ ] Alert content contains a real error message (not empty, not just "Error")
- [ ] Clicking × on the Alert → Alert disappears
- [ ] On fresh page load → no Alert visible

---

### TODO-02 — Display user info on Navbar
**File:** `src/components/AppNavbar.jsx` | **Points:** 1.0  
**Run test:** `npm test -- --testPathPattern="AppNavbar" --watchAll=false`

#### Requirements

When `user !== null` (logged in), display on the Navbar:
- **Full name** (`user.fullName`) — bold, white text
- **Role badge** (`user.role`) — use React-Bootstrap `<Badge>`

When `user === null` (not logged in): **do not display** user info.

#### Technical Requirements

- Data must come from **context** (`useAuth()` or `AuthContext`) — **do not hardcode** strings.
- When `user = null`: no "Logged in as" text, no Logout button.
- Badge must display the actual `user.role` value (any role, not just "Admin").
- Tests import `{ AuthContext }` directly — it must be a **named export**.

#### ✅ Checklist

- [ ] When logged in → fullName appears on Navbar
- [ ] When logged in → role appears as a Badge
- [ ] Values come from context (changing the user object updates the display)
- [ ] When not logged in (user=null) → no "Logged in as" text, no Logout button

---

### TODO-03 — Logout button redirects to Login
**File:** `src/components/AppNavbar.jsx` | **Points:** 1.0  
**Run test:** `npm test -- --testPathPattern="AppNavbar" --watchAll=false`

#### Requirements

When logged in, show a **Logout** button. When clicked:
1. Call `logoutUser()` from AuthContext
2. Navigate to `/login`

#### Technical Requirements

- Must be a `<Button>` (or element with `role="button"`) with text matching `/logout/i`.
- **Must call `logoutUser()`** — the test mocks this function and verifies it was called.
- Must be inside `{user && ...}` — only visible when logged in.

#### ✅ Checklist

- [ ] "Logout" button appears when logged in
- [ ] Clicking Logout → `logoutUser()` is called
- [ ] Clicking Logout → navigates to `/login`
- [ ] When not logged in → no Logout button

---

### TODO-04 — App name click navigates to Home
**File:** `src/components/AppNavbar.jsx` | **Points:** 0.5  
**Run test:** `npm test -- --testPathPattern="AppNavbar" --watchAll=false`

#### Requirements

`Navbar.Brand` displays the logo (`about.logo`) and app name (`about.appName`). Clicking it navigates to `/`.

#### Technical Requirements

- Must render as `<a href="/">` — the test checks `.closest('a')` and `getAttribute('href') === '/'`.
- **Use `as={Link} to="/"`** — do NOT use `onClick + navigate()`, because the test checks the `href` attribute.
- App name must come from `about.appName` — **do not hardcode**.

#### ✅ Checklist

- [ ] Brand displays app name from `about.appName` (not hardcoded)
- [ ] Brand has `href="/"` (inspect element → see `<a href="/">`)
- [ ] Brand uses `as={Link} to="/"` (not onClick + navigate)

---

### TODO-05 — Restaurant detail view + Back button
**File:** `src/pages/RestaurantDetail.jsx` | **Points:** 1.0  
**Run test:** `npm test -- --testPathPattern="RestaurantDetail" --watchAll=false`

#### Requirements

Page `/restaurants/:id`:
1. **Loading:** Call `fetchRestaurantById(id)` on mount, show Spinner while loading.
2. **Error:** Show Alert if API fails.
3. **Data:** Name, Category (Badge), Owner, Address, Price Min, Price Max (formatVND), Open Date (formatDateDisplay, only if present).
4. **Back button:** When clicked, go back (`navigate(-1)`).

#### Technical Requirements

- Spinner: use **`<Spinner animation="border" />`** — creates `.spinner-border` class, which the test finds via `document.querySelector('.spinner-border')`. Do **not** use `animation="grow"`.
- Error alert: use `<Alert variant="danger">` — creates `role="alert"`.
- Category name: look up from `state.categories.find(c => c.id === restaurant.categoryId)?.name` via `useRestaurant()`.
- Prices: use `formatVND(restaurant.priceMin)` → output `"300.000 ₫"` (dot separator, ₫ symbol).
- Back button: text must contain "Back" (case-insensitive).
- `RestaurantContext` must be a **named export**: `export const RestaurantContext = createContext(null)`.

#### ✅ Checklist

- [ ] Spinner appears immediately on load — uses `animation="border"`
- [ ] After loading → restaurant name is displayed
- [ ] Owner displayed correctly (not hardcoded)
- [ ] Price Min and Max in format `"300.000 ₫"` (using formatVND)
- [ ] Category name from context.categories (no separate API call)
- [ ] On API error (404) → Alert displayed
- [ ] Back button present (text contains "back")

---

### TODO-06 — Delete restaurant with ModalConfirm
**File:** `src/components/RestaurantRow.jsx` | **Points:** 1.0  
**Run test:** `npm test -- --testPathPattern="RestaurantRow" --watchAll=false`

#### Requirements

Each restaurant row has a **Delete** link/button. When clicked:
1. Show `<ModalConfirm>` with title `"Confirm Delete"`.
2. Confirm → call `onDelete(restaurant.id)`, close modal.
3. Cancel → close modal, do nothing.

#### Technical Requirements

- Requires `useState` to manage `showModal`.
- Delete trigger: text must match `/delete/i`.
- `<ModalConfirm>` must receive `show={showModal}` — when `show=true`, it renders a modal with `role="dialog"`.
- `confirmText="Delete"` — the confirm button inside the modal has text "Delete", inside `.modal-footer`.
- `onConfirm`: call `onDelete(restaurant.id)` **then** `setShowModal(false)`.
- `onCancel`: only `setShowModal(false)` — **do not** call `onDelete`.
- `restaurant.id` must come from props — **do not hardcode**.
- Restaurant name must appear in the modal message.
- `<ModalConfirm>` must be placed **outside `<tr>`** using a Fragment `<>...</>`.

#### ✅ Checklist

- [ ] "Delete" link/button present in each row
- [ ] Clicking Delete → modal appears (with restaurant name)
- [ ] Modal has "Delete" (confirm) and "Cancel" buttons
- [ ] Clicking Delete in modal → `onDelete` called with correct `restaurant.id`
- [ ] Clicking Cancel → modal closes, `onDelete` NOT called
- [ ] Works correctly with any restaurant id (not hardcoded)

---

### TODO-07 — Price Range column
**File:** `src/pages/RestaurantList.jsx` + `src/components/RestaurantRow.jsx` | **Points:** 0.5  
**Run test:** `npm test -- --testPathPattern="RestaurantRow" --watchAll=false`

#### Requirements

**RestaurantList.jsx:** Add `<th>Price Range</th>` to the table header.  
**RestaurantRow.jsx:** Add a `<td>` displaying the price range using `formatPriceRange(restaurant.priceMin, restaurant.priceMax)`.

#### Technical Requirements

- Use `formatPriceRange()` from `../utils/format` — output: `"50.000 ₫ – 200.000 ₫"` (dot separator, ₫ symbol).
- Test uses regex `/50\.000|50,000/` — accepts both dot and comma separators.
- When `priceMin = 0`: must display `"0 ₫"` — test checks `/0\s*₫|0 đ/`.
- **Do not hardcode** values — must read from `restaurant.priceMin` and `restaurant.priceMax`.
- Column count in `<tr>` must match `<thead>`.

#### ✅ Checklist

- [ ] RestaurantList has `<th>Price Range</th>` in header
- [ ] RestaurantRow has matching `<td>` with `formatPriceRange(...)` output
- [ ] Result format: `"50.000 ₫ – 200.000 ₫"` (VN dot separator)
- [ ] When priceMin = 0 → displays `"0 ₫ – ..."`
- [ ] Values not hardcoded

---

### TODO-08 — Footer data from `about.js`
**File:** `src/components/AppFooter.jsx` | **Points:** 1.0  
**Run test:** `npm test -- --testPathPattern="AppFooter" --watchAll=false`

#### Requirements

Footer displays: logo, copyright, version, and course — all from `about.js`.

#### Technical Requirements

- Must use the **`<footer>`** HTML tag (not `<div>`) — test finds it via `container.querySelector('footer')`.
- **`<img>`** must have `src={about.logo}` — test checks `img.getAttribute('src') === '/images/logo.png'`.
- Text must contain `about.version` (`"v2.0.0"`), `about.year` (`2026`), `"FER202"` from `about.course`.
- **Do not hardcode** year, version, or course name.

#### `about.js` data

```
appName   = 'Restaurant Management App'
logo      = '/images/logo.png'
version   = 'v2.0.0'
course    = 'FER202 — ReactJS'
year      = 2026
copyright = '© 2026 Restaurant Management App'
```

#### ✅ Checklist

- [ ] Uses `<footer>` HTML tag (not `<div>`)
- [ ] Has `<img src={about.logo}>` (src = `/images/logo.png`)
- [ ] Text contains year 2026 (from `about.copyright` or `about.year`)
- [ ] Text contains "v2.0.0" (from `about.version`)
- [ ] Text contains "FER202" (from `about.course`)
- [ ] Nothing hardcoded from `about`

---

### TODO-09 — Category detail page + restaurant list
**File:** `src/pages/CategoryDetail.jsx` | **Points:** 1.0  
**Run test:** `npm test -- --testPathPattern="CategoryDetail" --watchAll=false`

#### Requirements

Page `/categories/:id`:
1. Fetch **in parallel** `GET /categories` and `GET /restaurants` using `Promise.all`.
2. Find the category by `id`, filter restaurants belonging to it.
3. Show Spinner while loading, Alert if category not found.
4. Display category name in a Badge, restaurant count.
5. Restaurant table: `#`, `Name`, `Owner`, `Address`, `Price Range`.
6. **← Back to Categories** button that navigates to `/categories`.

#### Technical Requirements

- **ID comparison must use `String()`**: `String(c.id) === String(id)` — the URL param `id` is always a string; JSON data ids may be numbers.
- Alert when not found: `setError('Category not found.')` → `<Alert variant="danger">`.
- Table must have header text (case-insensitive): `Name`, `Owner`, `Address`, `Price`.
- Back button text must match **`/back to categories/i`**.
- Category name must come from the API (no hardcoding).
- Do **not** use `useRestaurant()` — fetch data directly with `axios`.

#### ✅ Checklist

- [ ] Uses `Promise.all` for parallel fetching
- [ ] ID comparison uses `String(c.id) === String(id)`
- [ ] Category name displayed correctly from API
- [ ] Only restaurants belonging to the correct category are shown
- [ ] Table has columns: Name, Owner, Address, Price (or Price Range)
- [ ] Non-existent category id → Alert displayed
- [ ] "← Back to Categories" button present (matches `/back to categories/i`)

---

### TODO-10 — Add Category + Delete Category
**File:** `src/pages/ManageCategories.jsx` | **Points:** 2.0 (10A: 1.0 + 10B: 1.0)  
**Run test:** `npm test -- --testPathPattern="ManageCategories" --watchAll=false`

---

#### 10A — Add Category (1.0 point)

##### Requirements

Add new category form (already present in template):
- Name input (required, minLength=3), placeholder `"e.g. Buffet"`.
- On valid submit: call `addCategory({ name })`, add to list, reset form.
- Duplicate name (case-insensitive) → show error.

##### Technical Requirements

- Placeholder must be exactly: **`placeholder="e.g. Buffet"`** — test finds it via `getByPlaceholderText(/e\.g\. Buffet/i)`.
- Add button text must match **`/add/i`** — `<Button type="submit">Add</Button>`.
- After success: category from **API response** (`created` object) must appear in list — no reload, no hardcoding.
- Duplicate name: must display text containing **`"already exists"`**.
- Name < 3 chars: **do not call POST API**.

##### ✅ Checklist 10A

- [ ] Input has `placeholder="e.g. Buffet"` (exact)
- [ ] Submit button has text "Add"
- [ ] Valid name + click Add → new category appears in list
- [ ] New category comes from API response (not from input value)
- [ ] Form resets after successful add
- [ ] Duplicate name (case-insensitive) → "already exists" displayed
- [ ] Name < 3 chars → POST API not called

---

#### 10B — Delete Category with dialog (1.0 point)

##### Requirements

Delete button in the category table. When clicked:
1. Show `<ModalConfirm>` with category name.
2. Confirm → call `deleteCategory(id)`, remove from list.
3. Cancel → close modal, no changes.

##### Technical Requirements

- Delete buttons in table: `<Button>Delete</Button>` — test uses `getAllByRole('button', { name: /delete/i })`.
- After clicking Delete: modal appears with `role="dialog"`.
- Category name must appear in `<strong>` inside the modal message.
- After confirm: DELETE API is called and category **disappears** from list (no page reload).
- Cancel: category stays, DELETE API not called.

##### ✅ Checklist 10B

- [ ] Category table has "Delete" button (`<Button>`) per row
- [ ] Clicking Delete → modal appears (with category name in `<strong>`)
- [ ] Confirm → DELETE API called with correct id
- [ ] Confirm → category disappears from list
- [ ] Cancel → category remains, DELETE API not called


---

## General Notes

- **Do not delete** the `// TODO-NN` comments in the template.
- **Do not change** file structure or component names.
- Use **React-Bootstrap** for all UI elements.
- Data comes from **json-server** on port 3001 — make sure it's running when manually testing.
- **Run `npm test` after each TODO** to verify before moving on.

---

*Good luck!* 🚀
