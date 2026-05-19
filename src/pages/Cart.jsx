import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function Cart({ setCurrentPage }) {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart()
  const [orderPlaced, setOrderPlaced] = useState(false)

  function handleOrder() {
    setOrderPlaced(true)
    clearCart()
  }

  if (orderPlaced) {
    return (
      <div className="page-cart">
        <div className="order-success">
          <h2>Pedido realizado con exito</h2>
          <p>Gracias por tu compra. Tu pedido esta siendo procesado.</p>
          <button className="btn-continue" onClick={() => { setOrderPlaced(false); setCurrentPage('home') }}>
            Seguir comprando
          </button>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="page-cart">
        <h1 className="page-title">Tu carrito</h1>
        <div className="empty-cart">
          <p>Tu carrito esta vacio</p>
          <button className="btn-continue" onClick={() => setCurrentPage('home')}>
            Ver productos
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-cart">
      <h1 className="page-title">Tu carrito</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img
                src={item.images?.[0] || 'https://placehold.co/80x80?text=?'}
                alt={item.title}
                onError={event => { event.target.src = 'https://placehold.co/80x80?text=?' }}
              />

              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p className="cart-item-price">${item.price} / unidad</p>
              </div>

              <div className="cart-item-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>

              <p className="cart-item-subtotal">${(item.price * item.quantity).toFixed(2)}</p>
              <button className="btn-remove" onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Resumen del pedido</h2>

          <div className="summary-lines">
            {cart.map(item => (
              <div key={item.id} className="summary-line">
                <span>{item.title} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="summary-total">
            <strong>Total</strong>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>

          <button className="btn-order" onClick={handleOrder}>
            Realizar pedido
          </button>
        </div>
      </div>
    </div>
  )
}
