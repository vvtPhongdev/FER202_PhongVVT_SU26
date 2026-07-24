# PRACTICAL EXAM — Car Rental Management App
## FER202 — ReactJS | Duration: 90 minutes

---

## APPLICATION DESCRIPTION

You will complete a **Car Rental Management App** — a car rental management system with 2 main collections:

- **cars**: list of cars (id, name, carTypeId, brand, transmission, priceWeekday, priceWeekend, lastServiced)
- **carTypes**: car types (id, name)
- **users**: login accounts (id, username, password, role, fullName, **email**)

The application already provides the base structure, API, reducer, context, and basic pages. Your task is to **complete the TODOs** marked in the source code.

---

## SAMPLE DATA (db.json)

- 3 users (1 Admin, 2 User) — each user has an **email** field
- 3 carTypes (Economy, SUV, Luxury)
- 15 cars — **5 cars per type**

---

## HOW TO RUN THE APPLICATION

```bash
# Run JSON Server (port 3001) + React Dev Server (port 5173) concurrently
npm start

# Run tests
npm test
```

---

## TODO LIST AND SCORING

| TODO | Description | Points |
|------|-------|------|
| TODO-01 | Login — show an Alert when login fails | 1.0 |
| TODO-02 | Navbar — display user.email (bold) + user.role (Badge) | 1.0 |
| TODO-03 | Navbar — Logout calls logoutUser() + navigate('/login') | 1.0 |
| TODO-04 | AddCar — useEffect fetches CarType, populates the dropdown | 1.0 |
| TODO-05 | CarDetail — useEffect fetch, Spinner, Alert, Back, Card | 1.0 |
| TODO-06 | CarRow — Delete with ModalConfirm | 1.0 |
| TODO-07 | CarRow — Price Range column using formatPriceRange() | 0.5 |
| TODO-08 | AppFooter — display logo, copyright, version, appName | 0.5 |
| TODO-09 | NotFound — design a proper 404 page | 1.0 |
| TODO-10 | CarTypeDetail — fetch data (Promise.all), redirect to 404 for invalid id, display car list | 2.0 |
| **Total** | | **10.0** |

---

## TODO DETAILS

---

### TODO-01 — Login: Display login error (1.0 point)
**File:** `src/pages/Login.jsx`

**Requirement:** In the `catch` block of the `handleSubmit` function, dispatch the `SET_ERROR` action with `err.message` to display the error message in an Alert.

**Technical requirements:**
- Call `dispatch({ type: 'SET_ERROR', payload: err.message })`
- The Alert must have `role="alert"` (the default Bootstrap Alert already has this)
- The Alert must display the exact error content returned by the server

**Error scenarios:**
- Wrong username/password → `"Invalid username or password."`
- Logging in with a User account (not Admin) → `"Access denied. Only Admin users can log in."`

**Checklist:**
- [ ] `dispatch({ type: 'SET_ERROR', payload: err.message })` in the catch block
- [ ] Alert is shown when `state.serverError` has a value
- [ ] Alert disappears when the username/password is retyped

---

### TODO-02 — Navbar: Display email and role (1.0 point)
**File:** `src/components/AppNavbar.jsx`

**Requirement:** Inside `{isAuthenticated && user && (...)}`, display `user.email` and `user.role`.

**Technical requirements:**
- `user.email` must have the `fw-bold` and `text-white` classes
- `user.role` must be rendered inside a React-Bootstrap `<Badge>` component
- Example: `<span className="text-white fw-bold">{user.email}</span>` and `<Badge bg="info">{user.role}</Badge>`

**Checklist:**
- [ ] `user.email` is displayed with the `fw-bold` class
- [ ] `user.role` is displayed inside a Badge component
- [ ] Not shown when not logged in

---

### TODO-03 — Navbar: Logout button (1.0 point)
**File:** `src/components/AppNavbar.jsx`

**Requirement:** Complete the `handleLogout` function and add a Logout button to the Navbar.

**Technical requirements:**
- `handleLogout` must call `logoutUser()` (from `useAuth()`)
- Then call `navigate('/login')`
- The Logout button has the text "Logout", variant `outline-light`, size `sm`
- The button must appear inside `{isAuthenticated && user && (...)}`

