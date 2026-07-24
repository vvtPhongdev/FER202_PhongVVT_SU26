# PRACTICAL EXAM — Car Rental App (BaiMau2)
## FER202 — ReactJS | Time: 90 minutes

---

## APPLICATION DESCRIPTION

You will complete a **Car Rental App** — a car rental management system with 2 main collections:

- **cars**: list of cars (id, name, carTypeId, seats, transmission, priceWeekday, priceWeekend, lastServiced)
- **carTypes**: car categories (id, name)
- **users**: login accounts (id, username, password, role, fullName, **email**)

The application already has the structure, API, reducer, context, and basic pages provided. Your task is to **complete the TODOs** marked in the source code.

> **BaiMau2 variant** compared to the original exam (BaiMau): TODO-01 changed to role-based access (Admin / User), TODO-03 changed from Logout (now given) to a Name/Seats/Price sort dropdown, TODO-07 changed from Price Range to Price Weekday only.

---

## SAMPLE DATA (db.json)

- 3 users (1 Admin, 2 User) — each user has an **email** field
- 3 carTypes (Economy, SUV, Luxury)
- 15 cars — **5 cars per type**

```json
"users": [
  { "id": "1", "username": "admin", "password": "admin123", "role": "Admin", "fullName": "Rental Manager", "email": "admin@carrental.com" },
  { "id": "2", "username": "user1", "password": "user123",  "role": "User",  "fullName": "Nguyen Van A",   "email": "user1@carrental.com" },
  { "id": "3", "username": "agent", "password": "agent123", "role": "User", "fullName": "Tran Thi B", "email": "agent@carrental.com" }
],
"carTypes": [
  { "id": "1", "name": "Economy" },
  { "id": "2", "name": "SUV" },
  { "id": "3", "name": "Luxury" }
]
```

**Important note:** all 3 accounts (Admin and 2 Users) can **log in successfully** — there is no longer a restriction that "only Admin can log in" like in the original exam. The difference between Admin and User is in **action permissions** (Admin sees the full Add/Delete buttons, User only views the list in read-only mode) — see TODO-01.

---

## HOW TO RUN THE APPLICATION

```bash
# Run JSON Server (port 3001) + React Dev Server (port 5173) concurrently
npm start

# Run tests
npm test
```

> **Note:** `npm start` will automatically open the browser to the app's running page (Vite `server.open: true`). If the browser does not open automatically, manually go to the Vite address printed in the terminal (default `http://localhost:5173`) — the root page `/` requires login and will automatically redirect to the **Login** page.

---

## TODO LIST AND SCORING

| TODO | Description | Points |
|------|-------------|--------|
| TODO-01 | Login + CarList — login no longer blocks the User role; hide Add/Delete buttons when role != Admin (test rendering by role) | 1.0 |
| TODO-02 | Navbar — display user.email (bold) + user.role (Badge) | 1.0 |
| TODO-03 | CarList — dropdown to sort by Name / Seats / Price (ascending/descending), update pagination accordingly. *(Logout is already provided, no longer a TODO)* | 1.0 |
| TODO-04 | AddCar — useEffect fetch CarType, populate the dropdown | 1.0 |
| TODO-05 | CarDetail — useEffect fetch, Spinner, Alert, Back, Card | 1.0 |
| TODO-06 | CarRow — Delete with ModalConfirm | 1.0 |
| TODO-07 | CarRow — display only the Price Weekday column in the correct format (no more Price Range) | 0.5 |
| TODO-08 | AppFooter — display logo, copyright, version, appName | 0.5 |
| TODO-09 | NotFound — Design a standard 404 page | 1.0 |
| TODO-10A | CarTypeDetail — fetch data (Promise.all), redirect to 404 when id is invalid, display the list of cars | 1.0 |
| TODO-10B | ManageCarTypes — check whether a CarType is in use before deleting | 1.0 |
| **Total** | | **10.0** |

---

## TODO DETAILS

---

### TODO-01 — Login & CarList: Login without role restriction, hide buttons by permission (1.0 point)
**File:** `src/pages/Login.jsx`, `src/pages/CarList.jsx`
**Given (do not modify):** `src/api/authApi.js`, `src/components/CarRow.jsx`

