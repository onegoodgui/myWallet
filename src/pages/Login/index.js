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
import useAuth from "../../hooks/useAuth";
import useSessionData from "../../hooks/useSessionData";
import api from "../../services/api";

export default function Login(){

    const [isLoading, setIsLoading] = useState(false)
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { auth, login } = useAuth();
    const { sessionData, updateSessionData} = useSessionData();
    const navigate = useNavigate();

    const loginItems = [{placeholder: 'E-mail', type: 'email', state: setEmail}, {placeholder: 'Senha', type: 'password', state: setPassword}];


    useEffect(() => {
        if(sessionData && auth.token){
            navigate('/mainpage')
        }
    },[])

    function RequestLogin(){
        
        setIsLoading(true);

        const user = {email: email, password: password};
        
            const promise = api.login(user);

            promise.then(res => {
                setIsLoading(false);
                console.log(res.data);
                login(res.data.token);
                updateSessionData(res.data.user);
                
                navigate('/mainpage')}
                );

            promise.catch(() => {
                setIsLoading(false);
                alert('Erro!')}
            );


    }

    function ButtonContent(){
        if(isLoading === true){
            return(
                <Loading color="#FFF" height={40} width={40}/> 
            )
        }
        else{
            return(<span>Entrar</span>)
        }
    }

    return(
        <Container>
            <Content alignItems={'center'}>
                <Logo>My Wallet</Logo>
                <Form method='post'>
                    {loginItems.map((item, index) => <Input disabled={isLoading === true? true : false} key= {index} placeholder={item.placeholder} type={item.type} onChange={(e) => item.state(e.target.value)}></Input> )}                    
                </Form>
                <Button onClick={() => RequestLogin()}>
                    <ButtonContent/>
                </Button>

                <Link to={`/sign-up`}> 
                    <LinkContent>Primeira vez? Cadastre-se!</LinkContent>
                </Link>

            </Content>
        </Container>
    )
}