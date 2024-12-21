import Logo from '../../assets/logo-burger.svg'
import { CartResume, CartItems } from '../../components'
import { Banner, Container, Content, Title } from './styles'

export const Cart = () => {
    return (
        <Container>
            <Banner>
                <img src={Logo} alt='logo-devburger' />
            </Banner>
            <Title>Checkout - pedidos</Title>
            <Content>
                <CartItems />
                <CartResume />
            </Content>

        </Container>
    )
}