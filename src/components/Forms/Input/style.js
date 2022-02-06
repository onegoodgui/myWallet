import styled from 'styled-components'

const Input = styled.input`

    height: 60px;
    width: 100%;

    border: 1px solid #D5D5D5;
    border-radius: 5px;

    padding-left: 10px;

    color: #000000;
    font-family: Raleway;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;

    :: placeholder{
        color: #000000;
    }

    input:disabled {
        background: #F2F2F2;
      }
`

export default Input;
