/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()
const CART_KEY = 'mi-tienda-cart'

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => readCart())

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  function addToCart(product) {
    setCart(prevCart => {
      const productInCart = prevCart.find(item => item.id === product.id)

      if (productInCart) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(item => item.id !== id))
  }

  function updateQuantity(id, quantity) {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  function clearCart() {
    setCart([])
  }

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}

function readCart() {
  try {
    const savedCart = localStorage.getItem(CART_KEY)
    return savedCart ? JSON.parse(savedCart) : []
  } catch {
    return []
  }
}
