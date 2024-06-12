import BasketList from '../components/BasketList.js'
import { Container } from 'react-bootstrap'
import Pochta from '../components/Pochta'

const Basket = () => {
    return (
        <Container>
            <h1>Корзина</h1>
            <BasketList />
            <Pochta />
        </Container>
    )
}

export default Basket