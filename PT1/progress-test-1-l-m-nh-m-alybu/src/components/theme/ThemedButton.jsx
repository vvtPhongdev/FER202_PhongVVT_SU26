import { Button } from 'react-bootstrap'
import { useTheme } from '../../context/ThemeContext'

export default function ThemedButton({ children, onClick, variant = 'primary' }) {
  const { colors } = useTheme()
  if (variant === 'primary') {
    return (
      <Button
        onClick={onClick}
        style={{ background: colors.primary, color: colors.primaryText, borderColor: colors.primary }}
      >
        {children}
      </Button>
    )
  }
  return (
    <Button
      variant="outline-secondary"
      onClick={onClick}
      style={{ color: colors.primary, borderColor: colors.primary, background: 'transparent' }}
    >
      {children}
    </Button>
  )
}
