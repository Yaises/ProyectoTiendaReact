import { useCart } from '../context/CartContext'

export default function ProductCard({ product, onSelect }) {
  const { addToCart } = useCart()

  function handleAddToCart(event) {
    event.stopPropagation()
    addToCart(product)
  }

  return (
    <div className="product-card" onClick={() => onSelect(product)}>
      <div className="product-img-wrap">
        <img
          src={product.images?.[0] || 'https://placehold.co/300x300?text=Sin+imagen'}
          alt={product.title}
          onError={event => { event.target.src = 'https://placehold.co/300x300?text=Sin+imagen' }}
        />
      </div>

      <div className="product-info">
        <p className="product-category">{product.category?.name || 'Sin categoria'}</p>
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">${product.price}</p>
      </div>

      <button className="btn-add-cart" onClick={handleAddToCart}>
        Anadir al carrito
      </button>
    </div>
  )
}
