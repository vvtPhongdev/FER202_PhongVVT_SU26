import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ModalConfirm from './ModalConfirm'
import { formatPriceRange } from '../utils/format'

export default function CarRow({ car, index, onDelete }) {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const handleDeleteConfirm = () => {
    // TODO-06: Gọi onDelete(car.id) và đóng modal
    onDelete(car.id)
    setShowModal(false)
  }

  return (
    <>
      <tr>
        <td>{index}</td>
        <td>{car.name}</td>
        <td>{car.carType}</td>
        <td>{car.brand}</td>
        <td>{car.transmission}</td>
        <td>{car.lastServiced}</td>
        {/* TODO-07: Thay thế bằng formatPriceRange(car.priceWeekday, car.priceWeekend) */}
        <td>{formatPriceRange(car.priceWeekday, car.priceWeekend)}</td>
        <td className="d-flex gap-2">
          <Button size="sm" variant="info" onClick={() => navigate(`/cars/${car.id}`)}>View</Button>
          {/* TODO-06: onClick mở modal xác nhận xoá */}
          <Button size="sm" variant="danger" onClick={() => setShowModal(true)}>Delete Car</Button>
        </td>
      </tr>
      {/* TODO-06: Thêm ModalConfirm với show={showModal}, body chứa car.name */}
      <ModalConfirm
        show={showModal}
        title="Confirm Delete"
        body="Are you sure you want to delete this car?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowModal(false)}
      />
    </>
  )
}
