import { useState, useEffect } from 'react'
import { Container, Spinner, Alert } from 'react-bootstrap'
import MenuList from '../components/MenuList'
import AddMenuForm from '../components/AddMenuForm'
import SearchBar from '../components/SearchBar'

import { fetchMenus, addMenu, deleteMenu } from '../services/restaurantService'

function MenuPage() {
  const [menus, setMenus] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchMenus()
      .then(data => setMenus(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleAdd = async (menuData) => {
    try {
      const newMenu = await addMenu(menuData)
      setMenus(prev => [...prev, newMenu])
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteMenu(id)
      setMenus(prev => prev.filter(m => m.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  const filtered = menus.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <Spinner animation="border" className="d-block mx-auto mt-5" />
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>
  }

  return (
    <Container className="py-4">
      <h2>🍽️ Thực Đơn</h2>
      <SearchBar onSearch={setSearchTerm} />
      <AddMenuForm onAdd={handleAdd} />
      <MenuList menus={filtered} onDelete={handleDelete} />
    </Container>
  )
}

export default MenuPage