**Checklist:**
- [ ] `logoutUser()` is called when Logout is clicked
- [ ] `navigate('/login')` is called after logout
- [ ] The Logout button is shown when logged in
- [ ] Not shown when not logged in

---

### TODO-04 — AddCar: CarType dropdown list (1.0 point)
**File:** `src/pages/AddCar.jsx`

**Requirement:** In `useEffect`, call `fetchCarTypes()` and update the `carTypes` state to populate the car-type selection dropdown. CarType is fetched from the db.json API (not from CarContext).

**Technical requirements:**
```jsx
const [carTypes, setCarTypes] = useState([])

useEffect(() => {
  fetchCarTypes().then(setCarTypes).catch(console.error)
}, [])
```

- `fetchCarTypes` has already been imported from `../api/carApi`
- The dropdown must show all car types from db.json (Economy, SUV, Luxury)
- The first option is `"-- Select car type --"` (with no value)

**Checklist:**
- [ ] `carTypes` is declared with `useState([])`
- [ ] `useEffect` calls `fetchCarTypes()` on mount
- [ ] The result is stored in the `carTypes` state via `setCarTypes`
- [ ] The dropdown shows all options returned by the API
- [ ] The placeholder option `"-- Select car type --"` has `value=""`

---

### TODO-05 — CarDetail: Fetch and display car details (1.0 point)
**File:** `src/pages/CarDetail.jsx`

**Requirement:** Complete the `useEffect` to fetch car data and display the full details.

**Technical requirements:**
```jsx
useEffect(() => {
  fetchCarById(id)
    .then((data) => { setCar(data); setLoading(false) })
    .catch((err) => { setError(err.message || 'Failed to load car.'); setLoading(false) })
}, [id])
```

**While loading:** Return `<Spinner animation="border" className="d-block mx-auto mt-5" />`
**On error:** Return `<Alert variant="danger" role="alert">{error}</Alert>`
**When data is available:** Display a Card with:
- Back button: `<Button onClick={() => navigate(-1)}>← Back</Button>`
- Car Type inside `<Badge bg="primary">`
- Brand, Transmission
- Price Weekday: `formatVND(car.priceWeekday)`
- Price Weekend: `formatVND(car.priceWeekend)`
- Last Serviced: `formatDateDisplay(car.lastServiced)`

**Checklist:**
- [ ] `useEffect` calls `fetchCarById(id)`
- [ ] Spinner is shown while loading (`.spinner-border`)
- [ ] Danger Alert is shown on error
- [ ] The Back button navigates to the previous page
- [ ] The Card shows Car Type, Brand, Transmission, Price Weekday, Price Weekend, Last Serviced

---

### TODO-06 — CarRow: Delete with ModalConfirm (1.0 point)
**File:** `src/components/CarRow.jsx`

**Requirement:** When Delete is clicked, show `ModalConfirm`. On confirmation → call `onDelete(car.id)` and close the modal.

**Technical requirements:**
- The `showModal` state is already declared
- Delete button: `onClick={() => setShowModal(true)}`
- `handleDeleteConfirm`: calls `onDelete(car.id)` then `setShowModal(false)`
- The ModalConfirm body can be: `"Are you sure you want to delete this car?"`

**Checklist:**
- [ ] Clicking Delete → the Modal appears
- [ ] Confirm → `onDelete(car.id)` is called
- [ ] Cancel → `onDelete` is NOT called
- [ ] The Modal closes after confirm or cancel

---

### TODO-07 — CarRow: Price Range column (0.5 point)
**File:** `src/components/CarRow.jsx`

**Requirement:** Replace the `—` price cell with `formatPriceRange(car.priceWeekday, car.priceWeekend)`.

**Technical requirements:**
- `formatPriceRange` has already been imported from `../utils/format`
- Result: `"800.000 ₫ – 1.200.000 ₫"` (vi-VN format)
- The `₫` symbol must appear in the cell

**Checklist:**
- [ ] `formatPriceRange(car.priceWeekday, car.priceWeekend)` is called
- [ ] The weekday price is displayed correctly
- [ ] The weekend price is displayed correctly
- [ ] The `₫` symbol appears in the output

---

### TODO-08 — AppFooter: Display app info (0.5 point)
**File:** `src/components/AppFooter.jsx`

