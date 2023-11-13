import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import DropdownList from "react-widgets/DropdownList";
import DatePicker from "react-widgets/DatePicker";

class PopUp extends React.Component {
    render() {
        const progressos = [
            { id: 'a', name: 'Andamento'},
            { id: 'c', name: 'Concluido'},
        ];

        return <>
               <Modal show={this.props.show}>
                    <Modal.Header closeButton={false}>
                        {this.props.dataForm.id === 0 ? <Modal.Title>Add Nova Tarefa</Modal.Title> : <Modal.Title>Update Tarefa</Modal.Title>}
                    </Modal.Header>
                    <Form noValidate onSubmit={e => this.props.handleSubmit(e)}>
                        <Modal.Body>
                            {this.props.dataForm.id > 0 &&
                                <Form.Group className="mb-3">
                                    <Form.Label>Id</Form.Label>
                                    <Form.Control type='text' value={this.props.dataForm.id} disabled={true}></Form.Control>
                                </Form.Group>
                            }
                            
                            <Form.Group className="mb-3">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control type='text' required value={this.props.dataForm.descricao}
                                    onChange={e => this.props.descricaoChange(e.target.value)} maxLength={49}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Prazo</Form.Label>
                                <DatePicker placeholder="dd/mm/yyyy" formats={"date"} value={this.props.dataForm.dtPrazo} onChange={e => this.props.dtPrazoChange(e)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Progresso</Form.Label>
                                <DropdownList defaultValue="Concluido" data={progressos} dataKey='id' textField='name'
                                    value={this.props.dataForm.progresso} onChange={e => this.props.progressoChange(e)}/>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" type="submit">
                                Salvar
                            </Button>
                            <Button variant="secondary" onClick={e => this.props.handleClose(e)}>
                                Fechar
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal> 
            </>;
    }
}

export default PopUp;