**Requirements:**
1. `src/pages/Login.jsx` — in the `catch` block of `handleSubmit`, dispatch the `SET_ERROR` action with `err.message` to display the Alert (keep the same mechanism as before). **Key difference from the original exam:** both Admin and User log in successfully — `authApi.js` has already been provided and no longer throws "Access denied. Only Admin users can log in." The Alert now only appears for **invalid username/password**.
2. `src/pages/CarList.jsx` — use `useAuth()` to get `user`, compute `isAdmin = user?.role === 'Admin'`. If **not Admin** (User role) → **hide the "+ Add Car" button** and **hide the Delete button** on each car row (pass the prop `canManage={isAdmin}` down to `CarRow`; `CarRow` already has logic to show/hide Delete based on this prop). Users still see the **View** button to view car details.

**Technical requirements:**
```jsx
// Login.jsx - in catch
dispatch({ type: 'SET_ERROR', payload: err.message })

// CarList.jsx
const { user } = useAuth()
const isAdmin = user?.role === 'Admin'
// ...
{isAdmin && <Button onClick={() => navigate('/add')}>+ Add Car</Button>}
// ...
<CarRow car={r} index={...} onDelete={handleDelete} canManage={isAdmin} />
```

**Test scenarios:**
- Wrong username/password → Alert "Invalid username or password."
- Log in as `user1 / user123` (User role) → login **succeeds**, no Alert, enters CarList but **does not** see the Add Car / Delete buttons
- Log in as `admin / admin123` (Admin role) → sees the full Add Car / Delete buttons as normal

**Checklist:**
- [ ] `dispatch({ type: 'SET_ERROR', payload: err.message })` inside the Login catch block
- [ ] Alert only appears for wrong username/password, NOT when logging in with the User role
- [ ] `isAdmin` computed from `user?.role === 'Admin'` in CarList.jsx
- [ ] The "+ Add Car" button only shows when `isAdmin === true`
- [ ] The Delete button on each row only shows when `isAdmin === true` (via the `canManage` prop)
- [ ] The User role can still view the full car list (only the action buttons are hidden)

---

### TODO-02 — Navbar: Display email and role (1.0 point)
**File:** `src/components/AppNavbar.jsx`

**Requirement:** Inside `{isAuthenticated && user && (...)}`, display `user.email` and `user.role`.

**Technical requirements:**
- `user.email` must have the classes `fw-bold` and `text-white`
- `user.role` must be inside a React-Bootstrap `<Badge>` component
- Example: `<span className="text-white fw-bold">{user.email}</span>` and `<Badge bg="info">{user.role}</Badge>`

**Checklist:**
- [ ] `user.email` is displayed with the `fw-bold` class
- [ ] `user.role` is displayed inside a Badge component
- [ ] Not displayed when not authenticated

---

### TODO-03 — CarList: Name / Seats / Price sort dropdown (1.0 point)
**File:** `src/pages/CarList.jsx`
**Given (do not modify):** the Logout button in `src/components/AppNavbar.jsx` has been fully implemented (`handleLogout` calls `logoutUser()` then `navigate('/login')`) — **no longer a TODO** in this exam.

**Requirement:** Add a dropdown (`Form.Select`) that lets the user sort the car list by **Name**, **Seats**, or **Price** (each field has 2 directions, ascending/descending), and update pagination correctly after sorting.

**Technical requirements:**
```jsx
const [sortBy, setSortBy] = useState('')

const sorted = [...filtered].sort((a, b) => {
  switch (sortBy) {
    case 'name-asc': return a.name.localeCompare(b.name)
    case 'name-desc': return b.name.localeCompare(a.name)
    case 'seats-asc': return Number(a.seats) - Number(b.seats)
    case 'seats-desc': return Number(b.seats) - Number(a.seats)
    case 'price-asc': return a.priceWeekday - b.priceWeekday
    case 'price-desc': return b.priceWeekday - a.priceWeekday
    default: return 0
  }
})
// use `sorted` (instead of `filtered`) to compute totalPages/paginated
```

- The `Form.Select` must have `aria-label="Sort by"` (required so tests can find the dropdown)
- The options must use these exact values: `name-asc`, `name-desc`, `seats-asc`, `seats-desc`, `price-asc`, `price-desc` (the first option is a placeholder with `value=""`)
- When the sort value changes (`onChange`), you must call `setPage(1)` to reset to the first page (to avoid showing an empty page after sorting shortens the visible list)

