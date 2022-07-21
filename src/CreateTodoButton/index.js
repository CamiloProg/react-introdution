import react from "react";
import './CreateTodoButton.css'

function CreateTodoButtom(props){
    const onClickButton = () => {
        props.setOpenModal(true);
    };
    return(
        <div className="add">
        <button onClick={onClickButton}>
            +
        </button>
        </div>
    );
}

export { CreateTodoButtom };