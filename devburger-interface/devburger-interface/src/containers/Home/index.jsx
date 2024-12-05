import { CategoriesCarousel } from "../../components/CategoriesCarousel/index.jsx"
import { OffersCarousel } from "../../components/offersCarousel/index.jsx"
import { Banner, Container} from "./styles"



export const Home = () => {

    return (
        <main>
            <Banner>
                <h1>Bem-Vindo!(a)</h1>
            </Banner>
            <Container>
                <div>
                    <CategoriesCarousel />
                    <OffersCarousel />
                </div>
            </Container>
        </main>
    )
}