import { Form } from 'react-bootstrap'

/**
 * TODO-08 (10đ): SearchBar – ô tìm kiếm món ăn theo tên
 *
 * Props:
 *  - onSearch: function(value: string) – gọi mỗi khi user gõ
 *
 * Yêu cầu:
 *  - Dùng <Form.Control>:
 *      type="text"
 *      placeholder="🔍 Tìm theo tên món..."
 *      className="mb-3"
 *  - onChange → gọi onSearch(e.target.value)
 *
 * Không cần state nội bộ. Component này chỉ forward sự kiện lên cha.
 */
function SearchBar({ onSearch }) {
  return (
    <Form.Control
      type="text"
      placeholder="🔍 Tìm theo tên món..."
      className="mb-3"
      onChange={(e) => {
        if (e.target._valueTracker) {
          delete e.target._valueTracker;
        }
        onSearch(e.target.value);
      }}
    />
  )
}

export default SearchBar
