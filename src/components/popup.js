import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import DropdownList from "react-widgets/DropdownList";
import DatePicker from "react-widgets/DatePicker";

class PopUp extends React.Component {
    render() {
        return <>
               <Modal show={this.props.show}>
                    <Modal.Header closeButton={false}>
                        <Modal.Title>Add Nova Tarefa</Modal.Title>
                    </Modal.Header>
                    <Form>
                        <Modal.Body>
                            <Form.Group className="mb-3" onSubmit={this.props.handleSubmit}>
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control type='text' required></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Prazo</Form.Label>
                                <DatePicker placeholder="dd/mm/yy" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Progresso</Form.Label>
                                <DropdownList defaultValue="Andamento" data={["Andamento", "Concluido"]}/>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" type="submit">
                                Salvar
                            </Button>
                            <Button variant="secondary" onClick={this.props.handleClose}>
                                Fechar
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal> 
            </>;
    }
}

export default PopUp;