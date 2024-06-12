import React, {useContext} from 'react';
import {Badge, Button, Container, Image, Nav, Navbar, NavLink} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {AppContext} from "./AppContext";
import FetchBasket from "./FetchBasket";
import CheckAuth from './CheckAuth.js'
import {useNavigate} from "react-router-dom";

const NavBar = observer(() => {
    const navigate = useNavigate()
    const {user, basket} = useContext(AppContext)
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <a href="/" title=""><Image src="https://i.postimg.cc/7L3n2wV3/logo.png" width="50%" className="img-fluid"/></a>
                 <Nav className="ml-auto">
                     <CheckAuth>
                         {user.isAuth ? (
                             <NavLink className="nav-link" onClick={() =>navigate('/user')}>Личный кабинет</NavLink>
                         ) : (
                             <>
                                 <NavLink className="nav-link" onClick={() =>navigate('/login')}>Войти</NavLink>
                                 <NavLink className="nav-link" onClick={() =>navigate('/signup')}>Регистрация</NavLink>
                             </>
                         )}
                         {user.isAdmin && (
                             <NavLink className="nav-link" onClick={() =>navigate('/admin')}>Панель управления</NavLink>
                         )}
                     </CheckAuth>
                     <FetchBasket>
                        <Button variant={"outline-light"} onClick={() =>navigate('/basket')}>
                            Корзина
                            {!!basket.count && <Badge className={"ms-1"} bg="secondary">{basket.count}</Badge>}
                        </Button>
                    </FetchBasket>
                </Nav>
            </Container>
        </Navbar>
    );
});

export default NavBar;