import { useState, useEffect } from 'react'
import { Row, Col, Form, Button, ListGroup } from 'react-bootstrap'
import axios from 'axios'

function ProfilePage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')

    useEffect(() => {
        // Set current user info in form
        setName(userInfo.name)
        setEmail(userInfo.email)

        // Fetch user orders
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get('/api/orders/myorders', {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                })
                setOrders(data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchOrders()
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }
        try {
            setLoading(true)
            setError(null)
            const { data } = await axios.put(
                '/api/users/profile',
                { name, email, password },
                { headers: { Authorization: `Bearer ${userInfo.token}` } }
            )
            // Update localStorage
            localStorage.setItem('userInfo', JSON.stringify(data))
            setSuccess(true)
            setLoading(false)
        } catch (err) {
            setError(err.response?.data?.message || err.message)
            setLoading(false)
        }
    }

    return (
        <Row>
            <Col md={4}>
                <h1>My Profile</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>Profile updated!</p>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' className='mb-3'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='email' className='mb-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='password' className='mb-3'>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Leave blank to keep current'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='confirmPassword' className='mb-3'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Leave blank to keep current'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button type='submit' variant='primary' disabled={loading}>
                        {loading ? 'Updating...' : 'Update Profile'}
                    </Button>
                </Form>
            </Col>
            <Col md={8}>
                <h1>My Orders</h1>
                {orders.length === 0 ? (
                    <p>No orders found</p>
                ) : (
                    <ListGroup>
                        {orders.map(order => (
                            <ListGroup.Item key={order._id}>
                                <Row>
                                    <Col md={3}>{order._id.substring(0, 10)}...</Col>
                                    <Col md={2}>₹{order.totalPrice}</Col>
                                    <Col md={3}>
                                        {order.isPaid ? (
                                            <span style={{ color: 'green' }}>Paid</span>
                                        ) : (
                                            <span style={{ color: 'red' }}>Not Paid</span>
                                        )}
                                    </Col>
                                    <Col md={2}>
                                        {order.isDelivered ? (
                                            <span style={{ color: 'green' }}>Delivered</span>
                                        ) : (
                                            <span style={{ color: 'red' }}>Pending</span>
                                        )}
                                    </Col>
                                    <Col md={2}>
                                        <a href={`/order/${order._id}`}>Details</a>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
        </Row>
    )
}

export default ProfilePage