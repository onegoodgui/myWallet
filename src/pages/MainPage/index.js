import Container from "../../components/Container/style";
import Content from "../../components/Content/style";
import Greetings from "../../components/MainPage/Greetings";
import Header from "../../components/MainPage/Header";
import Whiteboard from "../../components/MainPage/Whiteboard/Whiteboard";
import Button from "../../components/MainPage/Button/Button";
import ButtonContainer from "../../components/MainPage/Button/ButtonContainer";
import { AddCircleOutline } from 'react-ionicons'
import { RemoveCircleOutline } from "react-ionicons";
import { ExitOutline, LogOutOutline } from "react-ionicons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useSessionData from "../../hooks/useSessionData";
import api from "../../services/api";
import UpdateWhiteboard from "./UpdateWhiteboard";

export default function MainPage(){

    const [loading, setLoading] = useState(true)
    const [balance, setBalance] = useState('');
    const [items, setItems] = useState('');
    const {auth, login} = useAuth();
    const {sessionData, updateSessionData} = useSessionData();
    const sessionUser = sessionData.name;
    const navigate = useNavigate();
    
    const name = sessionUser.replace(/\s[a-zA-Z]{0,}/gm, '');

    useEffect( () => {
        async function dummyFunc(){
            if(!sessionData || !auth){
                navigate('/')
            }
                

            const token = api.createConfig(auth);
            const req = await api.getAllTransactions(token);
            setBalance(req.data);
            
            if(req.status !== 200){
                setLoading(true)
            }
            else{
                setLoading(false)
            }
            
        }
        dummyFunc()

    },[balance])

    // useEffect(() => {

    //     if(balance.length === 0){
    //         setLoading(true);
    //     }
    //     else{
    //         setLoading(false)
    //     }
    // },[balance])


    function Logout(){
        login(null);
        updateSessionData(null);
        navigate('/')
    }
    return(
        <Container>
            <Content alignItems={'center'} textColor={'white'}>
                <Header>
                    <Greetings> Olá, {name} </Greetings>
                    <LogOutOutline
                        color={'white'} 
                        height="35px"
                        width="35px"
                        onClick={() => Logout()}
                    />
                </Header>
                <Whiteboard>
                    <UpdateWhiteboard balance={balance} loading={loading}/>
                </Whiteboard>

                <ButtonContainer>
                    <Button onClick={() => {navigate('/new_earning')}}>
                        <AddCircleOutline
                            color={'white'} 
                            height="20px"
                            width="20px"
                            style={{position:'absolute', top: '6%', left: '4%'}}
                        />
                        <span> Nova Entrada </span>
                    </Button>

                    <Button onClick={() => {navigate('/new_expense')}}>
                        <RemoveCircleOutline
                                color={'white'} 
                                height="20px"
                                width="20px"
                                style={{position:'absolute', top: '6%', left: '4%'}}
                        />

                        <span> Nova Saída </span>
                    </Button>
                </ButtonContainer>

            </Content>
        </Container>
    )
}