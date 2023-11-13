import React, { useEffect, useState } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import api from "./services/api";
import "react-widgets/styles.css";
import { Provider } from 'react-redux';
import store from './store';
import Table from './components/table';
import PopUp from './components/popup';

function App() {
    const [data, setData] = React.useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        console.log('entrei');
        setShow(false)
    };
    const [dataForm, setdataForm] = React.useState({
        id: 0,
        descricao: '',
        dtPrazo: undefined,
        progresso: 'a'
    });

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

    function fnUpdate(id){
        api.get('/Tarefas/' + id).then(response => {
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
    }

    return (
        <Provider store={store}>
             <div className='container2'>
                <div className='wrap'>
                    <h2 style={{marginBottom: 30}}>Todo-List</h2>
                    <div style={{textAlign: '-webkit-center'}}>
                       <Table data={data} update={fnUpdate}></Table>
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
                        <PopUp show={show} dataForm={dataForm} 
                            handleSubmit={e => handleSubmit(e) } descricaoChange={e=> descricaoChange(e)} 
                            progressoChange={e => progressoChange(e)} handleClose={e => handleClose()}
                            dtPrazoChange={e=> dtPrazoChange(e)}>
                        </PopUp>
                    </div>
                </div>
            </div>
        </Provider>
    );
}

export default App;