**Requirement:** Inside the `<footer>` tag, display the logo, appName, copyright, version, and course from `about.js`.

**Technical requirements:**
- Must use the HTML `<footer>` tag
- `<img src={about.logo} alt="logo" width="24" height="24" />`
- Display `about.appName`, `about.copyright`, `about.version`, `about.course`
- Values must come from `import about from '../data/about'` (do not hardcode)

**Values in about.js:**
```js
logo: '/images/logo.jpg'
copyright: '© 2026 Car Rental Management App'
version: 'v1.0.0'
course: 'FER202 — ReactJS'
appName: 'Car Rental Management App'
```

**Checklist:**
- [ ] The `<footer>` tag exists in the DOM
- [ ] The logo `<img>` is shown inside the footer, with `src` equal to `about.logo`
- [ ] The logo actually renders in the browser (no 404 from a wrong extension or wrong path prefix)
- [ ] `about.copyright` is displayed
- [ ] `about.version` is displayed
- [ ] `about.course` is displayed

---

### TODO-09 — NotFound: Design the 404 page (1.0 point)
**File:** `src/pages/NotFound.jsx`

**Requirement:** Design a proper 404 page — display the error code, a clear message, and a button to navigate back home.

**Technical requirements:**
- The `*` route in `AppRoutes.jsx` must point to `<NotFound />` (already configured)
- The page must display **"404"** (a clear number or text)
- Must include a descriptive error message (e.g. `"Page Not Found"`)
- Must include a **"Back to Home"** button/link using `<Link to="/">` or `useNavigate()`

**Example UI:**
```jsx
<Container className="text-center py-5">
  <h1 style={{ fontSize: '6rem', fontWeight: 'bold', color: '#dc3545' }}>404</h1>
  <h2 className="mb-3">Page Not Found</h2>
  <p className="text-muted mb-4">The page you are looking for does not exist or has been moved.</p>
  <Button as={Link} to="/" variant="primary">Back to Home</Button>
</Container>
```

**Checklist:**
- [ ] The text "404" is shown on the page
- [ ] A clear error message is displayed
- [ ] A button/link back to the home page (`to="/"`)
- [ ] The `*` route points to `<NotFound />`

---

### TODO-10A — CarTypeDetail (1.0 point)
**File:** `src/pages/CarTypeDetail.jsx`

> The "View Details" button in `CarTypeList.jsx` is already provided (not a TODO — students do not need to modify this file).

**Requirement:** In `CarTypeDetail`: use `Promise.all` to fetch data. If `id` is invalid → redirect to the 404 page. Display the list of cars belonging to this type.

**Technical requirements:**
```jsx
// CarTypeDetail.jsx — inside useEffect
const [carTypes, allCars] = await Promise.all([fetchCarTypes(), fetchCars()])
const found = carTypes.find((ct) => String(ct.id) === String(id))
if (!found) {
  navigate('/not-found', { replace: true })
  return
}
setCarType(found)
setCars(allCars.filter((c) => String(c.carTypeId) === String(id)))
setLoading(false)
```

**Display:**
- Back button: `onClick={() => navigate('/car-types')}` with text `"← Back to Car Types"`
- A Card with the car type's name and car count
- A table of cars (Name, Brand, Transmission, Price Range, Last Serviced)

**Checklist:**
- [ ] `Promise.all([fetchCarTypes(), fetchCars()])` is called
- [ ] id not found → `navigate('/not-found', { replace: true })`
- [ ] Spinner while loading, Alert on network error
- [ ] The "← Back to Car Types" button navigates to `/car-types`
- [ ] The table only shows cars of the type being viewed
- [ ] Redirecting to `/not-found` correctly shows the 404 page — it must **not** bounce to the Login page (see "How to test the not-found page" below)

You need to cover all of the following cases:
1. Never logged in + `/car-types/999` → goes to Login
2. Logged in, then unmount/remount (simulating a reload) at `/car-types/999` → shows the 404 page, **not** redirected to Login
3. Logout → unmount/remount on a protected route → goes to Login (session was cleared correctly)
4. Not logged in + any other invalid URL `/some-nonexistent-path` → shows the 404 page, is not automatically redirected to Login

See the full examples in `src/__tests__/AuthContext.test.jsx` and `src/__tests__/CarTypeDetail.test.jsx` (describe block `"TODO-10A: id không hợp lệ → hiển thị trang 404, KHÔNG redirect về Login"`).

