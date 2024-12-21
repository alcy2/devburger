/**
 * react-hook-form ajuda a trazer todos os dados de um formulario de uma vez só. 
 * schema validation -> validar os campos.
 */


import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';//ajuda a validar os campos baseado no (schema)
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { Container, Form, InputContainer, LeftContainer, Link, RightContainer, Title } from "./styles";
import Logo from '../../assets/logo-burger.svg';

import { Button } from "../../components/Button/index.jsx";
import { api } from '../../services/api.js'



export function Register() {
    const Navigate = useNavigate();

    const schema = yup.object({
        name: yup.string().required('O Nome é Obrigatório'),
        email: yup.string().email('Digite um e-mail válido').required('o e-mail é obrigatório'),
        password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Digite uma senha'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), 'As senhas devem ser iguais']).required('confirme sua senha'),
    }).required();

    /*
    resgister -> registra os inputs, quem é cada um
    handleSubmit -> lidar com submit, submeter o formulario; Vai lidar com informaçoes do formulario

    */
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    // const onSubmit = async (data) => {
    //     const response = await api.post('/session', {
    //         email: data.email,
    //         password: data.password,
    //     });

    //     console.log(response)
    // }

    const onSubmit = async (data) => {
        try {
            const { status } = await api.post("/users", {
                name: data.name,
                email: data.email,
                password: data.password,
            },
                {
                    //por padrão quando da erro, o axios não retorna status, então é preciso validar com ->
                    validateStatus: () => true,
                },
            );
            console.log(status)

            if (status === 200 || status === 201) {
                setTimeout(() => {
                    Navigate('/login')
                }, 2000);
                toast.success('Conta criada com sucesso!✅')
            } else if (status === 409) {
                toast.error('E-mail já cadastrado! faça login para continuar')
            } else {
                throw new Error()
            }
        } catch (error) {
            toast.error('falha no sistema! tente novamente')
        }

    }

    return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt="logo-burger" />
            </LeftContainer>

            <RightContainer>
                <Title>Criar conta</Title>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <label>Nome</label>
                        <input type="text"  {...register("name")} />
                        <p>{errors?.name?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <label>Email</label>
                        <input type="email"  {...register("email")} />
                        <p>{errors?.email?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <label>Senha</label>
                        <input type="password"  {...register("password")} />
                        <p>{errors?.password?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <label>Confirme a senha</label>
                        <input type="password"  {...register("confirmPassword")} />
                        <p>{errors?.confirmPassword?.message}</p>
                    </InputContainer>

                    <Button type="submit">Criar conta</Button>
                </Form>
                <p>
                    Já possui conta?
                    <Link to="/login">Clique aqui.</Link>
                </p>

            </RightContainer>
        </Container>


    )
}