import { Card, Button, Badge } from 'react-bootstrap'

/**
 * TODO-01 (10đ): Render card hiển thị thông tin 1 món ăn
 *
 * Props:
 *  - menu: { id, name, price, category, available }
 *  - onDelete: function(id) – gọi khi user bấm nút Xóa
 *
 * Yêu cầu giao diện:
 *  1. Hiển thị tên món   (Card.Title)
 *  2. Hiển thị giá       (định dạng: "65,000 ₫")
 *  3. Hiển thị danh mục  (category)
 *  4. Badge trạng thái:
 *       available = true  → Badge bg="success"  text "Còn món"
 *       available = false → Badge bg="secondary" text "Hết món"
 *  5. Button "Xóa" variant="danger"
 *       onClick → gọi onDelete(menu.id)
 *
 * Gợi ý định dạng giá:
 *   menu.price.toLocaleString('vi-VN') + ' ₫'
 */
function MenuCard({ menu, onDelete }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{menu.name}</Card.Title>
        <Card.Text>
          {menu.price.toLocaleString('vi-VN')} ₫ · {menu.category}
        </Card.Text>
        <Badge bg={menu.available ? 'success' : 'secondary'} className="me-2">
          {menu.available ? 'Còn món' : 'Hết món'}
        </Badge>
        <Button variant="danger" size="sm" onClick={() => onDelete(menu.id)}>
          Xóa
        </Button>
      </Card.Body>
    </Card>
  )
}

export default MenuCard
