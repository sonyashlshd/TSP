import { Container, Button } from 'react-bootstrap'
import { useContext } from 'react'
import { AppContext } from '../components/AppContext.js'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../http/userAPI.js'

const User = () => {
    const { user } = useContext(AppContext)
    const navigate = useNavigate()

    const handleLogout = (event) => {
        logout()
        user.logout()
        navigate('/login', {replace: true})
    }

    return (
        <Container>
            <h1>Личный кабинет</h1>
            <p className={"mt-4"}>
                Это личный кабинет постоянного покупателя магазина
            </p>
            <ul>
                <li><Link to="/user/orders">История заказов</Link></li>
            </ul>
            <Button className={"mt-5"} variant="outline-danger" size={"lg"} onClick={handleLogout}>Выйти</Button>
        </Container>
    )
}

export default User