---

### TODO-10B — ManageCarTypes: Check whether a CarType is in use (1.0 point)
**File:** `src/pages/ManageCarTypes.jsx`

**Requirement:** Before deleting a CarType, call `fetchCars()` to check whether any car is currently using this type. If so → show an error message **containing the CarType's name** in the dialog body, and do not allow the deletion.

**Technical requirements:**
```jsx
const handleDeleteClick = async (id, name) => {
  setTargetId(id)
  setTargetName(name)
  const cars = await fetchCars()
  const inUse = cars.some((c) => String(c.carTypeId) === String(id))
  if (inUse) {
    setDeleteError(`Car type "${name}" is currently in use and cannot be deleted.`)
  } else {
    setDeleteError(null)
  }
  setShowModal(true)
}
```

**Modal display:**
- If **in use**: title `"Cannot Delete"`, body contains the CarType name + error message, the confirm button changes to "OK" (no deletion)
- If **not in use**: title `"Confirm Delete"`, normal confirmation body, the "Delete" button performs the deletion

**Checklist:**
- [ ] `fetchCars()` is called when Delete is clicked
- [ ] If the CarType is in use → the modal body contains the **CarType's name**
- [ ] If in use → `deleteCarType` is NOT called
- [ ] If not in use → deletion proceeds normally and the list is updated
- [ ] The Modal closes after handling

---

## FINAL SCORE SUMMARY

| TODO | File | Points |
|------|------|------|
| TODO-01: Login Alert | `src/pages/Login.jsx` | 1.0 |
| TODO-02: Navbar email + Badge | `src/components/AppNavbar.jsx` | 1.0 |
| TODO-03: Navbar Logout | `src/components/AppNavbar.jsx` | 1.0 |
| TODO-04: AddCar CarType dropdown | `src/pages/AddCar.jsx` | 1.0 |
| TODO-05: CarDetail fetch + display | `src/pages/CarDetail.jsx` | 1.0 |
| TODO-06: CarRow Delete Modal | `src/components/CarRow.jsx` | 1.0 |
| TODO-07: CarRow Price Range | `src/components/CarRow.jsx` | 0.5 |
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
├── src/
│   ├── api/
│   │   ├── authApi.js               # Provided (DO NOT modify)
│   │   └── carApi.js                # Provided (DO NOT modify)
│   ├── context/
│   │   ├── AuthContext.jsx          # Provided (DO NOT modify) — saves/restores the login session via localStorage
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
│   │   ├── AppNavbar.jsx            # TODO-02, 03
│   │   ├── AppFooter.jsx            # TODO-08
│   │   ├── ModalConfirm.jsx         # Provided (DO NOT modify)
│   │   ├── FilterBar.jsx            # Provided (DO NOT modify)
│   │   ├── CarTypeList.jsx          # Provided (DO NOT modify)
│   │   └── CarRow.jsx               # TODO-06, 07
│   ├── pages/
│   │   ├── Login.jsx                # TODO-01
│   │   ├── CarList.jsx              # Provided (DO NOT modify)
│   │   ├── CarDetail.jsx            # TODO-05
│   │   ├── AddCar.jsx               # TODO-04
│   │   ├── ManageCarTypes.jsx       # TODO-10
│   │   ├── CarTypeDetail.jsx        # TODO-10
│   │   └── NotFound.jsx             # TODO-09
│   └── __tests__/                   # Test files (DO NOT modify)
```

---

## IMPORTANT NOTES

1. **Do NOT modify** files that have no TODO — points will be deducted if you break existing logic
2. **Run the app:** `npm start` (starts JSON Server + React Dev Server together)
3. **Test account:** `admin / admin123` (Admin role — allowed to log in)
4. The account `user1 / user123` has the User role — login will be denied
5. **formatPriceRange** returns the format `"800.000 ₫ – 1.200.000 ₫"` (vi-VN locale)
7. **lastServiced** is stored as `"dd/MM/yyyy"` — use `formatDateDisplay()` to display it
8. `ModalConfirm` is already imported in `CarRow.jsx` and `ManageCarTypes.jsx`

---

## GOOD LUCK WITH YOUR EXAM!
