import styled from "styled-components"

const Button = styled.button`

    background-color: #A328D6;

    height: 45px;
    
    width: 90vw;
    max-width: 300px;

    display: flex;
    justify-content: center;
    align-items:center;

    border-radius: 5px;
    border-color: #52B6FF;
    border-style: none;

    padding-left: 10px;
    margin-top: 10px;
    margin-bottom: 35px;

    font-size: 20px;
    font-weight: 700;
    color: white;
    opacity: ${props => props.disabled === true ? 0.7 : 1};
   
`

export default Button