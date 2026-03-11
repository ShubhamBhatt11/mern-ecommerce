import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'

function PaymentPage() {
    const [paymentMethod, setPaymentMethod] = useState('Razorpay')
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 />
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <h1>Payment Method</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className='mb-3'>
                        <Form.Label as='legend'>Select Method</Form.Label>
                        <Col>
                            <Form.Check
                                type='radio'
                                label='Razorpay'
                                id='Razorpay'
                                name='paymentMethod'
                                value='Razorpay'
                                checked={paymentMethod === 'Razorpay'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <Form.Check
                                type='radio'
                                label='Cash On Delivery'
                                id='CashOnDelivery'
                                name='paymentMethod'
                                value='CashOnDelivery'
                                checked={paymentMethod === 'CashOnDelivery'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                        Continue
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default PaymentPage