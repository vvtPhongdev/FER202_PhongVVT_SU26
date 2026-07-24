import { Navbar, Container, ButtonGroup, Button } from 'react-bootstrap'
import { THEME_MODES, THEME_LABELS } from '../../data/themeConfig'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeNavbar() {
  const { mode, resolvedTheme, colors, changeMode } = useTheme()
  return (
    <Navbar style={{ background: colors.surface, borderBottom: `1px solid ${colors.border}` }}>
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand style={{ color: colors.text }}>Theme Switcher</Navbar.Brand>
        <div className="d-flex align-items-center gap-3">
          <span style={{ color: colors.textMuted }}>{resolvedTheme}</span>
          <ButtonGroup>
            {THEME_MODES.map(m => (
              <Button
                key={m}
                aria-label={`${m} theme`}
                variant={mode === m ? 'primary' : 'outline-secondary'}
                onClick={() => changeMode(m)}
              >
                {THEME_LABELS[m].split(' ')[0]}
              </Button>
            ))}
          </ButtonGroup>
        </div>
      </Container>
    </Navbar>
  )
}
