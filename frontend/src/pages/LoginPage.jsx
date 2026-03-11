import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import axios from 'axios'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const { data } = await axios.post('/api/users/login', { email, password })

            // Save user info to localStorage
            localStorage.setItem('userInfo', JSON.stringify(data))

            setLoading(false)
            navigate('/')
        } catch (err) {
            setError(err.response?.data?.message || err.message)
            setLoading(false)
        }
    }

    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>
                    <h1>Sign In</h1>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='email' className='mb-3'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='password' className='mb-3'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button type='submit' variant='primary' disabled={loading}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </Button>
                    </Form>
                    <Row className='py-3'>
                        <Col>
                            New Customer?{' '}
                            <Link to='/register'>Register</Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage