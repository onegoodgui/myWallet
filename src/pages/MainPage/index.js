import Container from "../../components/Container/style";
import Content from "../../components/Content/style";
import Greetings from "../../components/MainPage/Greetings";
import Header from "../../components/MainPage/Header";
import Whiteboard from "../../components/MainPage/Whiteboard";
import Button from "../../components/MainPage/Button/Button";
import ButtonContainer from "../../components/MainPage/Button/ButtonContainer";
import { AddCircleOutline } from 'react-ionicons'
import { RemoveCircleOutline } from "react-ionicons";
import { ExitOutline, LogOutOutline } from "react-ionicons";
import { useState } from "react";
import { SessionDataProvider } from "../../contexts/SessionDataContext";
import useSessionData from "../../hooks/useSessionData";


export default function MainPage(){

    const {sessionData, updateSessionData} = useSessionData();
    const sessionUser = sessionData.name;
    const name = sessionUser.replace(/\s[a-zA-Z]{0,}/gm, '');
    const [whiteboardContent, setWhiteboardContent] = useState('');
    

    function UpdateWhiteboard(){
        return(
        <div style={{display:'flex', justifyContent: 'center', alignItems: 'center', height:'100%'}}>
            <p> Não há registros de entrada ou saída </p>
        </div>
        )
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
                    />
                </Header>
                <Whiteboard>
                    <UpdateWhiteboard/>
                </Whiteboard>

                <ButtonContainer>
                    <Button>
                        <AddCircleOutline
                            color={'white'} 
                            height="20px"
                            width="20px"
                            style={{position:'absolute', top: '6%', left: '4%'}}
                        />
                        <span> Nova Entrada </span>
                    </Button>

                    <Button>
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