**Checklist:**
- [ ] The dropdown has `aria-label="Sort by"` and all 6 options (name-asc/desc, seats-asc/desc, price-asc/desc)
- [ ] Selecting "Price (Low to High)" → the cheapest car appears in the first row
- [ ] Selecting "Seats (High to Low)" → the car with the most seats appears in the first row
- [ ] Changing the dropdown value → pagination resets to page 1
- [ ] Logout still works normally (already given, must not be modified)

---

### TODO-04 — AddCar: CarType list dropdown (1.0 point)
**File:** `src/pages/AddCar.jsx`

**Requirement:** In `useEffect`, call `fetchCarTypes()` and update the `carTypes` state to populate the car type selection dropdown. CarType is fetched from the db.json API (not from CarContext).

**Technical requirements:**
```jsx
const [carTypes, setCarTypes] = useState([])

useEffect(() => {
  fetchCarTypes().then(setCarTypes).catch(console.error)
}, [])
```

- `fetchCarTypes` is already imported from `../api/carApi`
- The dropdown must display all car types from db.json (Economy, SUV, Luxury)
- The first option is `"-- Select car type --"` (no value)

**Checklist:**
- [ ] `useState([])` declares `carTypes`
- [ ] `useEffect` calls `fetchCarTypes()` on mount
- [ ] The result is stored in the `carTypes` state via `setCarTypes`
- [ ] The dropdown displays all options from the API
- [ ] The placeholder option `"-- Select car type --"` has `value=""`

---

### TODO-05 — CarDetail: Fetch and display car details (1.0 point)
**File:** `src/pages/CarDetail.jsx`

**Requirement:** Complete the `useEffect` to fetch car data and display full information.

**Technical requirements:**
```jsx
useEffect(() => {
  fetchCarById(id)
    .then((data) => { setCar(data); setLoading(false) })
    .catch((err) => { setError(err.message || 'Failed to load car.'); setLoading(false) })
}, [id])
```

**When loading:** Return `<Spinner animation="border" className="d-block mx-auto mt-5" />`
**When error:** Return `<Alert variant="danger" role="alert">{error}</Alert>`
**When data is available:** Display a Card with:
- Back button: `<Button onClick={() => navigate(-1)}>← Back</Button>`
- Car Type inside `<Badge bg="primary">`
- Seats, Transmission
- Price Weekday: `formatVND(car.priceWeekday)`
- Price Weekend: `formatVND(car.priceWeekend)`
- Last Serviced: `formatDateDisplay(car.lastServiced)`

**Checklist:**
- [ ] `useEffect` calls `fetchCarById(id)`
- [ ] Spinner displays while loading (`.spinner-border`)
- [ ] Danger Alert displays on error
- [ ] Back button navigates to the previous page
- [ ] Card displays Car Type, Seats, Transmission, Price Weekday, Price Weekend, Last Serviced

---

### TODO-06 — CarRow: Delete with ModalConfirm (1.0 point)
**File:** `src/components/CarRow.jsx`

**Requirement:** When clicking Delete, show `ModalConfirm`. On confirm → call `onDelete(car.id)` and close the modal.

**Technical requirements:**
- The `showModal` state is already declared
- Delete button: `onClick={() => setShowModal(true)}` (this button is already wrapped in the `canManage` condition — see TODO-01, no need to modify that part)
- `handleDeleteConfirm`: calls `onDelete(car.id)` then `setShowModal(false)`
- ModalConfirm body can be: `"Are you sure you want to delete this car?"`

**Checklist:**
- [ ] Clicking Delete → the Modal appears
- [ ] Confirm → `onDelete(car.id)` is called
- [ ] Cancel → `onDelete` is NOT called
- [ ] The Modal closes after confirm or cancel

---

### TODO-07 — CarRow: Price Weekday column (0.5 point)
**File:** `src/components/CarRow.jsx`

**Requirement:** Replace the `—` price cell with `formatVND(car.priceWeekday)`. **Difference from the original exam:** this column **only displays the weekday price**, and NO LONGER displays the weekday-weekend price range (do not use `formatPriceRange` anymore).

