import { Card } from 'react-bootstrap'
import { useTheme } from '../../context/ThemeContext'

export default function ThemedCard({ title, children }) {
  const { colors } = useTheme()
  return (
    <Card
      className="mb-3"
      style={{ background: colors.surface, border: `1px solid ${colors.border}`, color: colors.text }}
    >
      <Card.Body>
        {title && <Card.Title>{title}</Card.Title>}
        {children}
      </Card.Body>
    </Card>
  )
}
