import { useCart } from '../context/CartContext'

export default function Navbar({ currentPage, setCurrentPage }) {
  const { totalItems } = useCart()

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => setCurrentPage('home')}>
        Mi Tienda
      </div>

      <div className="navbar-links">
        <button
          className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}
          onClick={() => setCurrentPage('home')}
        >
          Inicio
        </button>

        <button
          className={`nav-btn ${currentPage === 'categories' ? 'active' : ''}`}
          onClick={() => setCurrentPage('categories')}
        >
          Categorias
        </button>

        <button
          className={`nav-btn ${currentPage === 'cart' ? 'active' : ''}`}
          onClick={() => setCurrentPage('cart')}
        >
          Carrito {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </button>
      </div>
    </nav>
  )
}
