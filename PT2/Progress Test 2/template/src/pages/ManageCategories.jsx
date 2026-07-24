import { useReducer, useEffect, useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from '../api/restaurantApi'
import {
  categoryFormReducer, formInitialState,
  editReducer, editInitialState,
} from '../reducer/categoryReducer'
import { validateCategoryName } from '../utils/validate'
import CategoryList from '../components/CategoryList'
import ModalConfirm from '../components/ModalConfirm'

export default function ManageCategories() {
  // ── Data state ────────────────────────────────────────────────────────────
  const [categories, setCategories] = useState([])
  const [pageError, setPageError] = useState(null)

  // ── Add-form state (qua reducer) ──────────────────────────────────────────
  const [form, formDispatch] = useReducer(categoryFormReducer, formInitialState)

  // ── Inline-edit state (qua reducer) ───────────────────────────────────────
  const [edit, editDispatch] = useReducer(editReducer, editInitialState)

  // ── Delete-modal state ────────────────────────────────────────────────────
  // TODO-10B: Thêm state deletingCategory (null) để theo dõi category đang xóa
  const [deletingCategory, setDeletingCategory] = useState(null)

  // ── Load ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((e) => setPageError(e.message))
  }, [])

  // ── Handlers ─────────────────────────────────────────────────────────────

  /** TODO-10B: Xác nhận xóa — gọi deleteCategory(id), cập nhật danh sách */
  const handleDeleteConfirm = async () => {
    // TODO-10B
    if (!deletingCategory) return

    try {
      await deleteCategory(deletingCategory.id)
      setCategories((prev) =>
        prev.filter((category) => category.id !== deletingCategory.id)
      )
      setDeletingCategory(null)
    } catch (err) {
      setPageError(err.message)
    }
  }

  /** Lưu inline edit — validate lần cuối trước khi gọi API */
  const handleSaveEdit = async (id) => {
    const error = validateCategoryName(edit.editValue, categories, id)
    if (error) {
      editDispatch({ type: 'SET_ERROR', payload: error })
      return
    }
    try {
      const updated = await updateCategory(id, { name: edit.editValue.trim() })
      setCategories((prev) => prev.map((c) => (c.id === id ? updated : c)))
      editDispatch({ type: 'CANCEL' })
    } catch (err) {
      setPageError(err.message)
    }
  }

  /** TODO-10A: Thêm category mới — validate, gọi addCategory, cập nhật danh sách */
  const handleAdd = async (e) => {
    e.preventDefault()
    formDispatch({ type: 'SET_VALIDATED', payload: true })

    if (!e.currentTarget.checkValidity()) {
      e.stopPropagation()
      return
    }

    // TODO-10A: Validate tên (validateCategoryName), gọi addCategory({ name }),
    //           cập nhật categories và reset form
    const name = form.newName.trim()
    const error = validateCategoryName(name, categories)
    if (error) {
      formDispatch({ type: 'SET_UNIQUE_ERROR', payload: true })
      return
    }

    try {
      const created = await addCategory({ name })
      setCategories((prev) => [...prev, created])
      formDispatch({ type: 'RESET' })
    } catch (err) {
      setPageError(err.message)
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div>
      <h3>Manage Categories</h3>

      {pageError && (
        <Alert variant="danger" dismissible onClose={() => setPageError(null)}>
          {pageError}
        </Alert>
      )}

      {/* Danh sách — delegate toàn bộ display + inline edit cho CategoryList */}
      <CategoryList
        categories={categories}
        editState={edit}
        editDispatch={editDispatch}
        onDelete={setDeletingCategory}
        onSaveEdit={handleSaveEdit}
      />

      {/* TODO-10A: Form thêm category mới */}
      <h5 className="mt-2">Add New Category</h5>
      <Form
        noValidate
        validated={form.validated}
        onSubmit={handleAdd}
        style={{ maxWidth: 400 }}
      >
        <Form.Group className="mb-2">
          <Form.Control
            required
            minLength={3}
            type="text"
            placeholder="e.g. Buffet"
            value={form.newName}
            isInvalid={form.uniqueError}
            onChange={(e) =>
              formDispatch({ type: 'SET_NAME', payload: e.target.value })
            }
            onBlur={(e) => {
              formDispatch({
                type: 'BLUR',
                isValid: e.target.checkValidity() && !form.uniqueError,
              })
            }}
          />
          <Form.Control.Feedback type="invalid">
            {form.uniqueError
              ? 'Category name already exists.'
              : 'Name is required and must be at least 3 characters.'}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="primary">Add</Button>
      </Form>

      {/* TODO-10B: <ModalConfirm> để xác nhận xóa category
          - show={!!deletingCategory}
          - title="Confirm Delete"
          - message: "Are you sure you want to delete category "[tên]"?"
          - onConfirm: handleDeleteConfirm
          - onCancel: setDeletingCategory(null) */}
      <ModalConfirm
        show={!!deletingCategory}
        title="Confirm Delete"
        message={
          <p>
            Are you sure you want to delete category{' '}
            <strong>{deletingCategory?.name}</strong>?
          </p>
        }
        confirmText="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingCategory(null)}
      />
    </div>
  )
}
