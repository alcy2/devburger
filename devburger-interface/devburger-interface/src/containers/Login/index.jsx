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

import { useUser } from "../../hooks/UserContext.jsx";

import { Button } from "../../components/Button/index.jsx";
import { api } from '../../services/api.js'



export function Login() {
    const { putUserData } = useUser()

    const Navigate = useNavigate()

    const schema = yup.object({
        email: yup.string().email('Digite um e-mail válido').required('o e-mail é obrigatório'),
        password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Digite uma senha'),
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

    //em api's é bom colocar try e catch

    const onSubmit = async (data) => {
        const { data: userData } = await toast.promise(api.post("/session", {
            email: data.email,
            password: data.password,
        }),
            {
                pending: 'Verificando seus dados',
                success: {
                    render() {
                        setTimeout(() => {
                            if (userData?.admin) {
                                Navigate('/admin/pedidos')
                            } else {
                                Navigate('/')
                            }
                            ;
                            ;
                        }, 2000);
                        return 'Seja Bem-vindo(a) 👌';
                    }

                },
                error: 'Email ou Senha Incorretos 🤯'
            }
        );
        putUserData(userData)
    }

    return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt="logo-burger" />
            </LeftContainer>

            <RightContainer>
                <Title>
                    Olá, seja bem vindo ao <span>Dev Burguer!</span>
                    <br />
                    Acesse com seu <span>Login e senha.</span>
                </Title>

                <Form onSubmit={handleSubmit(onSubmit)}>
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

                    <Button type="submit">Entrar!</Button>
                </Form>
                <p>
                    Não possui conta?
                    <Link to="/cadastro">Clique aqui.</Link>
                </p>

            </RightContainer>
        </Container>


    )
}