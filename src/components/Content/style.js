import styled from 'styled-components';

const Content = styled.div`

width: 85%;
height: fit-content;

display: flex;
flex-direction: column;
align-items: ${props => props.alignItems};

color:${props => props.textColor};

`

export default Content;