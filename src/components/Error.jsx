import styled from '@emotion/styled';

//Estilos
const Texto = styled.div `
    background-color: #B7322C;
    color: #FFF;
    padding: 12px;
    font-size: 22px;
    text-transform: uppercase;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    text-align: center;
`

const Error = ({children}) => {
    return (
        <Texto>
            {children}
        </Texto>
    )
}

export default Error
