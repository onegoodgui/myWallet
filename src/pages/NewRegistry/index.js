import Container from "../../components/Container/style";
import Content from "../../components/Content/style";
import Header from "../../components/MainPage/Header";
import Greetings from "../../components/MainPage/Greetings";
import Button from "../../components/Forms/Button/style";
import Form from "../../components/Forms/Form/style";
import Input from "../../components/Forms/Input/style";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function NewRegistry(){

    const [header, setHeader] = useState('');
    const [buttonContent, setButtonContent] = useState('');
    const [value, setValue] = useState();
    const [description, setDescription] = useState();
    const newRegistryItems = [{placeholder: 'Valor', type: 'number', state: setValue}, {placeholder: 'Descrição', type: 'text', state: setDescription}];
    const navigate = useNavigate();
    const {auth, login} = useAuth();
    const location = useLocation();


    useEffect(() => {
        if(location.pathname.includes('expense')){
            setHeader('Nova saída');
            setButtonContent('Salvar saída');
        }
        else{
            setHeader('Nova entrada');
            setButtonContent('Salvar entrada');
        }
    },[])

    function addRegistry(){

        let type = '';
        if(location.pathname.includes('expense')){
            type = 'expense'
        }
        else{
            type = 'earning'
        }

        api.sendRegistry({description, value, type}, auth);
        navigate('/mainpage');
    }

    return(
        <Container style={{alignItems:'baseline'}}>
            <Content alignItems={'center'} textColor={'white'}>
                <Header>
                    <Greetings> {header} </Greetings>
                </Header>
                <Form method='post'>
                    {newRegistryItems.map((item, index) => <Input key= {index} placeholder={item.placeholder} type={item.type} onChange={(e) => item.state(e.target.value)}></Input> )}                    
                </Form>

                <Button onClick={addRegistry}>
                    {buttonContent}
                </Button>

            </Content>
        </Container>
    )
}