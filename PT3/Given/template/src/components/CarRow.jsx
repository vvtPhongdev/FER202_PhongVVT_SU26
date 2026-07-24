import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ModalConfirm from './ModalConfirm'
import { formatVND } from '../utils/format'

export default function CarRow({ car, index, onDelete, canManage = true }) {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const handleDeleteConfirm = () => {
    // TODO-06: Goi onDelete(car.id) va dong modal
    onDelete(car.id)
    setShowModal(false)
  }

  return (
    <>
      <tr>
        <td>{index}</td>
        <td>{car.name}</td>
        <td>{car.carType}</td>
        <td>{car.seats}</td>
        <td>{car.transmission}</td>
        <td>{car.lastServiced}</td>
        {/* TODO-07: Thay the bang formatVND(car.priceWeekday) - chi hien thi gia weekday */}
        <td>{formatVND(car.priceWeekday)}</td>
        <td className="d-flex gap-2">
          <Button size="sm" variant="info" onClick={() => navigate(`/cars/${car.id}`)}>View</Button>
          {/* TODO-06: onClick mo modal xac nhan xoa (nut chi hien khi canManage - da cung cap san) */}
          {canManage && (
            <Button size="sm" variant="danger" onClick={() => setShowModal(true)}>Delete Car</Button>
          )}
        </td>
      </tr>
      {/* TODO-06: Them ModalConfirm voi show={showModal}, body chua car.name */}
      <ModalConfirm
        show={showModal}
        title="Confirm Delete"
        body="Are you sure you want to delete this car?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowModal(false)}
        confirmLabel="Delete"
        confirmVariant="danger"
      />
    </>
  )
}
