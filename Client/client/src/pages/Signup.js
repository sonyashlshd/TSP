import { AppContext } from '../components/AppContext.js'
import {useContext, useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Card, Form, Button } from 'react-bootstrap'
import { signup } from '../http/userAPI.js'
import { observer } from 'mobx-react-lite'

const Signup = observer(() => {
    const { user } = useContext(AppContext)
    const navigate = useNavigate()
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    // если пользователь авторизован — ему здесь делать нечего
    useEffect(() => {
        if (user.isAdmin) navigate('/admin', {replace: true})
        if (user.isAuth) navigate('/user', {replace: true})
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        // const email = event.target.email.value.trim()
        // const password = event.target.password.value.trim()
        const data = await signup(email, password)
        if (data) {
            user.login(data)
            if (user.isAdmin) navigate('/admin')
            if (user.isAuth) navigate('/user')
        }
    }

    return (
        <Container className="d-flex justify-content-center">
            <Card style={{width: '50%'}} className="p-2 mt-5 bg-light">
                <h3 className="m-auto">Регистрация</h3>
                <Form className="d-flex flex-column">
                    <Form.Control
                        name="email"
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        name="password"
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <p>
                            Уже есть аккаунт?
                            <Link to="/login"> Войдите!</Link>
                        </p>
                        <Button variant="outline-success" onClick={handleSubmit}>
                            Регистрация
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    )
})

export default Signup