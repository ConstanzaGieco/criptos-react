import {useState} from 'react';
import styled from '@emotion/styled';

//Los hooks son buenos para reutilizar codigo, por ejemplo definis un hook para los select con sus estilos propios. Despues podes usarlo en otro proyecto y en caso de que ya no lo quieras mas, lo borras y automaticamente el css tambien se borrará, en vez de ir a investigar linea por linea en el css haya que eliminar.

//Estilos
const Label = styled.label `
    color: #FFF;
    display: block;
    font-family: 'Lato', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin: 15px 0;
`
const Select = styled.select `
    width: 100%;
    font-size: 18px;
    padding: 14px;
    border-radius: 10px;
`


const useSelectMonedas = (label, opciones) => {

    //Utilizamos un nombre generico, para que este state sea reutilizable. Por ejemplo en este proyecto, estamos utilizandolo para monedas como criptomonedas.
    const [state, setState] = useState('')
    
    const SelectMonedas = () => (
        <>
            <Label>{label}</Label>
            <Select
                value={state}
                onChange={e => setState(e.target.value)}
            >
                <option value="">Seleccione</option>
                {opciones.map(opcion => (
                    <option
                        key={opcion.id}
                        value={opcion.id}
                    >{opcion.nombre}</option>
                ))}
            </Select>
        </>
    )

    return [ state, SelectMonedas ]
}

export default useSelectMonedas
