import { Form } from 'react-bootstrap'
import { useTheme } from '../../context/ThemeContext'

export default function ThemedInput({ placeholder }) {
  const { colors } = useTheme()
  return (
    <Form.Control
      placeholder={placeholder}
      style={{
        background: colors.background,
        border: `1px solid ${colors.border}`,
        color: colors.text,
      }}
    />
  )
}
