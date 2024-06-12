import { Container, Row, Col, Button, Image, Spinner, Table } from 'react-bootstrap'
import { useEffect, useState, useContext } from 'react'
import {createProdRating, fetchOneProduct, fetchProdRating} from '../http/catalogAPI.js'
import { useParams } from 'react-router-dom'
import { append } from '../http/basketAPI.js'
import { AppContext } from '../components/AppContext.js'
import EditCategory from "../components/EditCategory";
import CreateRating from "../components/CreateRating";
import Rating from "../components/Rating";

const Product = () => {
    const { id } = useParams()
    const { basket } = useContext(AppContext)
    const [product, setProduct] = useState(null)
    const [rating, setRating] = useState(null)
    const [show, setShow] = useState(false)
    const [change, setChange] = useState(false)

    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data))
        fetchProdRating(id).then(data => setRating(data))
    }, [id])

    const handleClick = (productId) => {
        append(productId).then(data => {
            basket.products = data.products
        })
    }

    const handleRating = (productId, rate) => {
        setRating(0)
        setShow(true)
    }

    if (!product) {
        return <Spinner animation="border" />
    }

    return (
        <Container>
            <Row className="mt-3 mb-3">
                <Col lg={4}>
                    {product.image ? (
                        <Image width={300} height={300} src={process.env.REACT_APP_IMG_URL + product.image} />
                    ) : (
                        <Image width={300} height={300} src="http://via.placeholder.com/300" />
                    )}
                </Col>
                <Col lg={8}>
                    <h1>{product.name}</h1>
                    <h3>{product.price}.00 руб.</h3>
                    <p>Категория: {product.category.name}</p>
                    <Rating />
                    <Button variant="outline-dark" size="lg" onClick={() => handleClick(product.id)}>Добавить в
                        корзину</Button>
                </Col>
            </Row>
            {!!product.props?.length &&
                <Row>
                    <Col>
                        <h3>Характеристики</h3>
                            <Table bordered hover size="sm">
                                <tbody>
                                    {product.props.map(item =>
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.value}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                    </Col>
                </Row>
            }
        </Container>
    )
}

export default Product