
import React, { useEffect, useState } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import api from "./services/api";
import "react-widgets/styles.css";
import DropdownList from "react-widgets/DropdownList";
import DatePicker from "react-widgets/DatePicker";

function App() {
    const [data, setData] = React.useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [dataForm, setdataForm] = React.useState({
        id: 0,
        descricao: '',
        dtPrazo: undefined,
        progresso: 'a'
    });

    const progressos = [
        { id: 'a', name: 'Andamento'},
        { id: 'c', name: 'Concluido'},
    ];

    useEffect(()=>{
      api.get('/Tarefas', { }).then((response) => 
      { 
        setData(response.data);
      });  
    }, []);

    const handleSubmit = event => {
        if(dataForm.id === 0){
            api.post('Tarefas/Salvar', dataForm, {headers: { "Content-Type" : "application/json" }}).then(response => {
                console.log('entrei');
            }).catch( err => {
                event.preventDefault();
            });
        }else{
            api.post('Tarefas/Alterar', dataForm, {headers: { "Content-Type" : "application/json" }}).then(response => {
                console.log('entrei');
            }).catch( err => {
                event.preventDefault();
            });
        }
    }

    function descricaoChange(val) {
        setdataForm({
            ...dataForm,
            descricao: val
        });
    }

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

    function dtPrazoChange(val){
        console.log(val);
        setdataForm({
            ...dataForm,
            dtPrazo: val
        });
    }
    
    function progressoChange(val){
        console.log(val);
        setdataForm({
            ...dataForm,
            progresso: val.id
        });
    }

    return (
        <div className='container2'>
            <div className='wrap'>
                <h2 style={{marginBottom: 30}}>Todo-List</h2>
                <div style={{textAlign: '-webkit-center'}}>
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
                                <td >
                                    
                                </td>
                                <td >

                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(dt => (
                                <tr key={dt.id}>
                                    <td className='col-1' style={{paddingRight: 10, textAlign:'center'}}>
                                        {dt.id}
                                    </td>
                                    <td className='col-5' style={{paddingRight: 10, textAlign:'center'}}>
                                        {dt.descricao}
                                    </td>
                                    <td className='col-2' style={{textAlign:'center', paddingRight:10}}>
                                        {formatDate(new Date(dt.dtPrazo))}
                                    </td>
                                    <td className='col-2' style={{textAlign:'center', paddingRight:10}}>
                                        {dt.progresso === 'a' ? 'Andamento' : 'Concluida'}
                                    </td>
                                    <td className='col-1' style={{paddingRight:1}}>
                                        <Button variant="secondary" size="sm" style={{width:'100%'}} onClick={ e => { 
                                            api.get('/Tarefas/' + dt.id).then(response => {
                                                setdataForm({
                                                    id: response.data.id,
                                                    descricao: response.data.descricao,
                                                    dtPrazo: response.data.dtPrazo === null? undefined : new Date(response.data.dtPrazo),
                                                    progresso: response.data.progresso
                                                });
                                                setShow(true);
                                            }).catch(err => {
                                                console.log(err);
                                            });
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
                </div>
                <div style={{marginTop: 15}}>
                    <Button variant="primary" size="sm" onClick={e => {
                        setdataForm({
                            id: 0,
                            descricao: '',
                            dtPrazo: null,
                            progresso: 'a'
                        })
                        setShow(true);
                    }}>Adcionar Nova</Button>
                </div>
                <div>
                    <Modal show={show}>
                        <Modal.Header closeButton={false}>
                            {dataForm.id === 0 ? <Modal.Title>Add Nova Tarefa</Modal.Title> : <Modal.Title>Update Tarefa</Modal.Title>}
                        </Modal.Header>
                        <Form noValidate onSubmit={handleSubmit}>
                            <Modal.Body>
                                {dataForm.id > 0 &&
                                    <Form.Group className="mb-3">
                                        <Form.Label>Id</Form.Label>
                                        <Form.Control type='text' value={dataForm.id} disabled={true}></Form.Control>
                                    </Form.Group>
                                }
                                
                                <Form.Group className="mb-3">
                                    <Form.Label>Descrição</Form.Label>
                                    <Form.Control type='text' required value={dataForm.descricao}
                                        onChange={e => descricaoChange(e.target.value)} maxLength={49}></Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Prazo</Form.Label>
                                    <DatePicker placeholder="dd/mm/yyyy" formats={"date"} value={dataForm.dtPrazo} onChange={e => dtPrazoChange(e)} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Progresso</Form.Label>
                                    <DropdownList defaultValue="Concluido" data={progressos} dataKey='id' textField='name'
                                        value={dataForm.progresso} onChange={e => progressoChange(e)}/>
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" type="submit">
                                    Salvar
                                </Button>
                                <Button variant="secondary" onClick={handleClose}>
                                    Fechar
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal> 
                </div>
            </div>
        </div>
    );
}

export default App;