**Technical requirements:**
- `formatVND` is imported from `../utils/format` (replacing `formatPriceRange`)
- Example result: `"500.000 ₫"` (vi-VN format, single value)
- The `₫` symbol must appear in the cell
- The weekend price (`car.priceWeekend`) must **not** be displayed in this column

**Checklist:**
- [ ] `formatVND(car.priceWeekday)` is called (not `formatPriceRange`)
- [ ] The weekday price displays correctly, with the `₫` symbol
- [ ] The weekend price does NOT appear in this column

---

### TODO-08 — AppFooter: Display app information (0.5 point)
**File:** `src/components/AppFooter.jsx`

**Requirement:** Inside the `<footer>` tag, display the logo, appName, copyright, version, and course from `about.js`.

**Technical requirements:**
- Must use the HTML `<footer>` tag
- `<img src={about.logo} alt="logo" width="24" height="24" />`
- Display `about.appName`, `about.copyright`, `about.version`, `about.course`
- Values come from `import about from '../data/about'` (do not hardcode)

**Values in about.js:**
```js
logo: '/images/logo.jpg'
copyright: '© 2026 Car Rental App'
version: 'v1.0.0'
course: 'FER202 — ReactJS'
appName: 'Car Rental App'
```

> **Note:** The actual image file is located at `public/images/logo.jpg`. With Vite, every file in the `public/` folder is served at the root path `/`, so `src` must be `/images/logo.jpg`.

**Checklist:**
- [ ] A `<footer>` tag exists in the DOM
- [ ] The logo `<img>` displays in the footer, with `src` equal to `about.logo`
- [ ] `about.copyright` is displayed
- [ ] `about.version` is displayed
- [ ] `about.course` is displayed

---

### TODO-09 — NotFound: Design the 404 page (1.0 point)
**File:** `src/pages/NotFound.jsx`

**Requirement:** Design a standard 404 page — display the error code, a clear message, and a button to navigate back home.

**Technical requirements:**
- The `*` route in `AppRoutes.jsx` must point to `<NotFound />` (already configured)
- The page must display **"404"**
- There must be a descriptive error message (e.g., `"Page Not Found"`)
- There must be a **"Back to Home"** button/link using `<Link to="/">` or `useNavigate()`

**Checklist:**
- [ ] The text "404" is displayed on the page
- [ ] A clear error message is shown
- [ ] A button/link back to the home page (`to="/"`)
- [ ] The `*` route points to `<NotFound />`

---

### TODO-10A — CarTypeDetail (1.0 point)
**File:** `src/pages/CarTypeDetail.jsx`

**Requirement:** Use `Promise.all` to fetch data. If `id` is invalid → redirect to the 404 page. Display the list of cars belonging to this type.

**Technical requirements:**
```jsx
const [carTypes, allCars] = await Promise.all([fetchCarTypes(), fetchCars()])
const found = carTypes.find((rt) => String(rt.id) === String(id))
if (!found) {
  navigate('/not-found', { replace: true })
  return
}
setCarType(found)
setCars(allCars.filter((r) => String(r.carTypeId) === String(id)))
setLoading(false)
```

**Checklist:**
- [ ] `Promise.all([fetchCarTypes(), fetchCars()])` is called
- [ ] When id is not found → `navigate('/not-found', { replace: true })`
- [ ] Spinner while loading, Alert on network error
- [ ] The "← Back to Car Types" button navigates back to `/car-types`
- [ ] The table only shows cars of the current type

---

### TODO-10B — ManageCarTypes: Check if a CarType is in use (1.0 point)
**File:** `src/pages/ManageCarTypes.jsx`

**Requirement:** Before deleting a CarType, call `fetchCars()` to check whether any car uses this type. If so → show an error message containing the CarType name, and disallow deletion.

**Checklist:**
- [ ] `fetchCars()` is called when clicking Delete
- [ ] If the CarType is in use → the modal body contains the CarType name
- [ ] If in use → `deleteCarType` is NOT called
- [ ] If not in use → deletes normally and updates the list

---

## FINAL SCORE SUMMARY

