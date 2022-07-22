import react from "react";
import './CreateTodoButton.css'

function CreateTodoButtom(props){
    const onClickButton = () => {
        props.setOpenModal(true);
    };
    return(
        <button className="addButton" onClick={onClickButton}>
            +
        </button>
    );
}

export { CreateTodoButtom };