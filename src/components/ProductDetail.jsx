import { useCart } from '../context/CartContext'

export default function ProductDetail({ product, onBack }) {
  const { addToCart } = useCart()

  if (!product) return null

  return (
    <div className="product-detail">
      <button className="btn-back" onClick={onBack}>Volver</button>

      <div className="detail-content">
        <div className="detail-images">
          {product.images?.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`${product.title} ${index + 1}`}
              onError={event => { event.target.src = 'https://placehold.co/400x400?text=Sin+imagen' }}
            />
          ))}
        </div>

        <div className="detail-info">
          <p className="product-category">{product.category?.name || 'Sin categoria'}</p>
          <h1>{product.title}</h1>
          <p className="detail-price">${product.price}</p>
          <p className="detail-description">{product.description}</p>

          <div className="detail-extra">
            <p><strong>ID:</strong> {product.id}</p>
            <p><strong>Slug:</strong> {product.slug}</p>
            <p><strong>Creado:</strong> {product.creationAt}</p>
            <p><strong>Actualizado:</strong> {product.updatedAt}</p>
            <p><strong>Categoria:</strong> {product.category?.name}</p>
          </div>

          <button className="btn-buy" onClick={() => addToCart(product)}>
            Anadir al carrito
          </button>
        </div>
      </div>
    </div>
  )
}
