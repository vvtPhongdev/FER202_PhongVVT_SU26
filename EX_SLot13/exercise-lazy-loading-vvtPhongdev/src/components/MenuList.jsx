import { Row, Col } from 'react-bootstrap'
import MenuCard from './MenuCard'

/**
 * TODO-03 (10đ): Render danh sách các MenuCard
 *
 * Props:
 *  - menus: array các món ăn
 *  - onDelete: function(id) – truyền xuống từng MenuCard
 *
 * Yêu cầu:
 *  1. Nếu menus rỗng → hiển thị đoạn văn bản:
 *       "Không có món ăn nào. Hãy thêm món mới!"
 *     (đặt trong thẻ <p> với className="text-center text-muted mt-4")
 *  2. Nếu có dữ liệu → render lưới Row/Col:
 *       xs={1}  md={2}  lg={3}  className="g-3"
 *     Mỗi Col chứa 1 <MenuCard>
 *       key = menu.id
 *       menu = menu
 *       onDelete = onDelete
 */
function MenuList({ menus, onDelete }) {
  if (!menus || menus.length === 0) {
    return (
      <p className="text-center text-muted mt-4">
        Không có món ăn nào. Hãy thêm món mới!
      </p>
    )
  }

  return (
    <Row xs={1} md={2} lg={3} className="g-3">
      {menus.map(menu => (
        <Col key={menu.id}>
          <MenuCard menu={menu} onDelete={onDelete} />
        </Col>
      ))}
    </Row>
  )
}

export default MenuList
