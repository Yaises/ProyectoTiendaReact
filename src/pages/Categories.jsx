import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import ProductDetail from '../components/ProductDetail'
import { getCategories, getProductsByCategory } from '../services/api'

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [products, setProducts] = useState([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [error, setError] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    async function loadCategories() {
      try {
        const apiCategories = await getCategories()
        setCategories(apiCategories)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoadingCategories(false)
      }
    }

    loadCategories()
  }, [])

  async function loadCategoryProducts(category) {
    setSelectedCategory(category)
    setLoadingProducts(true)
    setError('')

    try {
      const apiProducts = await getProductsByCategory(category.id)
      setProducts(apiProducts)
    } catch (err) {
      setError(err.message)
      setProducts([])
    } finally {
      setLoadingProducts(false)
    }
  }

  if (selectedProduct) {
    return <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
  }

  return (
    <div className="page-categories">
      <h1 className="page-title">Categorias</h1>

      {error && <p className="error-msg">{error}</p>}

      {loadingCategories ? (
        <div className="loading-msg">Cargando categorias...</div>
      ) : (
        <div className="categories-tabs">
          {categories.map(category => (
            <button
              key={category.id}
              className={`cat-tab ${selectedCategory?.id === category.id ? 'active' : ''}`}
              onClick={() => loadCategoryProducts(category)}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      {selectedCategory && (
        <div className="category-products">
          <h2>{selectedCategory.name}</h2>

          {loadingProducts ? (
            <div className="loading-msg">Cargando productos...</div>
          ) : products.length === 0 ? (
            <p className="empty-msg">No hay productos en esta categoria.</p>
          ) : (
            <div className="products-grid">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={setSelectedProduct}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {!selectedCategory && !loadingCategories && (
        <p className="hint-msg">Selecciona una categoria para ver sus productos.</p>
      )}
    </div>
  )
}
