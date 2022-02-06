import Container from "../../components/Container/style";
import Content from "../../components/Content/style";
import Header from "../../components/MainPage/Header";
import Greetings from "../../components/MainPage/Greetings";
import Button from "../../components/Forms/Button/style";
import Form from "../../components/Forms/Form/style";
import Input from "../../components/Forms/Input/style";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function NewEarning(){

    const [value, setValue] = useState();
    const [description, setDescription] = useState();
    const newExpenseItems = [{placeholder: 'Valor', type: 'number', state: setValue}, {placeholder: 'Descrição', type: 'text', state: setDescription}];
    const navigate = useNavigate();
    const {auth, login} = useAuth();

    function AddExpense(){
        const token = api.createConfig(auth);
        const type = 'expense'

        api.sendEarning({description, value, type}, token);
        navigate('/mainpage');
    }

    return(
        <Container style={{alignItems:'baseline'}}>
            <Content alignItems={'center'} textColor={'white'}>
                <Header>
                    <Greetings> Nova saída </Greetings>
                </Header>
                <Form method='post'>
                    {newExpenseItems.map((item, index) => <Input key= {index} placeholder={item.placeholder} type={item.type} onChange={(e) => item.state(e.target.value)}></Input> )}                    
                </Form>

                <Button onClick={() => AddExpense()}>
                    Salvar Saída
                </Button>

            </Content>
        </Container>
    )
}