import {useEffect, useState} from "react";
import {createCategory, createProdRating, fetchCategory, fetchOneProduct, updateCategory} from "../http/catalogAPI";
import {Button, Form, Modal} from "react-bootstrap";

const CreateRating = (props) => {
    const { productId, show, setShow, setChange } = props

    const [rate, setRating] = useState('')
    const [valid, setValid] = useState(null)

    useEffect(() => {
        if(productId) {
            fetchOneProduct(productId)
                .then(
                    data => {
                        setRating(data.rate)
                        setValid(data.rate > 0 && data.rate <= 5)
                    }
                )
                .catch(
                    error => alert(error.response.data.message)
                )
        } else {
            setRating('0')
            setValid(null)
        }
    }, [productId])

    const handleChange = (event) => {
        setRating(event.target.value)
        setValid(event.target.value.trim() > 0 && event.target.value.trim() <= 5)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        /*
         * На первый взгляд кажется, что переменная correct не нужна, можно обойтись valid, но это
         * не так. Нельзя использовать значение valid сразу после изменения этого значения — ф-ция
         * setValid не изменяет значение состояния мгновенно. Вызов функции лишь означает — React
         * «принял к сведению» наше сообщение, что состояние нужно изменить.
         */
        const correct = (rate.trim() > 0 && rate.trim() <= 5)
        setValid(correct)
        if (correct) {
            const data = {
                rate: rate.trim()
            }
            const success = (data) => {
                // закрываем модальное окно создания-редактирования категории
                setShow(false)
                // изменяем состояние родителя, чтобы обновить список категорий
                setChange(state => !state)
            }
            const error = (error) => alert(error.response.data.message)
            createProdRating(productId, data).then(success).catch(error)
        }
    }

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Оценка товара</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Control
                        name="rate"
                        value={rate}
                        onChange={e => handleChange(e)}
                        isValid={valid === true}
                        isInvalid={valid === false}
                        placeholder="Ваша оценка..."
                        className="mb-3"
                    />
                    <Button type="submit">Сохранить</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default CreateRating