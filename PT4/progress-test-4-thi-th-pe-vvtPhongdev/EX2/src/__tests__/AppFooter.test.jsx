import { render, screen } from '@testing-library/react'
import AppFooter from '../components/AppFooter'
import about from '../data/about'

describe('AppFooter — TODO-04', () => {
  test('TODO-04: renders logo img with src from about.logo', () => {
    const { container } = render(<AppFooter />)
    const img = container.querySelector('img')
    expect(img).not.toBeNull()
    expect(img.getAttribute('src')).toBe(about.logo)
  })

  test('TODO-04: renders appName from about.js', () => {
    render(<AppFooter />)
    expect(screen.getByText(about.appName, { exact: true })).toBeInTheDocument()
  })

  test('TODO-04: renders copyright text from about.js', () => {
    render(<AppFooter />)
    expect(screen.getByText(new RegExp(about.copyright.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))).toBeInTheDocument()
  })
})
