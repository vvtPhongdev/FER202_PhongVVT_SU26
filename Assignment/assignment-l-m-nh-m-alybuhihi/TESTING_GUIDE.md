# 🧪 TESTING_GUIDE — Kiểm thử API bằng Postman

> Test toàn bộ REST API của json-server **trước và sau** khi tích hợp vào React. Nếu API sai thì code React đúng cũng không chạy — luôn test API trước.

---

## 1. Chuẩn bị

### Bước 1 — Cài Postman

Tải tại <https://www.postman.com/downloads/> (bản Desktop, không cần đăng nhập vẫn dùng được).

### Bước 2 — Chạy API server

```bash
npm run server
# json-server chạy tại http://localhost:3001
```

Kiểm tra nhanh: mở trình duyệt vào `http://localhost:3001/products` → thấy JSON là OK.

### Bước 3 — Tạo Collection và Environment

1. **Collection:** New → Collection → đặt tên `Product Management API`.
2. **Environment:** Environments → **+** → đặt tên `Local`:

| Variable | Initial value |
|----------|---------------|
| `base_url` | `http://localhost:3001` |

3. Chọn environment `Local` ở góc trên bên phải trước khi gửi request.

> Dùng `{{base_url}}` thay vì gõ cứng URL — sau này đổi port/host chỉ sửa 1 chỗ.

---

## 2. Bộ test cases

Tạo mỗi request bên dưới trong collection, đặt tên theo cột "Request".

### TC-01: GET danh sách sản phẩm (TODO-02)

| | |
|---|---|
| **Request** | `GET Products` |
| **Method** | `GET` |
| **URL** | `{{base_url}}/products` |

**Kết quả mong đợi:** Status `200 OK`, body là mảng 10 sản phẩm, mỗi phần tử có đủ `id, name, description, price, currentPrice, image`.

**Tab Tests — dán script:**

```js
pm.test("Status code is 200", () => {
    pm.response.to.have.status(200);
});

pm.test("Response is an array with 10 products", () => {
    const data = pm.response.json();
    pm.expect(data).to.be.an("array");
    pm.expect(data.length).to.be.at.least(10);
});

pm.test("Each product has required fields", () => {
    const data = pm.response.json();
    data.forEach((p) => {
        pm.expect(p).to.have.all.keys("id", "name", "description", "price", "currentPrice", "image");
    });
});
```

### TC-02: GET 1 sản phẩm theo id (TODO-08)

| | |
|---|---|
| **Request** | `GET Product By Id` |
| **Method** | `GET` |
| **URL** | `{{base_url}}/products/1` |

**Kết quả mong đợi:** Status `200 OK`, body là object sản phẩm id = 1.

```js
pm.test("Status code is 200", () => {
    pm.response.to.have.status(200);
});

pm.test("Correct product returned", () => {
    const p = pm.response.json();
    pm.expect(p.id).to.eql("1");
    pm.expect(p.name).to.include("LG Gram");
});
```

### TC-03: GET sản phẩm không tồn tại (error case — TODO-04, TODO-08)

| | |
|---|---|
| **Request** | `GET Product Not Found` |
| **Method** | `GET` |
| **URL** | `{{base_url}}/products/999` |

**Kết quả mong đợi:** Status `404 Not Found`. Đây là case mà React phải bắt bằng `try/catch` và hiển thị thông báo lỗi.

```js
pm.test("Status code is 404", () => {
    pm.response.to.have.status(404);
});
```

### TC-04: POST thêm sản phẩm mới (TODO-06)

| | |
|---|---|
| **Request** | `POST Create Product` |
| **Method** | `POST` |
| **URL** | `{{base_url}}/products` |
| **Headers** | `Content-Type: application/json` |

**Tab Body → raw → JSON:**

```json
{
  "name": "Laptop Test Postman",
  "description": "Sản phẩm test tạo bằng Postman",
  "price": "99.990.000",
  "currentPrice": "88.880.000",
  "image": "laptop1.png"
}
```

**Kết quả mong đợi:** Status `201 Created`, body trả về object kèm `id` mới do json-server tự sinh.

```js
pm.test("Status code is 201", () => {
    pm.response.to.have.status(201);
});

pm.test("Product created with auto-generated id", () => {
    const p = pm.response.json();
    pm.expect(p).to.have.property("id");
    pm.expect(p.name).to.eql("Laptop Test Postman");
    // Lưu id để dùng cho TC-05, TC-06
    pm.environment.set("created_id", p.id);
});
```

