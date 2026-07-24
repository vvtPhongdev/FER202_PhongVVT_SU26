import { render, screen } from '@testing-library/react'
import AppFooter from '../components/AppFooter'
import about from '../data/about'

describe('TODO-08: AppFooter — hiển thị thông tin from about.js', () => {
  beforeEach(() => render(<AppFooter />))

  test('hiển thị copyright', () => {
    expect(screen.getByText(about.copyright)).toBeInTheDocument()
  })

  test('hiển thị version', () => {
    expect(screen.getByText(about.version)).toBeInTheDocument()
  })

  test('hiển thị course', () => {
    expect(screen.getByText(about.course)).toBeInTheDocument()
  })
})
