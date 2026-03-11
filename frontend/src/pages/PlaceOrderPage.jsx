import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap'
import axios from 'axios'
import CheckoutSteps from '../components/CheckoutSteps'

function PlaceOrderPage() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Get data from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
    const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress') || '{}')
    const paymentMethod = JSON.parse(localStorage.getItem('paymentMethod') || '"Razorpay"')
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')

    // Calculate prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    const shippingPrice = itemsPrice > 1000 ? 0 : 100
    const taxPrice = Number((0.18 * itemsPrice).toFixed(2))
    const totalPrice = itemsPrice + shippingPrice + taxPrice

    useEffect(() => {
        if(cartItems.length === 0) {
            navigate('/cart')
        }
    }, [])

    const placeOrderHandler = async () => {
        try {
            setLoading(true)
            const { data } = await axios.post(
                '/api/orders',
                {
                    orderItems: cartItems,
                    shippingAddress,
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    taxPrice,
                    totalPrice
                },
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
            )
            // Clear cart
            localStorage.removeItem('cartItems')
            setLoading(false)
            navigate(`/order/${data._id}`)
        } catch (err) {
            setError(err.response?.data?.message || err.message)
            setLoading(false)
        }
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {shippingAddress.address}, {shippingAddress.city},{' '}
                                {shippingAddress.postalCode}, {shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p><strong>Method: </strong>{paymentMethod}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cartItems.length === 0 ? (
                                <p>Your cart is empty</p>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row className='align-items-center'>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>₹{itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>₹{shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax (18%)</Col>
                                    <Col>₹{taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col><strong>Total</strong></Col>
                                    <Col><strong>₹{totalPrice.toFixed(2)}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            {error && (
                                <ListGroup.Item>
                                    <p style={{ color: 'red' }}>{error}</p>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='w-100'
                                    disabled={cartItems.length === 0 || loading}
                                    onClick={placeOrderHandler}
                                >
                                    {loading ? 'Placing Order...' : 'Place Order'}
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderPage