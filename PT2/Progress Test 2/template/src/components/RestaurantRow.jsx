import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatPriceRange } from '../utils/format'
import ModalConfirm from './ModalConfirm'


function RestaurantRow({ restaurant, index, onDelete }) {
  const navigate = useNavigate()
  // TODO-06: Thêm state để quản lý hiển thị ModalConfirm
  // const [showModal, setShowModal] = useState(false)
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{restaurant.name}</td>
        <td>{restaurant.category}</td>
        <td>{restaurant.owner}</td>
        <td>{restaurant.address}</td>
        <td>{restaurant.openDate ?? '—'}</td>
        {/* TODO-07: Hiển thị khoảng giá dùng formatPriceRange(priceMin, priceMax) */}
        <td>{formatPriceRange(restaurant.priceMin, restaurant.priceMax)}</td>
        <td>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/restaurants/' + restaurant.id) }}>
            View
          </a>{' '}
          <a href="#" onClick={(e) => {
            e.preventDefault()
            // TODO-06: Khi nhấn Delete, hiển thị ModalConfirm
            setShowModal(true)
          }}>
            Delete
          </a>
        </td>
      </tr>

      {/* TODO-06: Thêm <ModalConfirm> với:
          - show={showModal}
          - title="Confirm Delete"
          - message: "Are you sure you want to delete "[tên]"?"
          - confirmText="Delete"
          - onConfirm: gọi onDelete(restaurant.id) và đóng modal
          - onCancel: đóng modal */}
      <ModalConfirm
        show={showModal}
        title="Confirm Delete"
        message={
          <p>
            Are you sure you want to delete <strong>{restaurant.name}</strong>?
          </p>
        }
        confirmText="Delete"
        onConfirm={() => {
          onDelete(restaurant.id)
          setShowModal(false)
        }}
        onCancel={() => setShowModal(false)}
      />
    </>
  )
}

export default RestaurantRow
