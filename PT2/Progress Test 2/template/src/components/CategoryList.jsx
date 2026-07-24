import { useNavigate } from 'react-router-dom'
import { Table, Button, Form, InputGroup } from 'react-bootstrap'
import { validateCategoryName } from '../utils/validate'

/**
 * CategoryList — Hiển thị bảng danh sách category với inline edit.
 *
 * Props:
 *   categories  {Array}    danh sách category
 *   editState   {Object}   { editingId, editValue, editError } từ editReducer
 *   editDispatch{Function} dispatch của editReducer
 *   onDelete    {Function} (category) → void — mở modal xác nhận xóa
 *   onSaveEdit  {Function} (id) → void — gọi API lưu
 */
export default function CategoryList({
  categories,
  editState,
  editDispatch,
  onDelete,
  onSaveEdit,
}) {
  const navigate = useNavigate()
  const { editingId, editValue, editError } = editState

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.length === 0 && (
          <tr>
            <td colSpan={3} className="text-center text-muted">No categories yet.</td>
          </tr>
        )}
        {categories.map((cat, i) => (
          <tr key={cat.id}>
            <td>{i + 1}</td>

            {/* Ô tên — hiển thị text hoặc inline edit */}
            <td>
              {editingId === cat.id ? (
                <>
                  <InputGroup>
                    <Form.Control
                      autoFocus
                      value={editValue}
                      isInvalid={!!editError}
                      onChange={(e) =>
                        editDispatch({ type: 'SET_VALUE', payload: e.target.value })
                      }
                      onBlur={() => {
                        /**
                         * onBlur xử lý qua reducer:
                         * Component tính error bằng validate util →
                         * dispatch BLUR với kết quả → reducer lưu vào editError
                         */
                        const error = validateCategoryName(editValue, categories, cat.id)
                        editDispatch({ type: 'BLUR', error })
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter')  onSaveEdit(cat.id)
                        if (e.key === 'Escape') editDispatch({ type: 'CANCEL' })
                      }}
                    />
                    <Button size="sm" variant="success" onClick={() => onSaveEdit(cat.id)}>
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => editDispatch({ type: 'CANCEL' })}
                    >
                      Cancel
                    </Button>
                  </InputGroup>
                  {editError && (
                    <div className="text-danger mt-1" style={{ fontSize: '0.85rem' }}>
                      {editError}
                    </div>
                  )}
                </>
              ) : (
                cat.name
              )}
            </td>

            {/* Actions */}
            <td>
              <Button
                size="sm"
                variant="outline-primary"
                className="me-2"
                onClick={() => navigate(`/categories/${cat.id}`)}
              >
                View
              </Button>
              <Button
                size="sm"
                variant="outline-warning"
                className="me-2"
                onClick={() => editDispatch({ type: 'START', id: cat.id, name: cat.name })}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => onDelete(cat)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
