import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import ProductDetail from '../components/ProductDetail'
import { getProducts, PRODUCTS_LIMIT } from '../services/api'

export default function Home() {
  const [products, setProducts] = useState([])
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  
  useEffect(() => {
    loadProducts(0, true)
  }, [])

  async function loadProducts(currentOffset, isFirstLoad = false) {
    if (isFirstLoad) {
      setLoading(true)
    } else {
      setLoadingMore(true)
    }

    setError('')

    try {
      const newProducts = await getProducts(currentOffset, PRODUCTS_LIMIT)

      if (isFirstLoad) {
        setProducts(newProducts)
      } else {
        setProducts(prevProducts => [...prevProducts, ...newProducts])
      }

      setOffset(currentOffset + PRODUCTS_LIMIT)
      setHasMore(newProducts.length === PRODUCTS_LIMIT)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  if (selectedProduct) {
    return <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
  }

  return (
    <div className="page-home">
      <h1 className="page-title">Todos los productos</h1>

      {error && <p className="error-msg">{error}</p>}

      {loading ? (
        <div className="loading-msg">Cargando productos...</div>
      ) : (
        <>
          <div className="products-grid">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={setSelectedProduct}
              />
            ))}
          </div>

          {products.length === 0 && (
            <p className="empty-msg">No hay productos que coincidan con la busqueda.</p>
          )}

          {hasMore && (
            <div className="load-more-wrap">
              <button
                className="btn-load-more"
                onClick={() => loadProducts(offset)}
                disabled={loadingMore}
              >
                {loadingMore ? 'Cargando mas productos...' : 'Cargar mas'}
              </button>
            </div>
          )}

          {!hasMore && products.length > 0 && (
            <p className="no-more-msg">Has llegado al final del catalogo.</p>
          )}
        </>
      )}
    </div>
  )
}
