import { Container } from 'react-bootstrap'
import { ThemeProvider, useTheme } from '../context/ThemeContext'
import ThemeNavbar from '../components/theme/ThemeNavbar'
import ThemedCard from '../components/theme/ThemedCard'
import ThemedButton from '../components/theme/ThemedButton'
import ThemedInput from '../components/theme/ThemedInput'

function ThemePageContent() {
  const { colors } = useTheme()
  return (
    <div style={{ minHeight: '100vh', background: colors.background, color: colors.text }}>
      <ThemeNavbar />
      <Container className="py-4">
        <ThemedCard title="Buttons">
          <div className="d-flex gap-2">
            <ThemedButton variant="primary">Primary</ThemedButton>
            <ThemedButton variant="outline">Outline</ThemedButton>
          </div>
        </ThemedCard>
        <ThemedCard title="Input">
          <ThemedInput placeholder="Nhập nội dung..." />
        </ThemedCard>
        <ThemedCard title="Demo">
          <p>Giao diện thay đổi theo theme được chọn.</p>
        </ThemedCard>
      </Container>
    </div>
  )
}

export default function Ex04ThemePage() {
  return (
    <ThemeProvider>
      <ThemePageContent />
    </ThemeProvider>
  )
}
