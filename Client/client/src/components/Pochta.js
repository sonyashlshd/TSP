import {Button, Card, Container, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useState} from "react";
import {pr} from "../http/basketAPI";


const Pochta = () => {
    const [index, SetIndex] = useState(null)
    const [cost, SetCost] = useState(null)
    const HandleClick = async () => {
        const res = await pr(index)
        SetCost(res.items.id)
    }
    return (
        <Container className="d-flex justify-content-center">
            <Card style={{width: '50%'}} className="p-2 mt-5 bg-light">
                <h3 className="m-auto">Расчёт стоимости отправления</h3>
                <Form className="d-flex flex-column">
                    <Form.Control
                        name="email"
                        className="mt-3"
                        placeholder="Введите ваш индекс..."
                        onChange={e => SetIndex(e.target.value)}
                    />
                    <Button onClick={HandleClick}>Рассчитать</Button>
                    <p>Стоимость: {cost} руб</p>
                </Form>
            </Card>
        </Container>
    )

}
export default Pochta


