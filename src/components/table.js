import React from 'react';
import { Button } from 'react-bootstrap';
import api from "../services/api";

class Table extends React.Component  {
    render() {
        function padTo2Digits(num) {
            return num.toString().padStart(2, '0');
        }
    
        function formatDate(date) {
            if(date === null || date === undefined || date.getFullYear() === 1969){
                return "";
            }
            else{
                return [
                    padTo2Digits(date.getDate()),
                    padTo2Digits(date.getMonth() +1),
                    date.getFullYear(),
                  ].join('/');
            }
        }

        return  <>
            <table width={'100%'}>
                <thead style={{borderCollapse:'collapse', borderBottom: '1px solid', paddingBottom: 15}}>
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
                                {formatDate(new Date(dt.dtPrazo))}
                            </td>
                            <td style={{textAlign:'center'}}>
                                {dt.progresso == 'a' ? 'Andamento' : 'Concluida'}
                            </td>
                            <td className='col-1' style={{paddingRight:5}}>
                                <Button variant="secondary" size="sm" style={{width:'100%'}} onClick={ e => { 
                                    this.props.update(dt.id);
                                }}>Update</Button>
                            </td>
                            <td className='col-1'>
                                <Button variant="primary" size="sm" style={{width:'100%'}} onClick={e => {
                                    api.delete('Tarefas/' + dt.id).then(response => {
                                        window.location.reload(false);
                                    }).catch(err => {
                                        console.log(err);
                                    });
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