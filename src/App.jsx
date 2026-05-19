import { useState } from 'react'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Cart from './pages/Cart'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  function renderPage() {
    if (currentPage === 'categories') {
      return <Categories />
    }

    if (currentPage === 'cart') {
      return <Cart setCurrentPage={setCurrentPage} />
    }

    return <Home />
  }

  return (
    <CartProvider>
      <div className="app">
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="main-content">
          {renderPage()}
        </main>
      </div>
    </CartProvider>
  )
}

export default App
