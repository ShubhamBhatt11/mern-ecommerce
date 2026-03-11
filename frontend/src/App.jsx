import {Routes, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ShippingPage from './pages/ShippingPage'
import PaymentPage from './pages/PaymentPage'
import PlaceOrderPage from './pages/PlaceOrderPage'
import OrderPage from './pages/OrderPage'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
    return (
        <div>
            <Header/>
            <Container className='py-3'>
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/product/:id' element={<ProductPage/>}/>
                    <Route path='/cart' element={<CartPage/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/register' element={<RegisterPage/>}/>
                    <Route path='/shipping' element={
                        <ProtectedRoute><ShippingPage/></ProtectedRoute>
                    }/>
                    <Route path='/payment' element={
                        <ProtectedRoute><PaymentPage/></ProtectedRoute>
                    }/>
                    <Route path='/placeorder' element={
                        <ProtectedRoute><PlaceOrderPage/></ProtectedRoute>
                    }/>
                    <Route path='/order/:id' element={
                        <ProtectedRoute><OrderPage/></ProtectedRoute>
                    }/>
                    <Route path='/profile' element={
                        <ProtectedRoute><ProfilePage/></ProtectedRoute>
                    }/>
                </Routes>
            </Container>
        </div>
    )
}

export default App