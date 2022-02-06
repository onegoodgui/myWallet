import Container from "../../components/Container/style";
import Content from "../../components/Content/style";
import Header from "../../components/MainPage/Header";
import Greetings from "../../components/MainPage/Greetings";
import Button from "../../components/Forms/Button/style";
import Form from "../../components/Forms/Form/style";
import Input from "../../components/Forms/Input/style";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";
import { Alarm } from "react-ionicons";


export default function NewEarning(){

    const [value, setValue] = useState();
    const [description, setDescription] = useState();
    const {auth, login} = useAuth();
    const newEarningItems = [{placeholder: 'Valor', type: 'number', state: setValue}, {placeholder: 'Descrição', type: 'text', state: setDescription}];
    const navigate = useNavigate();

    function AddEarning(){
        const token = api.createConfig(auth);
        const type = 'earning'

        api.sendEarning({description, value, type}, token);
        navigate('/mainpage');
    }

    return(
        <Container style={{alignItems:'baseline'}}>
            <Content alignItems={'center'} textColor={'white'}>
                <Header>
                    <Greetings> Nova entrada </Greetings>
                </Header>
                <Form method='post'>
                    {newEarningItems.map((item, index) => <Input key= {index} placeholder={item.placeholder} type={item.type} onChange={(e) => item.state(e.target.value)}></Input> )}                    
                </Form>

                <Button onClick={() => AddEarning()}>
                    Salvar Entrada
                </Button>

            </Content>
        </Container>
    )
}