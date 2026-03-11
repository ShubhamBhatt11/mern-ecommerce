import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import axios from 'axios'

function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()

        if(password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        try {
            setLoading(true)
            const { data } = await axios.post('/api/users/register', {
                name, email, password
            })

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
                    <h1>Register</h1>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name' className='mb-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
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
                        <Form.Group controlId='confirmPassword' className='mb-3'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Confirm password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button type='submit' variant='primary' disabled={loading}>
                            {loading ? 'Registering...' : 'Register'}
                        </Button>
                    </Form>
                    <Row className='py-3'>
                        <Col>
                            Already have an account?{' '}
                            <Link to='/login'>Login</Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default RegisterPage