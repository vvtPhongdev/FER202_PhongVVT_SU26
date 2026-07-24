/**
 * Visible tests — TODO-08: Footer từ about.js
 */
import { render, screen } from '@testing-library/react'
import AppFooter from '../components/AppFooter'
import about from '../data/about'

test('TODO-08: footer hiển thị copyright từ about.js', () => {
  render(<AppFooter />)
  expect(screen.getByText(new RegExp(about.copyright.replace('©', '\\©')))).toBeInTheDocument()
})

test('TODO-08: footer hiển thị version từ about.js', () => {
  render(<AppFooter />)
  expect(screen.getByText(new RegExp(about.version))).toBeInTheDocument()
})

test('TODO-08: footer hiển thị course từ about.js', () => {
  render(<AppFooter />)
  expect(screen.getByText(new RegExp(about.course))).toBeInTheDocument()
})
