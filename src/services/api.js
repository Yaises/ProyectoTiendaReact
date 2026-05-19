const API_URL = 'https://api.escuelajs.co/api/v1'

export const PRODUCTS_LIMIT = 10

export async function getProducts(offset = 0, limit = PRODUCTS_LIMIT) {
  const response = await fetch(`${API_URL}/products?offset=${offset}&limit=${limit}`)

  if (!response.ok) {
    throw new Error('No se pudieron cargar los productos')
  }

  const products = await response.json()
  return products.filter(isValidProduct)
}

export async function getCategories() {
  const response = await fetch(`${API_URL}/categories`)

  if (!response.ok) {
    throw new Error('No se pudieron cargar las categorias')
  }

  const categories = await response.json()
  return categories.filter(category => category.id <= 5)
}

export async function getProductsByCategory(categoryId) {
  const response = await fetch(`${API_URL}/categories/${categoryId}/products`)

  if (!response.ok) {
    throw new Error('No se pudieron cargar los productos de la categoria')
  }

  const products = await response.json()
  return products.filter(isValidProduct)
}

function isValidProduct(product) {
  return product.id && product.title && product.price && product.images?.length > 0
}
