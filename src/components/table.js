import React from 'react';
import { Button } from 'react-bootstrap';

class Table extends React.Component  {
    render() {
        return  <>
                    <table>
                        <thead>
                            <tr style={{fontWeight:'bold'}}>
                                <td style={{paddingRight: 10, textAlign:'center'}}>
                                    Id
                                </td>
                                <td style={{paddingRight: 10, textAlign:'center'}}>
                                    Descrição
                                </td>
                                <td style={{paddingRight: 10, textAlign:'center'}}>
                                    Prazo
                                </td>
                                <td style={{paddingRight: 10, textAlign:'center'}}>
                                    Progresso
                                </td>
                                <td>
                                    
                                </td>
                                <td>

                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.data.map(dt => (
                                <tr key={dt.id}>
                                    <td style={{paddingRight: 10, textAlign:'center'}}>
                                        {dt.id}
                                    </td>
                                    <td style={{paddingRight: 10, textAlign:'center'}}>
                                        {dt.descricao}
                                    </td>
                                    <td style={{textAlign:'center'}}>
                                        {dt.dtPrazo}
                                    </td>
                                    <td style={{textAlign:'center'}}>
                                        {dt.progresso == 'a' ? 'Andamento' : 'Concluida'}
                                    </td>
                                    <td style={{paddingRight:5}}>
                                        <Button variant="secondary" size="sm" onClick={ e => { 
                                            console.log("update " + dt.id);
                                        }}>Update</Button>
                                    </td>
                                    <td>
                                        <Button variant="primary" size="sm" onClick={e => {
                                            console.log("delete " + dt.id)
                                        } }>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
    }
}

export default Table;