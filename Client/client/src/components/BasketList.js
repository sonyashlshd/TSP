import { useContext, useState } from 'react'
import { AppContext } from './AppContext.js'
import { increment, decrement, remove } from '../http/basketAPI.js'
import { Table, Spinner, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import BasketItem from './BasketItem.js'
import { observer } from 'mobx-react-lite'

const BasketList = observer(() => {
    const { basket } = useContext(AppContext)
    const [fetching, setFetching] = useState(false)

    const navigate = useNavigate()

    const handleIncrement = (id) => {
        setFetching(true)
        increment(id)
            .then(
                data => basket.products = data.products
            )
            .finally(
                () => setFetching(false)
            )
    }

    const handleDecrement = (id) => {
        setFetching(true)
        decrement(id)
            .then(
                data => basket.products = data.products
            )
            .finally(
                () => setFetching(false)
            )
    }

    const handleRemove = (id) => {
        setFetching(true)
        remove(id)
            .then(
                data => basket.products = data.products
            )
            .finally(
                () => setFetching(false)
            )
    }

    if (fetching) {
        return <Spinner animation="border" />
    }

    return (
        <>
            {basket.count ? (
                <>
                    <Table striped bordered hover className="mt-5">
                        <thead>
                            <tr className="text-center">
                                <th>Наименование</th>
                                <th>Количество</th>
                                <th>Цена</th>
                                <th>Сумма</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {basket.products.map(item =>
                                <BasketItem
                                    key={item.id}
                                    increment={handleIncrement}
                                    decrement={handleDecrement}
                                    remove={handleRemove}
                                    {...item}
                                />
                            )}
                            <tr>
                                <th colSpan="3">Итого</th>
                                <th>{basket.sum}</th>
                                <th>руб.</th>
                            </tr>
                        </tbody>
                    </Table>
                    <Button className={"mt-4"} variant="outline-dark" size="lg" onClick={() => navigate('/checkout')}>Оформить заказ</Button>
                </>
            ) : (
                <p className={"mt-4"}>Ваша корзина пуста</p>
            )}
        </>
    )
})

export default BasketList