> Script trên lưu id vừa tạo vào biến `created_id` — các request sau dùng lại được.

### TC-05: PUT cập nhật sản phẩm (TODO-09)

| | |
|---|---|
| **Request** | `PUT Update Product` |
| **Method** | `PUT` |
| **URL** | `{{base_url}}/products/{{created_id}}` |
| **Headers** | `Content-Type: application/json` |

**Body → raw → JSON:**

```json
{
  "name": "Laptop Test Postman (UPDATED)",
  "description": "Đã được cập nhật bằng PUT",
  "price": "99.990.000",
  "currentPrice": "77.770.000",
  "image": "laptop1.png"
}
```

**Kết quả mong đợi:** Status `200 OK`, body chứa dữ liệu mới.

```js
pm.test("Status code is 200", () => {
    pm.response.to.have.status(200);
});

pm.test("Product was updated", () => {
    const p = pm.response.json();
    pm.expect(p.name).to.include("UPDATED");
    pm.expect(p.currentPrice).to.eql("77.770.000");
});
```

> ⚠️ **PUT thay thế toàn bộ object** — nếu body thiếu field nào thì field đó bị mất. Đây là lý do trang Edit (TODO-09) phải gửi đủ mọi field, kể cả `image`.

### TC-06: DELETE xóa sản phẩm (TODO-07)

| | |
|---|---|
| **Request** | `DELETE Product` |
| **Method** | `DELETE` |
| **URL** | `{{base_url}}/products/{{created_id}}` |

**Kết quả mong đợi:** Status `200 OK`. Gửi lại `GET {{base_url}}/products/{{created_id}}` → `404` (đã xóa thật).

```js
pm.test("Status code is 200", () => {
    pm.response.to.have.status(200);
});
```

### TC-07: POST body thiếu dữ liệu (validate — TODO-05)

| | |
|---|---|
| **Request** | `POST Empty Product` |
| **Method** | `POST` |
| **URL** | `{{base_url}}/products` |
| **Body** | `{}` |

**Lưu ý:** json-server **không tự validate** — nó vẫn trả `201` và tạo record rỗng. Điều này chứng minh: **việc validate là trách nhiệm của form React (TODO-05)**, không thể ỷ lại server. Sau khi test, nhớ DELETE record rỗng này đi.

---

## 3. Chạy cả collection tự động (Collection Runner)

1. Click chuột phải collection `Product Management API` → **Run collection**.
2. Kéo thả sắp xếp đúng thứ tự: TC-01 → TC-02 → TC-03 → TC-04 → TC-05 → TC-06.
3. Click **Run** → Postman chạy tuần tự toàn bộ request và báo pass/fail từng test.

**Kết quả mong đợi:** tất cả tests xanh ✅. Chụp màn hình kết quả runner để nộp kèm bài (bằng chứng đã test API).

---

## 4. Test lỗi kết nối (bắt buộc theo đề)

Đề yêu cầu app phải "handle errors when unable to fetch data from the API":

1. **Tắt json-server** (Ctrl+C ở terminal đang chạy `npm run server`).
2. Gửi lại `GET Products` trong Postman → `Error: connect ECONNREFUSED` — không có response.
3. Mở React app (`http://localhost:5173`) và reload → app **phải hiển thị thông báo lỗi** (Alert đỏ), không được trắng trang hay crash.
4. Bật lại server → reload → danh sách hiển thị bình thường.

---

## 5. Checklist testing trước khi nộp

- [ ] TC-01 → TC-06 pass toàn bộ trong Collection Runner
- [ ] GET `/products/999` trả 404, app React hiển thị lỗi thay vì crash
- [ ] POST từ form React tạo record trong `db.json` (kiểm tra bằng GET)
- [ ] PUT từ trang Edit không làm mất field `image`
- [ ] DELETE từ nút Delete xóa thật trong `db.json`
- [ ] Tắt server → app hiển thị error message
- [ ] Đã chụp screenshot kết quả Collection Runner

---

## 6. Mapping TODO ↔ Test case

| TODO | Test case liên quan |
|------|---------------------|
| TODO-02 (getProducts) | TC-01 |
| TODO-04 (loading/error) | TC-03 + mục 4 |
| TODO-05 (validate form) | TC-07 |
| TODO-06 (addProduct) | TC-04 |
| TODO-07 (deleteProduct) | TC-06 |
| TODO-08 (getProductById) | TC-02, TC-03 |
| TODO-09 (updateProduct) | TC-05 |
