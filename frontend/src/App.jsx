import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
    return (
        <div>
            <Header />
            <Container className='py-3'>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/product/:id' element={<ProductPage />} />
                    <Route path='/cart' element={<CartPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                </Routes>
            </Container>
        </div>
    )
}

export default App