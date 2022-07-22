import React from "react";
import ReactDOM from "react-dom";
import './Modal.css';
import  { useState } from "react";

function Modal(props){

    const [newTodoValue, setNewTodoValue] = React.useState('');
    const onClickButton = () => {
        props.setOpenModal(false);
    };
    
    const onChangeText = (event) => {
        console.log(event.target.value);
        setNewTodoValue(event.target.value);
    }
    const onClickAdd = () => {
        props.setOpenModal(false);
        props.addTodo(newTodoValue);
    }

    return ReactDOM.createPortal(
        <div className="ModalBackground">
            
            <div className="box">
            <button className="closeModal" onClick={onClickButton}>
            X
            </button>
            <h1>Create a new task!</h1>
            <input className="addInput" 
            type="text"
            placeholder="Task"
            value={newTodoValue}
            onChange={onChangeText}  
            />
            <button 
            className="addTask"
            onClick={onClickAdd}
            >
                Add
            </button>
    </div>
    </div>,
        document.getElementById('modal'),
    );
}

export { Modal };
