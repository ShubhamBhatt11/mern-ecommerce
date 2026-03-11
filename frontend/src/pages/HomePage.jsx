import { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'

function HomePage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/products')
                console.log(data) // ✅ inside async, data is ready here
                setProducts(data)
                setLoading(false)
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    if(loading) return <h2>Loading...</h2>
    if(error) return <h2>{error}</h2>

    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4}>
                        {/*<p>{product.name} — ₹{product.price}</p>*/}
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomePage