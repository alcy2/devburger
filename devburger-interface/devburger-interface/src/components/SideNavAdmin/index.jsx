import { navLinks } from './navLinks'
import Logo from '../../assets/logo-burger.svg'

import { Container, Footer, NavLink, NavLinkContainer } from './styles.js'
import { useUser } from '../../hooks/UserContext.jsx';
import { resolvePath } from 'react-router-dom';

export function SideNavAdmin() {
    const { logout } = useUser()
    const { pathname } = resolvePath()

    return (
        <Container>
            <img src={Logo} alt='Hamburger-logo-devbuger' />
            <NavLinkContainer>
                {navLinks.map(link => (
                    <NavLink
                        key={link.id}
                        to={link.path}
                        $isActive={pathname === link.path}
                    >
                        {link.icon}
                        <span>{link.label}</span>
                    </NavLink>
                ))}
            </NavLinkContainer>
            <Footer>
                <NavLink to="/login" onClick={logout}>
                    <SignOut />
                    <span>Sair</span>
                </NavLink>
            </Footer>
        </Container>

    )
}