import cart from '../../assets/cart.svg';
import { ContainerButton } from './styles';

export function CardButton({ ...props }) {
    return (
        <ContainerButton {...props}>
            <img src={cart} alt='cartrinho-de-compras' />
        </ContainerButton>
    )
}