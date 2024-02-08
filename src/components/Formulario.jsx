import {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import Error from './Error';
import useSelectMonedas from '../hooks/useSelectMonedas';
import { monedas } from '../data/monedas';

//Estilos
const InputSubmit = styled.input `
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 20px;

    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Formulario = ({setMonedas}) => {

    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)

    //Importar hooks (moneda vendria siendo state, puede adquirir cualquier nombre lo importante es la posicion)
    const [moneda, SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas)
    const [criptomoneda, SelectCriptomoneda] = useSelectMonedas('Elige tu criptomoneda', criptos)

    //Se consulta una sola vez el llamado de la API, cuando el documento este listo
    useEffect(()=> {    
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            console.log(resultado)
            //Construimos un arreglo con Data (asi se llama en la API) con la info que deseamos
            const arrayCriptos = resultado.Data.map(cripto => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
               return objeto
            })
            setCriptos(arrayCriptos)
        }
        consultarAPI()
    }, [])

    //funcion formulario
    const handleSubmit = e => {
        e.preventDefault()
        if([moneda, criptomoneda].includes('')){
            setError(true)
            return
        }
        setError(false)
        setMonedas({
            moneda,
            criptomoneda
        })
    }

    return (
        <>
            {error && <Error>Todos los campos son obligatorios</Error>}
            <form onSubmit={handleSubmit}>
                <SelectMonedas />
                <SelectCriptomoneda />
                <InputSubmit 
                    type="submit" 
                    value="Cotizar"
                />
            </form>
        </>
    )
}

export default Formulario
