import { Container, Content, HeaderLink, LinkContainer, Logout, Navigation, Options, Profile } from "./styles"
import { useNavigate, useResolvedPath } from "react-router-dom";
import { useUser } from '../../hooks/UserContext.jsx'

import { UserCircle, ShoppingCart } from "@phosphor-icons/react";

export const Header = () => {
    const navigate = useNavigate();
    const { logout, userInfo } = useUser()

    const { pathname } = useResolvedPath

    const logoutUser = () => {
        logout();
        navigate('/login')
    }
    return (
        <Container>
            <Content>
                <Navigation>
                    <div>
                        <HeaderLink to="/" $isActive={pathname === '/'}>Home</HeaderLink>
                        <hr></hr>
                        <HeaderLink to="/cardapio" $isActive={pathname === '/cardapio'}>Cardápio</HeaderLink>
                    </div>
                </Navigation>
                <Options>
                    <Profile>
                        <UserCircle color="#333" size={24} />
                        <div>
                            <p>
                                Olá, <span>{userInfo.name}</span>
                            </p>
                            <Logout onClick={logoutUser}>Sair</Logout>
                        </div>
                    </Profile>

                    <LinkContainer>
                        <ShoppingCart color="#fff" size={24} />
                        <HeaderLink to='/carrinho'>Carrinho</HeaderLink>
                    </LinkContainer>

                </Options>

            </Content>
        </Container>

    )

}