| TODO | File | Points |
|------|------|--------|
| TODO-01: Login + CarList — role rendering | `src/pages/Login.jsx`, `src/pages/CarList.jsx` | 1.0 |
| TODO-02: Navbar email + Badge | `src/components/AppNavbar.jsx` | 1.0 |
| TODO-03: CarList sort dropdown | `src/pages/CarList.jsx` | 1.0 |
| TODO-04: AddCar CarType dropdown | `src/pages/AddCar.jsx` | 1.0 |
| TODO-05: CarDetail fetch + display | `src/pages/CarDetail.jsx` | 1.0 |
| TODO-06: CarRow Delete Modal | `src/components/CarRow.jsx` | 1.0 |
| TODO-07: CarRow Price Weekday | `src/components/CarRow.jsx` | 0.5 |
| TODO-08: AppFooter about info | `src/components/AppFooter.jsx` | 0.5 |
| TODO-09: NotFound 404 page | `src/pages/NotFound.jsx` | 1.0 |
| TODO-10A: CarTypeDetail | `src/pages/CarTypeDetail.jsx` | 1.0 |
| TODO-10B: ManageCarTypes in-use check | `src/pages/ManageCarTypes.jsx` | 1.0 |
| **TOTAL** | | **10.0** |

---

## FOLDER STRUCTURE

```
template/
├── db.json                          # Sample data (DO NOT modify)
├── vite.config.js                   # Provided (DO NOT modify)
├── src/
│   ├── api/
│   │   ├── authApi.js               # Provided (DO NOT modify) — allows both Admin/User to log in
│   │   └── carApi.js                # Provided (DO NOT modify)
│   ├── context/
│   │   ├── AuthContext.jsx          # Provided (DO NOT modify)
│   │   └── CarContext.jsx           # Provided (DO NOT modify)
│   ├── reducer/
│   │   ├── authReducer.js           # Provided (DO NOT modify)
│   │   ├── carReducer.js            # Provided (DO NOT modify)
│   │   └── carTypeReducer.js        # Provided (DO NOT modify)
│   ├── utils/
│   │   ├── format.js                # Provided (DO NOT modify)
│   │   └── validate.js              # Provided (DO NOT modify)
│   ├── data/
│   │   └── about.js                 # Provided (DO NOT modify)
│   ├── routes/
│   │   ├── AppRoutes.jsx            # Provided (DO NOT modify)
│   │   └── ProtectedRoute.jsx       # Provided (DO NOT modify)
│   ├── components/
│   │   ├── AppNavbar.jsx            # TODO-02 (Logout already given, no longer TODO-03)
│   │   ├── AppFooter.jsx            # TODO-08
│   │   ├── ModalConfirm.jsx         # Provided (DO NOT modify)
│   │   ├── FilterBar.jsx            # Provided (DO NOT modify)
│   │   ├── CarTypeList.jsx          # Provided (DO NOT modify)
│   │   └── CarRow.jsx               # TODO-06, 07 (canManage prop already given)
│   ├── pages/
│   │   ├── Login.jsx                # TODO-01 (Alert part)
│   │   ├── CarList.jsx              # TODO-01 (hide buttons by role) + TODO-03 (sort dropdown)
│   │   ├── CarDetail.jsx            # TODO-05
│   │   ├── AddCar.jsx               # TODO-04
│   │   ├── ManageCarTypes.jsx       # TODO-10B
│   │   ├── CarTypeDetail.jsx        # TODO-10A
│   │   └── NotFound.jsx             # TODO-09
│   └── __tests__/                   # Test files (DO NOT modify)
```

---

## IMPORTANT NOTES

1. **DO NOT modify** files that have no TODO — points will be deducted for breaking existing logic
2. **Run the app:** `npm start` (starts JSON Server + React Dev Server together, opens browser automatically)
3. **Test accounts:** `admin / admin123` (Admin — full permissions), `user1 / user123` and `agent / agent123` (User — **can log in**, but read-only view only)
4. **formatVND** returns the format `"500.000 ₫"` (vi-VN locale)
5. The login session uses `sessionStorage` — closing the tab/browser will automatically log out, this is intended behavior (not a bug)
6. **lastServiced** is stored as `"dd/MM/yyyy"` — use `formatDateDisplay()` to display it
7. `ModalConfirm` is already imported in `CarRow.jsx` and `ManageCarTypes.jsx`
8. The sort dropdown (TODO-03) must use exactly `aria-label="Sort by"` and the specified values so tests can identify it correctly

---

## GOOD LUCK!
