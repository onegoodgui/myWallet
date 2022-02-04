import Container from "../../components/Container/style";
import Content from "../../components/Content/style";
import Logo from "../../components/Login/Logo/style";
import Input from "../../components/Forms/Input/style";
import Button from "../../components/Forms/Button/style";
import Form from "../../components/Forms/Form/style";
import LinkContent from "../../components/Login/Link/style";
import { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../services/loading";
import api from "../../services/api";

export default function SignUp(){
    const [isLoading, setIsLoading] = useState(false)
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const loginItems = [
        {placeholder: 'Nome', type: 'text', state: setName}, 
        {placeholder: 'E-mail', type: 'email', state: setEmail}, 
        {placeholder: 'Senha', type: 'password', state: setPassword},
        {placeholder: 'Confirme a senha', type: 'password', state: setConfirmPassword}

    ];

    function RequestSignUp(){
        setIsLoading(true);

        if(confirmPassword !== password){
            alert('Confirmação não respeitada. Redigite a senha');
            return
        }

        const user = {name: name, email: email, password: password};
        
            const promise = api.signUp(user);

            promise.then((res) => {
                console.log(res.data);
                setIsLoading(false);
                navigate('/');
            });

            promise.catch((error) => {
                console.log(error);
                setIsLoading(false);
                alert('Erro!');
            });

    }

    function ButtonContent(){
        if(isLoading === true){
            return(
                <Loading color="#FFF" height={40} width={40}/> 
            )
        }
        else{
            return(<span>Cadastrar</span>)
        }
    }

    return(
        <Container>
            <Content alignItems={'center'}>
                <Logo>My Wallet</Logo>
                <Form method='post'>
                    {loginItems.map((item, index) => <Input disabled={isLoading === true? true : false} key= {index} placeholder={item.placeholder} type={item.type} onChange={(e) => item.state(e.target.value)}></Input> )}
                </Form>
                    <Button onClick={() => RequestSignUp()}>
                        <ButtonContent/>
                    </Button>

                <Link to={`/`}> 
                    <LinkContent>Já tem uma conta? Entre agora!</LinkContent>
                </Link>
            </Content>
        </Container>
    )
}