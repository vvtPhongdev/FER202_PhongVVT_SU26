import axios from 'axios'

const API_URL = 'http://localhost:3001/products'

// TODO-02: GET danh sách sản phẩm
export const getProducts = async () => {
  const response = await axios.get(API_URL)
  return response.data
}
