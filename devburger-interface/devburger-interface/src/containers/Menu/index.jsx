import { useEffect, useState } from "react";
import { Banner, ButtonVoltar, CategoryButton, CategoryMenu, Container, ProductContainer } from "./styles"
import { api } from "../../services/api";
import { formatPrice } from "../../utils/formatPrice";
import { CardProduct } from "../../components/cardProduct";
import { useLocation, useNavigate } from "react-router-dom";


export const Menu = () => {
    const [categories, setCategories] = useState([]);

    const [products, setProducts] = useState([]);

    const [filteredProducts, setFilteredProducts] = useState([]);

    const navigate = useNavigate()

    const { search } = useLocation() // categoria=1

    const queryParams = new URLSearchParams(search)

    const [activeCategory, setActiveCategory] = useState(() => {
        const categoryId = +queryParams.get('categoria')

        if (categoryId) {
            return categoryId
        }
        return 0
    })



    useEffect(() => {
        async function loadCategories() {
            const { data } = await api.get('/categories')

            const newCategorias = [{ id: 0, name: 'todas' }, ...data];

            setCategories(newCategorias)
        }

        async function loadProduct() {
            const { data } = await api.get('/products')

            const newProduct = data.map((product) => ({
                currencyValue: formatPrice(product.price),
                ...product,
            }));

            setProducts(newProduct)
        }

        loadCategories()
        loadProduct()


    }, []);

    useEffect(() => {
        if (activeCategory === 0) {
            setFilteredProducts(products)
        } else {
            const newFilteredProducts = products.filter(
                product => product.category_id === activeCategory,
            );

            setFilteredProducts(newFilteredProducts

            )
        }
    }, [products, activeCategory])

    return (
        <Container>
            <Banner>
                <h1>O MELHOR
                    <br />
                    HAMBURGER
                    <br />
                    ESTÁ AQUI
                    <span>Esse cardápio está irresistível!</span>
                </h1>

            </Banner>
            <CategoryMenu>
                {categories.map(category => (
                    <CategoryButton
                        key={category.id}
                        $isActiveCategory={category.id === activeCategory}
                        onClick={() => {
                            navigate(
                                {   //endereçop http de cima 
                                    pathname: '/cardapio',
                                    search: `?categoria=${category.id}`
                                },
                                {   //altera a Url
                                    replace: true,
                                },

                            );
                            setActiveCategory(category.id)
                        }}

                    >{category.name}</CategoryButton>
                ))}
            </CategoryMenu>

            <ProductContainer>
                {filteredProducts.map((product) => (
                    <CardProduct product={product} key={product.id} />
                ))}
            </ProductContainer>
            <ButtonVoltar
                onClick={
                    navigate('/home')
                }
            >Voltar</ButtonVoltar>
        </Container>
    )
}