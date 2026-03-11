import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap'

function CartPage() {
    const [cartItems, setCartItems] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const items = localStorage.getItem('cartItems')
        if(items) {
            setCartItems(JSON.parse(items))
        }
    }, [])

    const removeFromCart = (id) => {
        const updatedCart = cartItems.filter(item => item._id !== id)
        setCartItems(updatedCart)
        localStorage.setItem('cartItems', JSON.stringify(updatedCart))
    }

    const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0)
    const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)

    // const checkoutHandler = () => {
    //     navigate('/login?redirect=shipping')
    // }

    const checkoutHandler = () => {
        const userInfo = localStorage.getItem('userInfo')
        if(!userInfo) {
            navigate('/login?redirect=shipping')
        } else {
            navigate('/shipping')
        }
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty. <Link to='/'>Go Shopping</Link></p>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item._id}>
                                <Row className='align-items-center'>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>₹{item.price}</Col>
                                    <Col md={2}>Qty: {item.qty}</Col>
                                    <Col md={2}>₹{item.qty * item.price}</Col>
                                    <Col md={1}>
                                        <Button
                                            type='button'
                                            variant='light'
                                            onClick={() => removeFromCart(item._id)}
                                        >
                                            X
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({totalItems} items)</h2>
                            ₹{totalPrice.toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='w-100'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartPage