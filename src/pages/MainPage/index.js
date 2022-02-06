import Container from "../../components/Container/style";
import Content from "../../components/Content/style";
import Greetings from "../../components/MainPage/Greetings";
import Header from "../../components/MainPage/Header";
import Whiteboard from "../../components/MainPage/Whiteboard/Whiteboard";
import DateOf from "../../components/MainPage/Whiteboard/Date";
import List from "../../components/MainPage/Whiteboard/List";
import Description from "../../components/MainPage/Whiteboard/Description";
import Value from "../../components/MainPage/Whiteboard/Value";
import Balance from "../../components/MainPage/Whiteboard/Balance";
import BlncSpan from "../../components/MainPage/Whiteboard/BlncSpan";
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

export default function MainPage(){


    const [balance, setBalance] = useState('');
    const [items, setItems] = useState('');
    const {auth, login} = useAuth();
    const {sessionData, updateSessionData} = useSessionData();
    const sessionUser = sessionData.name;
    const navigate = useNavigate();
    
    const name = sessionUser.replace(/\s[a-zA-Z]{0,}/gm, '');

    useEffect(async () => {
        if(!sessionData || !auth){
            navigate('/')
        }
        else if(balance.length  === 0){
            const token = api.createConfig(auth);
            const req = await api.getAllTransactions(token);
            setBalance(req.data);
            console.log(req.data);
        }
    },[])



    function UpdateWhiteboard(){
        if(balance === (null || '') || balance.length === 0){
            return(
                <div style={{display:'flex', justifyContent: 'center', alignItems: 'center', height:'100%'}}>
                    <p> Não há registros de entrada ou saída </p>
                </div>
            )
        }
        else{
            let saldo = 0;
            return(
            <>
                <List style={{display:'flex', justifyContent: 'start', alignItems: 'center', color:'black'}}>
                    {balance.map((array) => {

                    
                    if(array.transaction.type === 'earning'){
                        saldo = saldo + parseFloat(array.transaction.value);
                    }
                    else{
                        saldo = saldo - parseFloat(array.transaction.value);
                    }

                    let formattedValue = Intl.NumberFormat('de-DE').format(array.transaction.value);

                    return(
                        <li style={{width:'100%', display:'flex', fontSize:'16px'}}> 
                            <DateOf> {array.time}</DateOf> <Description> <>{array.transaction.description}</> </Description> <Value color={array.transaction.type === 'earning' ? 'green' : 'red'}><>{formattedValue}</></Value> 
                        </li>
                    )})}
                </List>
                <Balance>
                    <BlncSpan color={'#000'} style={{fontWeight:'700'}}>SALDO:</BlncSpan>
                    <BlncSpan color={ saldo > 0 ? '#03AC00' : saldo < 0 ? '#C70000' : '#000'}>{Intl.NumberFormat('de-DE').format(saldo)}</BlncSpan>
                </Balance>
            </>
            )
        }
    }


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
                    <UpdateWhiteboard/>
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