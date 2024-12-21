import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useLocation, useNavigate } from "react-router-dom"

import { Container, Form, InputGroup, Label, Input, LabelUpload, Select, SubmitButton, ErrorMenssage, ContainerCheckbox } from './styles.js'
import { useEffect } from "react"

import { api } from '../../../services/api.js'
import { toast } from "react-toastify";

const schema = yup
    .object({
        name: yup.string().required('Digite o nome do produto'),
        price: yup.number().positive().required('Digite o preço do produto').typeError('Digite o preço do produto'),
        category: yup.object().required('Escolha uma categoria'),
        offer: yup.bool(),
    })

export function EditProduct() {
    const [fileName, setFileName] = useState(null);
    const [categories, setCategories] = useState([]);

    const Navigate = useNavigate()

    const {
        state: { product },
    } = useLocation()

    useEffect(() => {
        async function loadCategories() {
            const { data } = await api.get('/categories');

            setCategories(data)
        }
        loadCategories()
    }, [])


    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = async (data) => {
        const productFormData = new FormData()

        productFormData.append('name', data.name);
        productFormData.append('price', data.price * 100);
        productFormData.append('category_id', data.category.id);
        productFormData.append('file', data.file[0]);
        productFormData.append('offer', data.offer);

        await toast.promise(api.put(`/products/${product.id}`, productFormData), {
            Pending: 'Editando o produto...',
            success: 'Produto editado com sucesso',
            error: 'Falha ao editar o produto, tente novamente',
        });

        setTimeout(() => {
            Navigate('/admin/produtos')
        }, 2000);
    }
    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)} >
                <InputGroup>
                    <Label>Nome</Label>
                    <Input type="text" {...register('name')}
                        defaultValue={product.name}
                    />
                    <ErrorMenssage>{errors?.name?.message}</ErrorMenssage>
                </InputGroup>

                <InputGroup>
                    <Label>Preço</Label>
                    <Input type="number" {...register('price')}
                        defaultValue={product.price / 100}
                    />
                    <ErrorMenssage>{errors?.price?.message}</ErrorMenssage>
                </InputGroup>

                <InputGroup>
                    <LabelUpload>
                        <Image />
                        <input type="file"
                            {...register('file')}
                            accept="image/png, image/jpeg"
                            onChange={(value) => {
                                setFileName(value.target.files[0]?.name)
                                register('file').onChange(value)
                            }}
                        />
                        {fileName || 'Upload do Produto'}
                    </LabelUpload>

                    <ErrorMenssage>{errors?.file?.message}</ErrorMenssage>
                </InputGroup>

                <InputGroup>
                    <Label>Categoria</Label>
                    <Controller
                        name="category"
                        control={control}
                        defaultValue={product.category}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={categories}
                                getOptionLabel={(category) => category.name}
                                getOptionValue={(category) => category.id}
                                placeholder='Categorias'
                                menuPortalTarget={document.body}
                                defaultValue={product.category}
                            />
                        )}
                    />
                    <ErrorMenssage>{errors?.category?.message}</ErrorMenssage>
                </InputGroup>

                <InputGroup>
                    <ContainerCheckbox>
                        <input type="checkbox" defaultChecked={product.offer} {...register('offer')} />
                        <Label>Produto em oferta </Label>
                    </ContainerCheckbox>
                </InputGroup>

                <SubmitButton>Editar produto</SubmitButton>
            </Form>
        </Container>
    )
}