import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'

function ShippingPage() {
    const existingShipping = localStorage.getItem('shippingAddress')
    const parsed = existingShipping ? JSON.parse(existingShipping) : {}

    const [address, setAddress] = useState(parsed.address || '')
    const [city, setCity] = useState(parsed.city || '')
    const [postalCode, setPostalCode] = useState(parsed.postalCode || '')
    const [country, setCountry] = useState(parsed.country || '')

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        localStorage.setItem('shippingAddress', JSON.stringify({
            address, city, postalCode, country
        }))
        navigate('/payment')
    }

    return (
        <div>
            <CheckoutSteps step1 step2 />
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <h1>Shipping</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='address' className='mb-3'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId='city' className='mb-3'>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter city'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId='postalCode' className='mb-3'>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter postal code'
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId='country' className='mb-3'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter country'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                        Continue
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default ShippingPage